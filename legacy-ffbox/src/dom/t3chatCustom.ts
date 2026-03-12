/**
 * This script is used to add custom functionality to the t3chat sidebar.
 * It remembers in local storage recently used models and adds buttons for those models
 * to the sidebar that open a new chat with a specific model selected model.
 */

// ==UserScript==
// @name         t3chat recent models
// @namespace    https://t3.chat/
// @version      2025-07-28
// @description  adds buttons for recently used models to the sidebar
// @author       arturmarc
// @match        https://t3.chat/*
// @icon         https://t3.chat/favicon.ico
// @grant        none
// ==/UserScript==

// number of recent models to render (configurable here)
const NUM_RECENT_MODELS = 4;

/* start of utility functions */
const $$ = document.querySelectorAll.bind(document);

const $ = (selector: string): HTMLElement | SVGElement => {
  const el = document.querySelector(selector);
  if (!(el instanceof HTMLElement || el instanceof SVGElement)) {
    throw new Error(
      `[t3chatCustom] Element not found for selector: ${selector}`,
    );
  }
  return el;
};

const asElementOrSvgItems = (nodeList: NodeListOf<Element>) =>
  [...nodeList].filter(
    (el): el is HTMLElement | SVGElement =>
      el instanceof HTMLElement || el instanceof SVGElement,
  );

const clickElement = (element: HTMLElement | null | undefined) => {
  if (!element) {
    console.warn("[t3chatCustom] Cannot click null/undefined element");
    return false;
  }

  // Try multiple click strategies
  try {
    element.focus();
    const keyEvent = new KeyboardEvent("keydown", {
      key: "Enter",
      code: "Enter",
      bubbles: true,
      cancelable: true,
    });
    element.dispatchEvent(keyEvent);

    return true;
  } catch (error) {
    console.warn("[t3chatCustom] Click failed:", error);
    return false;
  }
};

function assertExists<T>(
  value: T,
  message: string,
): asserts value is NonNullable<T> {
  if (value === null || value === undefined) {
    console.error(message);
    throw new Error(message);
  }
}

async function waitForElements(selector: string) {
  const els = await waitForSelectorAll(selector);
  const res = [...els].filter(
    (el): el is HTMLElement => el instanceof HTMLElement,
  );
  if (res.length === 0) {
    throw new Error(
      `[t3chatCustom] No elements found for selector: ${selector}`,
    );
  }
  return res;
}

