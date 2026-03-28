import { reverseMutations, startRecordingMutations } from "./reverse-mutations";

function isHtmlElement(node: Element | null): node is HTMLElement {
  return node instanceof HTMLElement;
}

function getDirectChildElements(host: HTMLElement) {
  return Array.from(host.children).filter(
    (element): element is HTMLElement => element instanceof HTMLElement
  );
}

function setStyleAndAttrDefaultsForInvisible(element: HTMLElement) {
  element.style.visibility = "hidden";
  element.removeAttribute("id");

  element.querySelectorAll("[id]").forEach((descendant) => {
    descendant.removeAttribute("id");
  });
}

export class OverflowGuardElement extends HTMLElement {
  static get observedAttributes() {
    return ["check-only", "fallbackclass", "fallback-class"];
  }

  private rawPrimaryElement: HTMLElement | null = null;
  private measurementElement: HTMLElement | null = null;
  private measurementBoxElement: HTMLDivElement | null = null;
  private sourceMutationObserver: MutationObserver | null = null;
  private hostMutationObserver: MutationObserver | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private mutatingInternally = false;
  private hasConnected = false;
  private lastDispatchedState = "";
  private measuredOverflowAxis: NonNullable<
    ReturnType<OverflowGuardElement["measureOverflowAxis"]>
  > = "none";
  private fallbackContentMutations: MutationRecord[] = [];

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = `
      <style>
        :host {
          display: grid;
          position: relative;
        }
        .hidden-measurement-layer {
          position: absolute;
          inset: 0;
          overflow: auto;
          pointer-events: none;
          visibility: hidden;
          z-index: -1;
        }
        .hidden-measurement-box {
          height: 100%;
          width: 100%;
        }
        .hidden-measurement-box,
        .visible-layer {
          grid-area: 1 / 1;
          min-width: 0;
          min-height: 0;
        }
      </style>
      <div
        class="hidden-measurement-layer"
        data-overflow-guard="hidden-measurement-layer"
        aria-hidden="true"
      >
        <div
          class="hidden-measurement-box"
          data-overflow-guard="hidden-measurement-box"
        >
          <slot name="invisible-measurement"></slot>
        </div>
      </div>
      <div class="visible-layer" data-overflow-guard="visible-layer-primary">
        <slot></slot>
      </div>
    `;

    const primarySlot = shadowRoot.querySelector("slot:not([name])");
    const measurementBoxElement = shadowRoot.querySelector(
      '[data-overflow-guard="hidden-measurement-box"]'
    );

    if (!(primarySlot instanceof HTMLSlotElement)) {
      throw new Error("[overflow-guard] Failed to create primary slot.");
    }

    if (!(measurementBoxElement instanceof HTMLDivElement)) {
      throw new Error("[overflow-guard] Failed to create measurement box.");
    }

    this.measurementBoxElement = measurementBoxElement;

