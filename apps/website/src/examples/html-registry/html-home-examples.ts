import { adaptiveToolbarHtmlExample } from './AdaptiveToolbarExample'
import { menuFallbackHtmlExample } from './MenuFallbackExample'
import { readMoreHtmlExample } from './ReadMoreExample'

export { adaptiveToolbarHtmlExample } from './AdaptiveToolbarExample'
export { menuFallbackHtmlExample } from './MenuFallbackExample'
export { readMoreHtmlExample } from './ReadMoreExample'
export type { HtmlExampleDefinition } from './common/types'

export const htmlHomeExamples = [
  adaptiveToolbarHtmlExample,
  readMoreHtmlExample,
  menuFallbackHtmlExample,
]

export const htmlDevExample = adaptiveToolbarHtmlExample

export const htmlHeroCode = String.raw`<script type="module">
  import 'overflow-guard-html'
</script>

<style>
  .toolbar .icon-action {
    display: none;
  }

  .toolbar.toolbar--compact .full-action {
    display: none;
  }

  .toolbar.toolbar--compact .icon-action {
    display: inline-flex;
  }
</style>

<overflow-guard check-only="horizontal" fallbackClass="toolbar--compact">
  <nav class="toolbar">
    <span>Sprint planning</span>
    <div>
      <button class="full-action">Search documents</button>
      <button class="icon-action" aria-label="Search">S</button>
      <button class="full-action">Share update</button>
      <button class="icon-action" aria-label="Share">U</button>
      <button class="full-action">Launch flow</button>
      <button class="icon-action" aria-label="Launch">+</button>
    </div>
  </nav>
</overflow-guard>`