function waitForSelectorAll(selector: string) {
  return new Promise<Array<HTMLElement | SVGElement>>((resolve, reject) => {
    const immediateResult = asElementOrSvgItems($$(selector));
    if (immediateResult.length > 0) {
      return resolve(immediateResult);
    }

    const observer = new MutationObserver(() => {
      const res = asElementOrSvgItems($$(selector));
      if (res.length > 0) {
        observer.disconnect();
        clearTimeout(timeout);
        resolve(res);
      }
    });

    const timeout = setTimeout(() => {
      observer.disconnect();
      reject(
        new Error(
          `[t3chatCustom] Selector "${selector}" not found within 500ms`,
        ),
      );
    }, 500);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

const waitForSelector = async (selector: string) => {
  const elements = await waitForSelectorAll(selector);
  return elements[0];
};

/* end of utility functions */

// creates the extra button that will open new chat with the selected model
const createModelButton = ({
  modelName,
  modelMenu,
  newChatButton,
}: {
  modelName: string;
  modelMenu: HTMLElement;
  newChatButton: HTMLElement;
}) => {
  const svg = modelSVGSs.get(modelName);

  if (!svg) {
    console.log(`[t3chatCustom] skipping model: ${modelName} - svg not found`);
    return null;
  }
  const svgElement = svg.cloneNode(true) as SVGElement;

  const button = document.createElement("button");
  button.className = newChatButton.className;
  newChatButton.parentElement?.classList.add("flex", "flex-col", "gap-2");
  button.appendChild(svgElement);
  button.appendChild(document.createTextNode(modelName));

  button.addEventListener("click", () => {
    clickElement(newChatButton);
    clickElement(modelMenu);
    waitForElements(
      "div[data-radix-menu-content] div[data-radix-collection-item]",
    ).then((items) => {
      const foundItem = items.find(
        (item) => item.querySelector("span")?.textContent === modelName,
      );
      if (foundItem) {
        clickElement(foundItem);
      }
    });
  });

  return button;
};

// local storage key to store the recent models
const STORAGE_KEY = "t3chatCustom:recentModels";

// cache model svgs to be able to re-draw them on buttons when re-rendering
const modelSVGSs = new Map<string, SVGElement>();
const getAllModelSVGSs = (modelMenuItems: Array<HTMLElement | SVGElement>) => {
  modelMenuItems.forEach((item) => {
    const svg = item.querySelector("svg");
    if (svg) {
      modelSVGSs.set(
        (item.querySelector("span")?.textContent || "").trim(),
        svg,
      );
    }
  });
};

// (re) renders the recent models buttons underneath the new chat button
const renderRecentModels = async () => {
  // clear the extra buttons container if exists
  let extraButtonsContainer = $$("[data-t3chat-custom-extra-buttons]")[0];
  const startingHtml = `
      <div data-sidebar="group-label" class="flex h-8 shrink-0 select-none items-center rounded-md text-xs font-medium outline-none ring-sidebar-ring transition-[margin,opa] duration-200 ease-snappy focus-visible:ring-2 [&amp;&gt;svg]:size-4 [&amp;&gt;svg]:shrink-0 group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 px-3.5 text-color-heading pt-4">
        <span>Recent models</span>
      </div>
    `;
  if (extraButtonsContainer) {
    extraButtonsContainer.innerHTML = startingHtml;
  }
  // make sure the extra buttons container is visible
  const links = await waitForElements("a[href='/']");
  const newChatButton = links.find((link) =>
    (link.textContent ?? "").trim().toLocaleLowerCase().includes("new chat"),
  );
  if (!newChatButton) {
    // nothing to render new chat button is not visible
    console.log("[t3chatCustom] new chat button not found");
    return;
  }

  const modelMenu = (
    await waitForSelector("button[aria-haspopup] > svg.lucide-chevron-down")
  ).parentElement;
  assertExists(modelMenu, "modelMenu not found");

  let currentModelName = modelMenu.textContent;

  const storageItem = localStorage.getItem(STORAGE_KEY);
  let recentModels = [];
  if (!storageItem) {
    // open the model menu to get model menu svgs
    clickElement(modelMenu);
    const modelMenuItems = await waitForSelectorAll(
      "div[data-radix-menu-content] div[data-radix-collection-item]",
    );
    getAllModelSVGSs(modelMenuItems);

    const defaultRecentModels = [
      currentModelName || "",
      // take 5 items from the model menu items as default recent models
      ...[...modelMenuItems]
        .map((item) => item.querySelector("span")?.textContent || "")
        .filter((item) => item !== currentModelName)
        .slice(0, 3),
    ];
    clickElement(modelMenu);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultRecentModels));
    recentModels = defaultRecentModels;
  } else {
    recentModels = JSON.parse(storageItem) as string[];
  }

  // create the buttons
  if (!extraButtonsContainer) {
    const newExtraButtonsContainer = document.createElement("div");
    newExtraButtonsContainer.className = "flex flex-col gap-2";
    newExtraButtonsContainer.setAttribute(
      "data-t3chat-custom-extra-buttons",
      "",
    );
    newChatButton.parentElement?.insertAdjacentElement(
      "afterend",
      newExtraButtonsContainer,
    );
    extraButtonsContainer = newExtraButtonsContainer;
    extraButtonsContainer.innerHTML = startingHtml;
  }

  const recentModelsToRender = recentModels.slice(0, NUM_RECENT_MODELS);
  // if the svgs are not present for the recent models, try to get them from the model menu
  if (!recentModelsToRender.every((model) => modelSVGSs.has(model))) {
    clickElement(modelMenu);
    try {
      const modelMenuItems = await waitForSelectorAll(
        "div[data-radix-menu-content] div[data-radix-collection-item]",
      );
      getAllModelSVGSs(modelMenuItems);
      clickElement(modelMenu);
    } catch (error) {
      console.log("[t3chatCustom] error getting model menu items", error);
    }
  }

  recentModelsToRender.forEach((model) => {
    if (!modelSVGSs.has(model)) {
      console.log(
        "[t3chatCustom] skipping - model svg not found for model",
        model,
      );
    }
  });

  recentModels
    .filter((model) => modelSVGSs.has(model))
    .slice(0, NUM_RECENT_MODELS)
    .forEach((model) => {
      const button = createModelButton({
        modelName: model,
        modelMenu,
        newChatButton,
      });
      if (button) {
        extraButtonsContainer.appendChild(button);
      }
    });
};

// Main function of this content scripts starts here
// with selecting the model menu dropdown button
waitForSelector("button[aria-haspopup] > svg.lucide-chevron-down").then(
  async (dropdownSvg) => {
    const modelMenu = dropdownSvg.parentElement;
    assertExists(modelMenu, "modelMenu not found");

    renderRecentModels();

    // observe changes to make sure:
    // - the recent buttons are re-rendered when the sidebar is re-rendered (after hiding and showing again)
    // - the model menu is re-observed when the model menu is re-rendered (happens when navigating to different chat pages)
    let sidebarRendered = $$("div[data-sidebar]").length > 0;
    let extraButtonsContainerRendered =
      $$("[data-t3chat-custom-extra-buttons]").length > 0;
    let modelMenuRendered = true;
    const mutationObserver = new MutationObserver(
      (mutations: MutationRecord[]) => {
        const sidebarRenderedAfterMutation = $$("div[data-sidebar]").length > 0;
        if (sidebarRenderedAfterMutation && !sidebarRendered) {
          renderRecentModels();
        }
        sidebarRendered = sidebarRenderedAfterMutation;

        // also check if extra buttons container got removed
        const extraButtonsContainerRenderedAfterMutation =
          $$("[data-t3chat-custom-extra-buttons]").length > 0;
        if (
          !extraButtonsContainerRenderedAfterMutation &&
          extraButtonsContainerRendered
        ) {
          renderRecentModels();
        }
        extraButtonsContainerRendered =
          extraButtonsContainerRenderedAfterMutation;

        // also check if model menu got removed
        const allRemovedNodes = mutations.flatMap((mutation) => [
          ...mutation.removedNodes,
        ]);
        const modelMenuRemoved = allRemovedNodes.some(
          (node) =>
            node instanceof HTMLElement &&
            node.querySelector(
              "button[aria-haspopup] > svg.lucide-chevron-down",
            ),
        );
        if (modelMenuRemoved) {
          modelMenuObserver?.disconnect();
        }
        const modelMenuRenderedAfterMutation =
          $$("button[aria-haspopup] > svg.lucide-chevron-down").length > 0;
        if (!modelMenuRenderedAfterMutation && modelMenuRendered) {
          modelMenuObserver?.disconnect();
        }
        if (
          modelMenuRenderedAfterMutation &&
          (!modelMenuRendered || modelMenuRemoved)
        ) {
          observeModelMenu(
            $$("button[aria-haspopup] > svg.lucide-chevron-down")[0]
              .parentElement!,
          );
        }
        modelMenuRendered = modelMenuRenderedAfterMutation;
      },
    );
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    observeModelMenu(modelMenu);
  },
);

let modelMenuObserver: MutationObserver | null = null;
function observeModelMenu(modelMenu: HTMLElement) {
  let currentModelName = (modelMenu.textContent ?? "").replace(
    /(\w)\(/g,
    "$1 (", // text before the bracket is missing a space
  );

  const setRecentModels = () => {
    const recentModels = JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? "[]",
    ) as string[];

    const newRecentModels = [
      currentModelName,
      ...recentModels.filter((model) => model !== currentModelName).slice(0, 8),
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newRecentModels));
  };

  setRecentModels();

  // observe changes to the model menu text content
  // to save the recent models in local storage and update the recent models list
  modelMenuObserver = new MutationObserver(() => {
    if (modelMenu.textContent !== currentModelName) {
      currentModelName = (modelMenu.textContent ?? "").replace(
        /(\w)\(/g,
        "$1 (", // text before the bracket is missing a space
      );

      setRecentModels();
      renderRecentModels();
    }
  });
  modelMenuObserver.observe(modelMenu, {
    childList: true,
    subtree: true,
    characterData: true,
  });
}
