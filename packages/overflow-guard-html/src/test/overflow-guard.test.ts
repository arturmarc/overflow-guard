import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import '../index'
import { resetTestEnvironment, triggerResize } from './setup'

function createElement(markup: string) {
  const fixture = document.createElement('div')
  fixture.innerHTML = markup
  const element = fixture.firstElementChild

  if (!(element instanceof HTMLElement)) {
    throw new Error('Fixture element was not created')
  }

  document.body.append(element)

  return element
}

function setMeasurementBoxSize(element: Element, size: {
  clientWidth: number
  clientHeight: number
  scrollWidth: number
  scrollHeight: number
}) {
  const measurementBox = element.shadowRoot?.querySelector<HTMLElement>(
    '[data-overflow-guard="hidden-measurement-box"]',
  )

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

function getPrimaryChild<T extends HTMLElement = HTMLElement>(
  element: Element,
  selector: string,
) {
  return element.querySelector<T>(`:scope > ${selector}:not([slot])`)
}

describe('OverflowGuardElement', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    resetTestEnvironment()
  })

  afterEach(() => {
    document.body.innerHTML = ''
    vi.useRealTimers()
  })

  it('applies fallbackClass to the primary element when overflow is detected', () => {
    const element = createElement(`
      <overflow-guard fallbackClass="toolbar--compact">
        <div class="toolbar">primary</div>
      </overflow-guard>
    `)

    setMeasurementBoxSize(element, {
      clientWidth: 100,
      clientHeight: 100,
      scrollWidth: 220,
      scrollHeight: 100,
    })
    triggerResize()

    const primary = getPrimaryChild(element, '.toolbar')
    const measurement = element.querySelector<HTMLElement>(
      ':scope > .toolbar[slot="invisible-measurement"]',
    )

    expect(primary?.classList.contains('toolbar--compact')).toBe(true)
    expect(element.classList.contains('toolbar--compact')).toBe(false)
    expect(measurement?.classList.contains('toolbar--compact')).toBe(false)
    expect(element.getAttribute('data-overflow-guard-state-applied')).toBe('fallback')
    expect(element.getAttribute('overflow-axis')).toBe('horizontal')
  })

  it('reverses fallback mutations when overflow is gone', () => {
    const element = createElement(`
      <overflow-guard fallbackClass="toolbar--compact">
        <div class="toolbar">primary</div>
      </overflow-guard>
    `)

    setMeasurementBoxSize(element, {
      clientWidth: 100,
      clientHeight: 100,
      scrollWidth: 220,
      scrollHeight: 100,
    })
    triggerResize()

    setMeasurementBoxSize(element, {
      clientWidth: 100,
      clientHeight: 100,
      scrollWidth: 100,
      scrollHeight: 100,
    })
    triggerResize()

    const primary = getPrimaryChild(element, '.toolbar')

    expect(primary?.classList.contains('toolbar--compact')).toBe(false)
    expect(element.getAttribute('data-overflow-guard-state-applied')).toBe('primary')
    expect(element.hasAttribute('overflowing')).toBe(false)
  })

  it('recreates the invisible measurement copy after source mutations', () => {
    const element = createElement(`
      <overflow-guard>
        <div><span>primary</span></div>
      </overflow-guard>
    `)
    const primary = element.querySelector('div')

    if (!(primary instanceof HTMLElement)) {
      throw new Error('Primary element not found')
    }

    primary.append(document.createElement('strong'))
    triggerResize()

    const measurement = element.querySelector<HTMLElement>(
      ':scope > [slot="invisible-measurement"]',
    )

    expect(measurement?.querySelector('strong')).not.toBeNull()
  })

  it('keeps the invisible measurement copy free of fallbackClass during host rebuilds', () => {
    const element = createElement(`
      <overflow-guard fallbackClass="card--compact" check-only="vertical">
        <article class="card">primary</article>
      </overflow-guard>
    `) as HTMLElement & { handleHostMutations: () => void }

    setMeasurementBoxSize(element, {
      clientWidth: 120,
      clientHeight: 120,
      scrollWidth: 120,
      scrollHeight: 240,
    })
    triggerResize()

    const primary = getPrimaryChild(element, '.card')
    expect(primary?.classList.contains('card--compact')).toBe(true)

    element.handleHostMutations()

    const measurement = element.querySelector<HTMLElement>(
      ':scope > .card[slot="invisible-measurement"]',
    )

    expect(measurement?.classList.contains('card--compact')).toBe(false)
  })

  it('dispatches overflowchange with the measured state', () => {
    const element = createElement('<overflow-guard><div>primary</div></overflow-guard>')
    const handler = vi.fn()

    element.addEventListener('overflowchange', handler)

    setMeasurementBoxSize(element, {
      clientWidth: 100,
      clientHeight: 100,
      scrollWidth: 220,
      scrollHeight: 220,
    })
    triggerResize()

    expect(handler).toHaveBeenCalled()
    expect(handler.mock.calls.at(-1)?.[0].detail).toEqual({
      isOverflowing: true,
      overflowAxis: 'both',
    })
  })

  it('dispatches overflowchange on the first refresh after overflow appears', () => {
    const element = createElement('<overflow-guard><div>primary</div></overflow-guard>') as
      HTMLElement & { refresh: () => void }
    const handler = vi.fn()

    element.addEventListener('overflowchange', handler)

    setMeasurementBoxSize(element, {
      clientWidth: 100,
      clientHeight: 100,
      scrollWidth: 220,
      scrollHeight: 220,
    })
    element.refresh()

    expect(handler).toHaveBeenCalledOnce()
    expect(handler.mock.calls[0]?.[0].detail).toEqual({
      isOverflowing: true,
      overflowAxis: 'both',
    })
    expect(element.getAttribute('overflow-axis')).toBe('both')
    expect(element.hasAttribute('overflowing')).toBe(true)
  })

  it('limits fallback activation to vertical overflow when check-only is vertical', () => {
    const element = createElement(`
      <overflow-guard fallbackClass="card--compact" check-only="vertical">
        <article class="card">primary</article>
      </overflow-guard>
    `)

    setMeasurementBoxSize(element, {
      clientWidth: 120,
      clientHeight: 120,
      scrollWidth: 120,
      scrollHeight: 240,
    })
    triggerResize()

    const primary = getPrimaryChild(element, '.card')

    expect(primary?.classList.contains('card--compact')).toBe(true)
    expect(element.getAttribute('overflow-axis')).toBe('vertical')
    expect(element.hasAttribute('overflowing')).toBe(true)
  })
})
