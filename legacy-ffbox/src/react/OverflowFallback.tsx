"use client";

import React, {
  HTMLAttributes,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import useResizeObserver from "use-resize-observer";
import { throttle } from "../utils/throttle";

const THROTTLE_TIME = 0;

export interface OverflowFallbackProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  throttleTime?: number;
  children?: React.ReactNode | ((overflowing: boolean) => ReactNode);
  overflowingClass?: string;
  overflowingStyle?: React.CSSProperties;
  removeClassWhenOverflowing?: boolean;
  hidden?: boolean;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
}

export interface OverflowFallbackContext {
  isOverflowing: boolean;
}

const OverflowFallbackContextValue = createContext<OverflowFallbackContext>({
  isOverflowing: false,
});

export function useOverflowFallback() {
  const { isOverflowing } = useContext(OverflowFallbackContextValue);
  return isOverflowing;
}

export function OverflowFallback({
  children,
  throttleTime = THROTTLE_TIME,
  style,
  className,
  overflowingClass,
  overflowingStyle,
  containerClassName,
  containerStyle,
  hidden,
  removeClassWhenOverflowing,
  ...rest
}: OverflowFallbackProps) {
  const [isOverflowingState, setIsOverflowing] = useState(false);
  // locked is used to prevent infinite loops
  const [locked, setLocked] = useState(false);
  const isOverflowing = locked ? true : isOverflowingState;

  // use refs instead of state to avoid re-rendering
  const contentWidth = useRef(0);
  const containerWidth = useRef(0);

  const checkIfOverflowing = useCallback(() => {
    const overflowing = contentWidth.current > containerWidth.current;
    setIsOverflowing(overflowing);
  }, []);

  const onContentResize = useCallback(
    throttle(({ width }: { width: number | undefined }) => {
      contentWidth.current = width || 0;
      requestAnimationFrame(() => checkIfOverflowing());
    }, throttleTime),
    [throttleTime, checkIfOverflowing],
  );

  const onContainerResize = useCallback(
    throttle(({ width }: { width: number | undefined }) => {
      containerWidth.current = width || 0;
      requestAnimationFrame(() => checkIfOverflowing());
    }, throttleTime),
    [throttleTime, checkIfOverflowing],
  );

  const { ref: contentRef } = useResizeObserver<HTMLDivElement>({
    onResize: onContentResize,
  });
  const { ref: containerRef } = useResizeObserver<HTMLDivElement>({
    onResize: onContainerResize,
  });

  // infinite loop prevention
  // lock down changes if re-rendered more
  // than 7 times in 300ms
  const renderCountRef = useRef(0);
  const lastResetTimeRef = useRef(Date.now());
  const timeWindow = 300;
  const threshold = 7;
  useEffect(() => {
    const now = Date.now();
    if (now - lastResetTimeRef.current > timeWindow) {
      renderCountRef.current = 1;
      lastResetTimeRef.current = now;
      setLocked(false);
    } else {
      renderCountRef.current += 1;
      if (renderCountRef.current > threshold) {
        console.warn(
          "OverflowFallback infinite loop detected. This is likely not what you want. " +
            "More details: https://github.com/arturmarc/fluid-flexbox#infinite-loops",
        );
        setLocked(true);
        setIsOverflowing(true);
      }
    }
  });

  const baseStyle = {
    ...style,
  };
  const invisibleStyle = {
    ...baseStyle,
    // flexDirection: "row" as const,
    // flexWrap: "nowrap" as const,
    visibility: "hidden" as const,
  };

  let computedClassName =
    isOverflowing && removeClassWhenOverflowing ? "" : className;
  if (overflowingClass && isOverflowing) {
    computedClassName = `${computedClassName} ${overflowingClass}`.trim();
  }

  // just to make sure some inherited styles are not applied
  const styleSizeReset = {
    padding: 0,
    margin: 0,
  };

  return (
    <div
      data-overflow-fallback="container"
      ref={containerRef}
      className={containerClassName}
      style={{
        ...(containerStyle || {}),
        // grid to create a "pile" of elements, i.e. a way to stack elements without positioning absolutely
        display: hidden ? "none" : "grid",
        position: "relative",
        ...styleSizeReset,
      }}
    >
      <div
        data-overflow-fallback="invisible-content"
        style={{
          gridArea: "1/1",
          overflow: "hidden",
          // when overflowing, set the height to 1px to prevent it from stretching the height of the container
          // if the overflowing content height is smaller than the visible content
          height: isOverflowing ? "1px" : undefined,
          ...styleSizeReset,
        }}
      >
        <div
          {...rest}
          className={className}
          ref={contentRef}
          style={{
            ...invisibleStyle,
            width: "max-content",
          }}
        >
          <OverflowFallbackContextValue.Provider
            value={{ isOverflowing: false }}
          >
            {children && typeof children === "function"
              ? children(false)
              : children}
          </OverflowFallbackContextValue.Provider>
        </div>
      </div>
      <div
        data-overflow-fallback={`visible-${isOverflowing ? "overflowing" : "not-overflowing"}`}
        style={{
          gridArea: "1/1",
          ...(!isOverflowing
            ? {
                // this is needed to allow the visible to shrink below its content size
                // could be solved by allowing wrapping but that creates a fouc (see below)
                // or it could be solved by overflow: "hidden",
                // this way is better though, because users might want the content
                // to bleed out of the container and overflow: "hidden" would prevent that
                position: "absolute",
                inset: 0,
              }
            : // rule below allows the visible to shrink below its content size
              // to be able to for example set text-overflow: ellipsis on one of the children
              { minWidth: 0 }),
          ...styleSizeReset,
        }}
      >
        <div
          {...rest}
          className={computedClassName}
          style={{
            ...(isOverflowing ? overflowingStyle : {}),
            ...baseStyle,
          }}
        >
          <OverflowFallbackContextValue.Provider value={{ isOverflowing }}>
            {children && typeof children === "function"
              ? children(isOverflowing)
              : children}
          </OverflowFallbackContextValue.Provider>
        </div>
      </div>
    </div>
  );
}
