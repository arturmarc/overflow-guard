import { HtmlExampleRender } from '@/examples/html-registry/common/render'
import type { HtmlExampleDefinition } from '@/examples/html-registry/common/types'

const greedyNavExample = {
  id: 'greedy-nav',
  title: 'Greedy nav',
  description:
    'Nested custom elements progressively move links into a More menu.',
  heightClass: 'min-h-[14rem]',
  markup: String.raw`<style>
  .dev-greedy-demo {
    display: flex;
    min-height: 100%;
    min-width: 0;
    flex-direction: column;
    gap: 1rem;
  }

  .dev-greedy-copy {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .dev-greedy-eyebrow,
  .dev-greedy-hint {
    margin: 0;
    color: hsl(var(--muted-foreground));
    font-size: 0.82rem;
    line-height: 1.45;
  }

  .dev-greedy-eyebrow {
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .dev-greedy-step > .dev-greedy-fallback {
    display: none;
  }

  .dev-greedy-step.is-overflowing > .dev-greedy-primary {
    display: none;
  }

  .dev-greedy-step.is-overflowing > .dev-greedy-fallback {
    display: block;
  }

  .dev-greedy-nav {
    display: flex;
    min-width: max-content;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    border: 1px solid hsl(var(--border));
    border-radius: 1rem;
    background: hsl(var(--card));
    padding: 0.625rem;
    box-shadow: 0 16px 40px hsl(var(--foreground) / 0.08);
  }

  .dev-greedy-brand {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    gap: 0.55rem;
    color: hsl(var(--foreground));
    font-size: 0.95rem;
    font-weight: 800;
    text-decoration: none;
    white-space: nowrap;
  }

  .dev-greedy-brand-mark {
    display: grid;
    width: 2.125rem;
    height: 2.125rem;
    place-items: center;
    border-radius: 0.625rem;
    background: hsl(var(--primary));
    color: hsl(var(--primary-foreground));
  }

  .dev-greedy-links {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    gap: 0.375rem;
  }

  .dev-greedy-links > a,
  .dev-greedy-more button,
  .dev-greedy-more-menu a {
    color: hsl(var(--muted-foreground));
    font: inherit;
    font-size: 0.875rem;
    text-decoration: none;
    white-space: nowrap;
  }

  .dev-greedy-links > a,
  .dev-greedy-more button {
    display: inline-flex;
    height: 2.25rem;
    align-items: center;
    border: 0;
    border-radius: 0.625rem;
    background: transparent;
    padding: 0 0.75rem;
    cursor: pointer;
  }

  .dev-greedy-links > a:hover,
  .dev-greedy-more button:hover {
    background: hsl(var(--muted));
    color: hsl(var(--foreground));
  }

  .dev-greedy-more {
    position: relative;
  }

  .dev-greedy-more-menu {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    z-index: 10;
    display: none;
    min-width: 9.5rem;
    flex-direction: column;
    gap: 0.125rem;
    border: 1px solid hsl(var(--border));
    border-radius: 0.75rem;
    background: hsl(var(--card));
    padding: 0.375rem;
    box-shadow: 0 18px 45px hsl(var(--foreground) / 0.12);
  }

  .dev-greedy-more:hover .dev-greedy-more-menu,
  .dev-greedy-more:focus-within .dev-greedy-more-menu {
    display: flex;
  }

  .dev-greedy-more-menu a {
    display: block;
    border-radius: 0.5rem;
    padding: 0.55rem 0.625rem;
  }

  .dev-greedy-more-menu a:hover {
    background: hsl(var(--muted));
    color: hsl(var(--foreground));
  }
</style>

<section class="dev-greedy-demo">
  <div class="dev-greedy-copy">
    <p class="dev-greedy-eyebrow">overflow-guard-html</p>
    <p class="dev-greedy-hint">Drag the bottom-right edge of this frame to resize the demo.</p>
  </div>

  <overflow-guard fallback-class="is-overflowing">
    <div class="dev-greedy-step">
      <nav class="dev-greedy-nav dev-greedy-primary" aria-label="Primary navigation">
        <a class="dev-greedy-brand" href="#">
          <span class="dev-greedy-brand-mark">◇</span>
          Guardboard
        </a>

        <div class="dev-greedy-links">
          <a href="#">Docs</a>
          <a href="#">Examples</a>
          <a href="#">Recipes</a>
          <a href="#">Pricing</a>
        </div>
      </nav>

      <div class="dev-greedy-fallback">
        <overflow-guard fallback-class="is-overflowing">
          <div class="dev-greedy-step">
            <nav class="dev-greedy-nav dev-greedy-primary" aria-label="Primary navigation">
              <a class="dev-greedy-brand" href="#">
                <span class="dev-greedy-brand-mark">◇</span>
                Guardboard
              </a>

              <div class="dev-greedy-links">
                <a href="#">Docs</a>
                <a href="#">Examples</a>
                <a href="#">Recipes</a>

                <div class="dev-greedy-more">
                  <button type="button">More ▾</button>
                  <div class="dev-greedy-more-menu">
                    <a href="#">Pricing</a>
                  </div>
                </div>
              </div>
            </nav>

            <div class="dev-greedy-fallback">
              <overflow-guard fallback-class="is-overflowing">
                <div class="dev-greedy-step">
                  <nav class="dev-greedy-nav dev-greedy-primary" aria-label="Primary navigation">
                    <a class="dev-greedy-brand" href="#">
                      <span class="dev-greedy-brand-mark">◇</span>
                      Guardboard
                    </a>

                    <div class="dev-greedy-links">
                      <a href="#">Docs</a>
                      <a href="#">Examples</a>

                      <div class="dev-greedy-more">
                        <button type="button">More ▾</button>
                        <div class="dev-greedy-more-menu">
                          <a href="#">Recipes</a>
                          <a href="#">Pricing</a>
                        </div>
                      </div>
                    </div>
                  </nav>

                  <div class="dev-greedy-fallback">
                    <overflow-guard fallback-class="is-overflowing">
                      <div class="dev-greedy-step">
                        <nav class="dev-greedy-nav dev-greedy-primary" aria-label="Primary navigation">
                          <a class="dev-greedy-brand" href="#">
                            <span class="dev-greedy-brand-mark">◇</span>
                            Guardboard
                          </a>

                          <div class="dev-greedy-links">
                            <a href="#">Docs</a>

                            <div class="dev-greedy-more">
                              <button type="button">More ▾</button>
                              <div class="dev-greedy-more-menu">
                                <a href="#">Examples</a>
                                <a href="#">Recipes</a>
                                <a href="#">Pricing</a>
                              </div>
                            </div>
                          </div>
                        </nav>

                        <nav class="dev-greedy-nav dev-greedy-fallback" aria-label="Primary navigation">
                          <a class="dev-greedy-brand" href="#">
                            <span class="dev-greedy-brand-mark">◇</span>
                            Guardboard
                          </a>

                          <div class="dev-greedy-links">
                            <div class="dev-greedy-more">
                              <button type="button">More ▾</button>
                              <div class="dev-greedy-more-menu">
                                <a href="#">Docs</a>
                                <a href="#">Examples</a>
                                <a href="#">Recipes</a>
                                <a href="#">Pricing</a>
                              </div>
                            </div>
                          </div>
                        </nav>
                      </div>
                    </overflow-guard>
                  </div>
                </div>
              </overflow-guard>
            </div>
          </div>
        </overflow-guard>
      </div>
    </div>
  </overflow-guard>
</section>`,
} satisfies HtmlExampleDefinition

export default function DevPage() {
  return (
    <div className="min-h-screen">
      <main className="mx-auto flex max-w-4xl flex-col px-6 pt-6 pb-10 md:px-10">
        <div className="demo-preview relative min-h-[14rem] w-[44rem] max-w-full min-w-[14rem] resize overflow-hidden rounded-2xl border border-border bg-card/60 p-6">
          <HtmlExampleRender example={greedyNavExample} />
        </div>
      </main>
    </div>
  )
}
