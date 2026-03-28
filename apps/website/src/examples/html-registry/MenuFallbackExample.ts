import { htmlExampleIcons as icons } from './common/icons'
import { bindStatus } from './common/render'
import type { HtmlExampleDefinition } from './common/types'

export const menuFallbackHtmlExample: HtmlExampleDefinition = {
  id: 'menu-fallback',
  title: 'Navigation collapses to one action',
  description:
    'A full nav can shrink down to a single menu button with the same CSS-first fallback pattern.',
  heightClass: 'min-h-[5rem]',
  setup: (container) => bindStatus(container, '[data-demo-menu]'),
  markup: String.raw`<section class="html-demo-stack">
  <style>
    .html-demo-menu-shell .html-demo-menu-button {
      display: none;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 9999px;
    }

    .html-demo-menu-shell.html-demo-menu-fallback .html-demo-nav-links {
      display: none;
    }

    .html-demo-menu-shell.html-demo-menu-fallback .html-demo-menu-button {
      display: inline-flex;
    }
  </style>

  <div class="html-demo-header">
    <div class="html-demo-copy">
      <div class="html-demo-title">Navigation fallback mode</div>
      <div class="html-demo-subtle">
        A full link row compresses into a single action when space runs out.
      </div>
    </div>
    <span class="html-demo-pill" data-demo-status>fits</span>
  </div>

  <overflow-guard
    data-demo-menu
    check-only="horizontal"
    fallbackClass="html-demo-menu-fallback"
  >
    <nav class="html-demo-menu-shell flex min-w-max items-center justify-between gap-3 rounded-[1.4rem] border bg-card px-4 py-3">
      <div class="flex items-center gap-2 text-sm font-semibold">
        <div class="rounded-full bg-primary/12 p-2 text-primary">
          ${icons.layoutPanelLeft}
        </div>
        OverflowGuard
      </div>
      <div class="html-demo-nav-links flex shrink-0 flex-nowrap items-center gap-2 pl-2 text-sm">
        <a href="#" onclick="return false" class="shrink-0 rounded-full px-3 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground">Docs</a>
        <a href="#" onclick="return false" class="shrink-0 rounded-full px-3 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground">Recipes</a>
        <a href="#" onclick="return false" class="shrink-0 rounded-full px-3 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground">Playground</a>
        <a href="#" onclick="return false" class="shrink-0 rounded-full px-3 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground">Guides</a>
        <a href="#" onclick="return false" class="shrink-0 rounded-full px-3 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground">Changelog</a>
        <a href="#" onclick="return false" class="shrink-0 rounded-full px-3 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground">Pricing</a>
      </div>
      <button type="button" class="html-demo-icon-button html-demo-menu-button" aria-label="Open menu">
        ${icons.menu}
      </button>
    </nav>
  </overflow-guard>
</section>`,
}
