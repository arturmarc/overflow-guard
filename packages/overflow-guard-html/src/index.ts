import { OverflowGuardElement } from './overflow-guard'

export { OverflowGuardElement } from './overflow-guard'

export function defineOverflowGuard(tagName = 'overflow-guard') {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, OverflowGuardElement)
  }

  return customElements.get(tagName)
}

defineOverflowGuard()
