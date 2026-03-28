import { htmlExampleIcons as icons } from './common/icons'
import { bindStatus } from './common/render'
import type { HtmlExampleDefinition } from './common/types'

export const readMoreHtmlExample: HtmlExampleDefinition = {
  id: 'read-more',
  title: 'Vertical fallback stays in one tree',
  description:
    'The card body, fade, and CTA all switch through `fallbackClass` on the visible article.',
  heightClass: 'h-80',
  setup: (container) => bindStatus(container, '[data-demo-read-more]'),
  markup: String.raw`<overflow-guard data-demo-read-more check-only="vertical" fallbackClass="html-demo-card-fallback" class="h-full min-h-0">
    <article class="html-demo-card [&_.html-demo-read-more-cta]:hidden [&_.html-demo-fade]:hidden [&.html-demo-card-fallback]:h-full [&.html-demo-card-fallback_.html-demo-read-more-cta]:inline-flex [&.html-demo-card-fallback_.html-demo-fade]:block [&.html-demo-card-fallback_.html-demo-read-more-placeholder]:hidden">
      <div class="html-demo-header html-demo-row-static">
        <div class="html-demo-copy">
          <div class="html-demo-title">Release notes draft</div>
          <div class="html-demo-subtle">Height overflow reveals a call to action.</div>
        </div>
        <span class="html-demo-pill" data-demo-status>fits</span>
      </div>
      <div class="html-demo-card-content">
        <div class="html-demo-body html-demo-body-copy h-full">
          OverflowGuard can be used for more than horizontal button rows. This example keeps a
          fixed-height card and measures whether the full article body would exceed the available
          vertical space. When that happens, the visible version trims the copy, exposes a dedicated
          affordance, and still gives the parent layout a stable footprint. That means the surrounding
          card grid stays calm while the content adapts to the available height instead of spilling out awkwardly.
        </div>
        <div class="html-demo-fade"></div>
      </div>
      <div class="html-demo-footer html-demo-row-static">
        <span class="html-demo-subtle html-demo-subtle-caps">Vertical handling</span>
        <span class="html-demo-read-more-placeholder">No overflow yet</span>
        <button type="button" class="html-demo-button html-demo-button-primary html-demo-read-more-cta">${icons.arrowRight}<span>Read more</span></button>
      </div>
    </article>
  </overflow-guard>`,
}
