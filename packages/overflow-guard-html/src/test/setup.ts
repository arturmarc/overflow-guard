import { vi } from 'vitest'

type ResizeObserverCallback = () => void

const resizeObserverCallbacks: ResizeObserverCallback[] = []

class ResizeObserverMock {
  constructor(callback: ResizeObserverCallback) {
    resizeObserverCallbacks.push(callback)
  }

  observe() {
    return undefined
  }

  disconnect() {
    return undefined
  }
}

Object.defineProperty(globalThis, 'ResizeObserver', {
  configurable: true,
  writable: true,
  value: ResizeObserverMock,
})

Object.defineProperty(globalThis, 'requestAnimationFrame', {
  configurable: true,
  writable: true,
  value: ((callback: FrameRequestCallback) => {
    callback(0)
    return 0
  }) as typeof requestAnimationFrame,
})

export function triggerResize() {
  for (const callback of resizeObserverCallbacks) {
    callback()
  }

  vi.runAllTimers()
}

export function resetTestEnvironment() {
  resizeObserverCallbacks.length = 0
  globalThis.requestAnimationFrame = ((callback: FrameRequestCallback) => {
    callback(0)
    return 0
  }) as typeof requestAnimationFrame
}
