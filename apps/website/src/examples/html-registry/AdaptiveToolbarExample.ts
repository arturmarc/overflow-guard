import { htmlExampleIcons as icons } from './common/icons'
import { bindStatus } from './common/render'
import type { HtmlExampleDefinition } from './common/types'

function setupToolbar(container: HTMLElement) {
  const cleanupStatus = bindStatus(container, '[data-demo-toolbar]')
  const button = container.querySelector<HTMLElement>('[data-demo-toggle-extra]')
  const guard = container.querySelector<HTMLElement>('[data-demo-toolbar]')

  if (!button || !guard) {
    return cleanupStatus
  }

  let showExtra = false

  const sync = () => {
    const sources = Array.from(guard.children).filter(
      (child): child is HTMLElement =>
        child instanceof HTMLElement &&
        child.getAttribute('slot') !== 'invisible-measurement' &&
        child.hasAttribute('data-demo-source'),
    )

    for (const source of sources) {
      const extra = source.querySelector<HTMLElement>('[data-demo-extra-action]')

      if (extra) {
        extra.hidden = !showExtra
      }
    }

    button.textContent = showExtra ? 'Hide extra button' : 'Show extra button'
    ;(guard as HTMLElement & { refresh?: () => void }).refresh?.()
  }

  const handleClick = () => {
    showExtra = !showExtra
    sync()
  }

  button.addEventListener('click', handleClick)
  sync()

  return () => {
    button.removeEventListener('click', handleClick)
    cleanupStatus()
  }
}

export const adaptiveToolbarHtmlExample: HtmlExampleDefinition = {
  id: 'adaptive-toolbar',
  title: 'Toolbar adapts in place',
  description:
    'A single toolbar tree adapts with CSS. `fallbackClass` flips just the buttons that need to change.',
  heightClass: 'min-h-[15rem]',
  setup: setupToolbar,
  markup: String.raw`<section class="html-demo-stack">
  <style>
    .html-demo-toolbar-shell .html-demo-icon-action {
      display: none;
    }

    .html-demo-toolbar-shell.html-demo-toolbar-fallback .html-demo-full-action {
      display: none;
    }

    .html-demo-toolbar-shell.html-demo-toolbar-fallback .html-demo-icon-action {
      display: inline-flex;
    }

    .html-demo-toolbar-shell.html-demo-toolbar-fallback .html-demo-toolbar-actions {
      justify-content: flex-end;
    }
  </style>

  <div class="html-demo-header">
    <div class="html-demo-copy">
      <div class="html-demo-title">Project actions</div>
      <div class="html-demo-subtle">
        Toggling extra content triggers the same response as resizing.
      </div>
      <div>
        <button type="button" class="html-demo-button html-demo-button-primary" data-demo-toggle-extra>
          Show extra button
        </button>
      </div>
    </div>
    <span class="html-demo-pill" data-demo-status>fits</span>
  </div>

  <overflow-guard
    fallbackClass="html-demo-toolbar-fallback"
    data-demo-toolbar
  >
    <div class="html-demo-toolbar-shell" data-demo-source="primary">
      <div class="html-demo-toolbar-summary">
        <div class="html-demo-toolbar-icon">${icons.folderKanban}</div>
        <div class="html-demo-toolbar-label">Sprint planning</div>
      </div>
      <div class="html-demo-toolbar-actions">
        <button type="button" class="html-demo-button html-demo-full-action">${icons.search}<span>Search documents</span></button>
        <button type="button" class="html-demo-icon-button html-demo-icon-action" aria-label="Search">${icons.search}</button>
        <button type="button" class="html-demo-button html-demo-full-action" data-demo-extra-action hidden>${icons.fileText}<span>Export brief</span></button>
        <button type="button" class="html-demo-icon-button html-demo-icon-action" data-demo-extra-action hidden aria-label="Export brief">${icons.fileText}</button>
        <button type="button" class="html-demo-button html-demo-full-action">${icons.send}<span>Share update</span></button>
        <button type="button" class="html-demo-icon-button html-demo-icon-action" aria-label="Share update">${icons.send}</button>
        <button type="button" class="html-demo-button html-demo-button-primary html-demo-full-action">${icons.sparkles}<span>Launch flow</span></button>
        <button type="button" class="html-demo-icon-button html-demo-icon-action html-demo-button-primary" aria-label="Launch flow">${icons.sparkles}</button>
      </div>
    </div>
  </overflow-guard>
</section>`,
}
