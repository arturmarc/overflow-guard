type OverflowAxisLike = "none" | "horizontal" | "vertical" | "both";
type FallbackOnLike = Exclude<OverflowAxisLike, "none">;

export function resolveOverflowAxis(
  horizontalOverflow: boolean,
  verticalOverflow: boolean
): OverflowAxisLike {
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

export function shouldUseFallback(
  fallbackOn: FallbackOnLike,
  overflowAxis: OverflowAxisLike
) {
  if (overflowAxis === "none") {
    return false;
  }
  if (fallbackOn === "both") {
    return true;
  }
  return overflowAxis === fallbackOn || overflowAxis === "both";
}

export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