    primarySlot.addEventListener("slotchange", () => {
      if (this.hasConnected && !this.mutatingInternally) {
        this.handleHostMutations();
      }
    });
  }

  get primaryElement() {
    if (!this.rawPrimaryElement) {
      throw new Error(
        "[overflow-guard] Expected a single primary child element."
      );
    }

    return this.rawPrimaryElement;
  }

  get overflowAxis() {
    return this.measuredOverflowAxis;
  }

  get isOverflowing() {
    return this.overflowAxis !== "none";
  }

  get checkOnly() {
    const value = this.getAttribute("check-only");

    if (value === "horizontal" || value === "vertical") {
      return value;
    }

    return null;
  }

  get fallbackClass() {
    return (
      this.getAttribute("fallbackclass") ??
      this.getAttribute("fallback-class") ??
      ""
    );
  }

  set fallbackClass(value: string) {
    this.setAttribute("fallbackClass", value);
  }

  connectedCallback() {
    if (this.hasConnected) {
      return;
    }

    this.hasConnected = true;
    this.collectAssignedElements();
    this.copyPrimaryToMeasurementElement();
    this.initMutationObserver();
    this.initHostObserver();
    this.initResizeObserver();
    this.checkOverflowAndApply();
  }

  disconnectedCallback() {
    const sourceMutations = this.sourceMutationObserver?.takeRecords();

    if (sourceMutations && sourceMutations.length > 0) {
      this.handleSourceMutations();
    }

    this.sourceMutationObserver?.disconnect();
    this.hostMutationObserver?.disconnect();
    this.resizeObserver?.disconnect();
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    if (!this.hasConnected || oldValue === newValue) {
      return;
    }

    if (
      (name === "fallbackclass" || name === "fallback-class") &&
      this.fallbackChangesApplied
    ) {
      this.startMutatingInternally();
      this.doOrUndoFallbackContentMutations(false);
      this.doOrUndoFallbackContentMutations(true);
      this.endMutatingInternally();
    }

    this.checkOverflowAndApply();
  }

  refresh() {
    this.rebuildMeasurementElementPreservingFallback();

    this.scheduleOverflowCheck();
  }

  private rebuildMeasurementElementPreservingFallback() {
    const shouldReapplyFallback = this.fallbackChangesApplied;

    if (shouldReapplyFallback) {
      this.startMutatingInternally();
      this.doOrUndoFallbackContentMutations(false);
      this.endMutatingInternally();
    }

    this.copyPrimaryToMeasurementElement();
    this.initResizeObserver();

    if (shouldReapplyFallback) {
      this.startMutatingInternally();
      this.doOrUndoFallbackContentMutations(true);
      this.endMutatingInternally();
    }
  }

  private collectAssignedElements() {
    const directChildren = getDirectChildElements(this).filter(
      (child) => child.getAttribute("slot") !== "invisible-measurement"
    );
    const primaryChildren = directChildren.filter(
      (child) => !child.hasAttribute("slot")
    );
    const unsupportedSlottedChildren = directChildren.filter((child) =>
      child.hasAttribute("slot")
    );
    const primaryChild = primaryChildren[0] ?? null;

    if (unsupportedSlottedChildren.length > 0) {
      throw new Error(
        "[overflow-guard] Named slots are not supported. Use fallbackClass instead."
      );
    }

    if (primaryChildren.length !== 1 || !isHtmlElement(primaryChild)) {
      throw new Error(
        "[overflow-guard] Expected exactly one primary child element."
      );
    }

    this.rawPrimaryElement = primaryChild;
  }

  private copyPrimaryToMeasurementElement() {
    this.startMutatingInternally();

    const existingMeasurement = this.querySelector(
      ':scope > [slot="invisible-measurement"]'
    );

    if (existingMeasurement) {
      existingMeasurement.remove();
    }

    const measurementElement = this.primaryElement.cloneNode(true);

    if (!(measurementElement instanceof HTMLElement)) {
      this.endMutatingInternally();
      throw new Error("[overflow-guard] Failed to clone primary element.");
    }

    setStyleAndAttrDefaultsForInvisible(measurementElement);
    measurementElement.slot = "invisible-measurement";
    measurementElement.setAttribute(
      "data-overflow-guard-invisible",
      "measurement"
    );

    this.insertBefore(measurementElement, this.primaryElement);
    this.measurementElement = measurementElement;

    this.endMutatingInternally();
  }

  private initMutationObserver() {
    this.sourceMutationObserver?.disconnect();

    this.sourceMutationObserver = new MutationObserver(() => {
      this.handleSourceMutations();
    });

    this.sourceMutationObserver.observe(this.primaryElement, {
      childList: true,
      attributes: true,
      characterData: true,
      subtree: true,
    });
  }

  private initHostObserver() {
    this.hostMutationObserver?.disconnect();

    this.hostMutationObserver = new MutationObserver(() => {
      this.handleHostMutations();
    });

    this.hostMutationObserver.observe(this, {
      childList: true,
    });
  }

  private handleSourceMutations() {
    if (this.mutatingInternally) {
      return;
    }

    this.refresh();
  }

  private handleHostMutations() {
    if (this.mutatingInternally) {
      return;
    }

    this.collectAssignedElements();
    this.rebuildMeasurementElementPreservingFallback();
    this.initMutationObserver();
    this.checkOverflowAndApply();
  }

  private initResizeObserver() {
    if (!this.measurementElement || !this.measurementBoxElement) {
      throw new Error("[overflow-guard] Missing measurement element.");
    }

    this.resizeObserver?.disconnect();
    this.resizeObserver = new ResizeObserver(() => {
      this.scheduleOverflowCheck();
    });

    this.resizeObserver.observe(this.measurementElement);
    this.resizeObserver.observe(this.measurementBoxElement);
    this.resizeObserver.observe(this);
  }

  private scheduleOverflowCheck() {
    requestAnimationFrame(() => {
      this.checkOverflowAndApply();
    });
  }

  private checkOverflowAndApply() {
    const nextAxis = this.measureOverflowAxis();

    if (nextAxis === undefined) {
      return;
    }

    this.measuredOverflowAxis = nextAxis;

    const shouldApplyFallbackState =
      nextAxis !== "none" &&
      (this.checkOnly === null ||
        nextAxis === this.checkOnly ||
        nextAxis === "both");

    if (shouldApplyFallbackState && !this.fallbackChangesApplied) {
      this.applyFallbackChange(true);
    }

    if (!shouldApplyFallbackState && this.fallbackChangesApplied) {
      this.applyFallbackChange(false);
    }

    this.setAttribute(
      "data-overflow-guard-state-applied",
      shouldApplyFallbackState ? "fallback" : "primary"
    );
    this.reflectState();
  }

  private measureOverflowAxis() {
    if (!this.measurementBoxElement) {
      return;
    }

    const horizontalOverflow =
      this.measurementBoxElement.scrollWidth >
      this.measurementBoxElement.clientWidth + 1;
    const verticalOverflow =
      this.measurementBoxElement.scrollHeight >
      this.measurementBoxElement.clientHeight + 1;

    if (horizontalOverflow && verticalOverflow) {
      return "both";
    }

    if (horizontalOverflow) {
      return "horizontal";
    }

    if (verticalOverflow) {
      return "vertical";
    }

    return "none";
  }

  private applyFallbackChange(isFallback: boolean) {
    this.startMutatingInternally();
    this.doOrUndoFallbackContentMutations(isFallback);
    this.fallbackChangesApplied = isFallback;
    this.endMutatingInternally();
  }

  private startMutatingInternally() {
    const pendingSourceMutations = this.sourceMutationObserver?.takeRecords();

    if (pendingSourceMutations && pendingSourceMutations.length > 0) {
      this.handleSourceMutations();
    }

    this.hostMutationObserver?.takeRecords();
    this.mutatingInternally = true;
  }

  private endMutatingInternally() {
    this.sourceMutationObserver?.takeRecords();
    this.hostMutationObserver?.takeRecords();
    this.mutatingInternally = false;
  }

  private reflectState() {
    const overflowAxis = this.overflowAxis;
    const isOverflowing = overflowAxis !== "none";

    this.toggleAttribute("overflowing", isOverflowing);
    this.setAttribute("overflow-axis", overflowAxis);
    this.dataset.overflowAxis = overflowAxis;

    const nextState = `${String(isOverflowing)}:${overflowAxis}`;

    if (nextState === this.lastDispatchedState) {
      return;
    }

    this.lastDispatchedState = nextState;
    this.dispatchEvent(
      new CustomEvent("overflowchange", {
        detail: {
          isOverflowing,
          overflowAxis,
        },
      })
    );
  }

  private doOrUndoFallbackContentMutations(isFallback: boolean) {
    if (isFallback) {
      if (this.fallbackContentMutations.length > 0) {
        return;
      }

      const recorder = startRecordingMutations(this.primaryElement);

      if (this.fallbackClass) {
        this.primaryElement.className =
          `${this.primaryElement.className} ${this.fallbackClass}`.trim();
      }

      this.fallbackContentMutations = recorder.stopAndGetMutations();
      return;
    }

    if (this.fallbackContentMutations.length === 0) {
      return;
    }

    reverseMutations(this.fallbackContentMutations);
    this.fallbackContentMutations = [];
  }

  private set fallbackChangesApplied(value: boolean) {
    this.startMutatingInternally();

    if (value) {
      this.setAttribute("data-fallback-changes-applied", "true");
    } else {
      this.removeAttribute("data-fallback-changes-applied");
    }

    this.endMutatingInternally();
  }

  private get fallbackChangesApplied() {
    return this.hasAttribute("data-fallback-changes-applied");
  }
}

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface HTMLElementTagNameMap {
    "overflow-guard": OverflowGuardElement;
  }
}
