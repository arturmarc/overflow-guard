import { cleanup, render, screen, within } from '@testing-library/react'
import { act } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  OverflowGuard,
  resolveOverflowAxis,
  shouldUseFallback,
  useOverflowGuard,
} from '@/components/overflow-guard'

type ResizeCallback = (size: { width?: number; height?: number }) => void

let resizeCallbacks: ResizeCallback[] = []
const originalRequestAnimationFrame = globalThis.requestAnimationFrame

vi.mock('use-resize-observer', () => ({
  default: ({ onResize }: { onResize: ResizeCallback }) => {
    resizeCallbacks.push(onResize)

    return {
      ref: () => undefined,
    }
  },
}))

function setMeasurementBoxSize(size: {
  clientWidth: number
  clientHeight: number
  scrollWidth: number
  scrollHeight: number
}) {
  const measurementBox = document.querySelector(
    '[data-overflow-guard="measurement-box"]',
  ) as HTMLDivElement | null

  if (!measurementBox) {
    throw new Error('Measurement box not found')
  }

  Object.defineProperties(measurementBox, {
    clientWidth: { configurable: true, value: size.clientWidth },
    clientHeight: { configurable: true, value: size.clientHeight },
    scrollWidth: { configurable: true, value: size.scrollWidth },
    scrollHeight: { configurable: true, value: size.scrollHeight },
  })
}

function triggerResize() {
  act(() => {
    resizeCallbacks.at(-2)?.({})
    resizeCallbacks.at(-1)?.({})
    vi.runAllTimers()
  })
}

function getVisibleLayer() {
  const visibleLayer = document.querySelector(
    '[data-overflow-guard^="visible-"]',
  ) as HTMLElement | null

  if (!visibleLayer) {
    throw new Error('Visible layer not found')
  }

  return visibleLayer
}

describe('OverflowGuard helpers', () => {
  it('resolves overflow axis combinations', () => {
    expect(resolveOverflowAxis(false, false)).toBe('none')
    expect(resolveOverflowAxis(true, false)).toBe('horizontal')
    expect(resolveOverflowAxis(false, true)).toBe('vertical')
    expect(resolveOverflowAxis(true, true)).toBe('both')
  })

  it('matches fallback activation to the selected axis', () => {
    expect(shouldUseFallback('both', 'horizontal')).toBe(true)
    expect(shouldUseFallback('horizontal', 'vertical')).toBe(false)
    expect(shouldUseFallback('vertical', 'horizontal')).toBe(false)
    expect(shouldUseFallback('horizontal', 'both')).toBe(true)
  })
})

describe('OverflowGuard component', () => {
  beforeEach(() => {
    resizeCallbacks = []
    vi.useFakeTimers()
    globalThis.requestAnimationFrame = ((callback: FrameRequestCallback) => {
      callback(0)
      return 0
    }) as typeof requestAnimationFrame
  })

  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
    vi.useRealTimers()
    globalThis.requestAnimationFrame = originalRequestAnimationFrame
  })

  it('renders fallback when horizontal overflow matches fallbackOn', () => {
    render(
      <OverflowGuard fallback={<div>compact</div>} fallbackOn="horizontal">
        <div>primary</div>
      </OverflowGuard>,
    )

    setMeasurementBoxSize({
      clientWidth: 120,
      clientHeight: 200,
      scrollWidth: 240,
      scrollHeight: 40,
    })
    triggerResize()

    const visibleLayer = within(getVisibleLayer())

    expect(visibleLayer.getByText('compact')).toBeInTheDocument()
    expect(visibleLayer.queryByText('primary')).not.toBeInTheDocument()
  })

  it('keeps primary content when overflow is only vertical but fallbackOn is horizontal', () => {
    render(
      <OverflowGuard fallback={<div>compact</div>} fallbackOn="horizontal">
        <div>primary</div>
      </OverflowGuard>,
    )

    setMeasurementBoxSize({
      clientWidth: 120,
      clientHeight: 120,
      scrollWidth: 120,
      scrollHeight: 240,
    })
    triggerResize()

    const visibleLayer = within(getVisibleLayer())

    expect(visibleLayer.getByText('primary')).toBeInTheDocument()
    expect(visibleLayer.queryByText('compact')).not.toBeInTheDocument()
  })

  it('passes the runtime overflow axis into the render prop', () => {
    render(
      <OverflowGuard>
        {(isOverflowing, overflowAxis) => (
          <div>
            {String(isOverflowing)} / {overflowAxis}
          </div>
        )}
      </OverflowGuard>,
    )

    setMeasurementBoxSize({
      clientWidth: 120,
      clientHeight: 120,
      scrollWidth: 320,
      scrollHeight: 280,
    })
    triggerResize()

    expect(screen.getByText('true / both')).toBeInTheDocument()
  })

  it('exposes the boolean overflow state through the hook', () => {
    function HookConsumer() {
      const isOverflowing = useOverflowGuard()

      return <div>{isOverflowing ? 'overflowing' : 'stable'}</div>
    }

    render(
      <OverflowGuard>
        {() => <HookConsumer />}
      </OverflowGuard>,
    )

    setMeasurementBoxSize({
      clientWidth: 120,
      clientHeight: 40,
      scrollWidth: 240,
      scrollHeight: 40,
    })
    triggerResize()

    expect(screen.getByText('overflowing')).toBeInTheDocument()
  })
})
