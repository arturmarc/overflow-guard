/* eslint-disable @typescript-eslint/no-explicit-any */

export function throttle<T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
) {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
