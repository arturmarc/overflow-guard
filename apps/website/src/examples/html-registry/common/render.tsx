import { useEffect, useRef } from 'react'

import 'overflow-guard-html'

import type { HtmlExampleDefinition } from './types'

export function HtmlExampleRender({
  example,
}: {
  example: HtmlExampleDefinition
}) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = ref.current

    if (!container) {
      return
    }

    container.innerHTML = example.markup

    return example.setup?.(container)
  }, [example])

  return <div ref={ref} className="contents" style={{ height: '100%', width: '100%', minHeight: 0, minWidth: 0 }} />
}

export function bindStatus(container: HTMLElement, selector: string) {
  const guard = container.querySelector(selector)
  const status = Array.from(
    container.querySelectorAll<HTMLElement>('[data-demo-status]'),
  ).find((candidate) => !candidate.closest('[slot="invisible-measurement"]'))

  if (!(guard instanceof HTMLElement) || !status) {
    return () => undefined
  }

  const sync = () => {
    const axis = guard.getAttribute('overflow-axis') ?? 'none'
    const isOverflowing = guard.hasAttribute('overflowing')

    status.textContent = isOverflowing ? `overflow: ${axis}` : 'fits'
    status.classList.toggle('html-demo-pill-primary', isOverflowing)
  }

  const handler = () => {
    sync()
  }

  sync()
  guard.addEventListener('overflowchange', handler)

  return () => {
    guard.removeEventListener('overflowchange', handler)
  }
}
