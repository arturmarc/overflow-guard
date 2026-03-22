import { useState, type ReactNode } from 'react'
import { Check, Copy } from 'lucide-react'

import {
  AdaptiveToolbarExample,
  heroCode,
  MenuFallbackExample,
  ReadMoreExample,
} from '@/examples/registry'
import { Button } from '@/components/ui/button'

type InstallCardProps = {
  command: string
}

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 fill-current"
    >
      <path d="M12 0.5C5.37 0.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.2 11.38 0.6 0.1 0.82-0.26 0.82-0.58 0-0.28-0.01-1.04-0.02-2.04-3.34 0.73-4.04-1.61-4.04-1.61-0.54-1.39-1.33-1.76-1.33-1.76-1.09-0.75 0.08-0.73 0.08-0.73 1.2 0.08 1.84 1.24 1.84 1.24 1.08 1.84 2.82 1.31 3.5 1 0.11-0.78 0.42-1.31 0.76-1.61-2.66-0.3-5.47-1.33-5.47-5.93 0-1.31 0.47-2.38 1.24-3.22-0.13-0.3-0.54-1.52 0.12-3.16 0 0 1.01-0.32 3.3 1.23 0.96-0.27 1.98-0.4 3-0.4s2.04 0.14 3 0.4c2.29-1.55 3.29-1.23 3.29-1.23 0.67 1.64 0.25 2.86 0.12 3.16 0.77 0.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92 0.43 0.38 0.82 1.1 0.82 2.22 0 1.61-0.01 2.91-0.01 3.3 0 0.32 0.22 0.69 0.83 0.57C20.57 22.29 24 17.79 24 12.5 24 5.87 18.63 0.5 12 0.5z" />
    </svg>
  )
}

function InstallCard({ command }: InstallCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="flex min-w-0 max-w-full flex-col gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-3">
      <div className="group flex min-w-0 items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div
            className="flex min-w-0 items-center gap-2.5 overflow-hidden font-mono text-sm text-foreground/65"
            title={command}
          >
            <span className="select-none text-foreground/65">$</span>
            <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
              {command}
            </span>
          </div>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="shrink-0 text-foreground/20 opacity-5 transition duration-200 group-hover:text-foreground/65 group-hover:opacity-100 focus-visible:text-foreground/65 focus-visible:opacity-100 hover:text-foreground"
          onClick={() => {
            void handleCopy()
          }}
          aria-label={`Copy command: ${command}`}
        >
          {copied ? <Check /> : <Copy />}
        </Button>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Demo preview with resize slider
// ---------------------------------------------------------------------------

function DemoPreview({
  title,
  description,
  heightClass = 'min-h-[12rem]',
  children,
}: {
  title: string
  description: string
  heightClass?: string
  children: ReactNode
}) {
  const [widthPct, setWidthPct] = useState(100)

  return (
    <section className="flex flex-col gap-3">
      <div>
        <h3 className="text-base font-medium">{title}</h3>
        <p className="text-sm text-foreground/80">{description}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="shrink-0 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          ↔ Resize
        </span>
        <input
          type="range"
          min={30}
          max={100}
          value={widthPct}
          onChange={(e) => setWidthPct(Number(e.target.value))}
          className="demo-slider flex-1"
        />
        <span className="w-10 shrink-0 text-right text-xs font-medium tabular-nums text-muted-foreground">
          {widthPct}%
        </span>
      </div>
      <div
        style={{ width: `${widthPct.toString()}%` }}
        className={`overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 transition-[width] duration-100 ease-out ${heightClass} min-w-[17rem] resize`}
      >
        {children}
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

function App() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-14 px-6 py-10 md:py-16">
      {/* Hero */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <img
            src="/favicon.svg"
            alt="Overflow Guard logo"
            className="h-9 w-9 shrink-0"
          />
          <a
            href="https://github.com/arturmarc/overflow-guard"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition hover:bg-white/[0.04] hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
          >
            <GitHubIcon />
          </a>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-semibold leading-[1.2] text-center md:text-[3.25rem]">
            <code className="rounded-lg bg-primary/15 px-2.5 py-1 font-mono font-semibold text-primary">
              &lt;OverflowGuard&gt;
            </code>{' '}<br />
            enables building around content, not breakpoints
          </h1>
          <p className="max-w-2xl text-xl leading-relaxed text-justify text-foreground/80 md:text-2xl md:leading-relaxed">
            Allows your components to adapt to their content, not the
            viewport. No media or container queries. No magic pixel values.
          </p>
        </div>
        <div className="flex justify-end">
          <div className="grid w-full max-w-full items-start gap-4 md:grid-cols-2">
            <div className="flex min-w-0 flex-col gap-2">
              <p className="font-medium text-foreground/75">for you</p>
              <InstallCard command="npm i overflow-guard-react" />
            </div>
            <div className="flex min-w-0 flex-col gap-2">
              <p className="text-md font-medium text-foreground/75">
                ..and for your{' '}
                <em className="font-semibold text-primary not-italic">
                  agent
                </em>
              </p>
              <InstallCard command="npx skills add https://github.com/arturmarc/overflow-guard --skill overflow-guard" />
            </div>
          </div>
        </div>
      </section>

      {/* Hero demo: Toolbar */}
      <DemoPreview
        title="Toolbar adapts in place"
        description="Buttons collapse to icons when they stop fitting. No breakpoint needed."
        heightClass="min-h-[14rem]"
      >
        <AdaptiveToolbarExample />
      </DemoPreview>

      {/* Problem → Solution */}
      <section className="flex flex-col gap-4">
        <p className="text-2xl font-medium leading-snug text-foreground/75 md:text-3xl md:leading-snug">
          Media queries respond to the viewport. Container queries respond to
          the parent.{' '}
          <span className="text-foreground">
            Neither responds to the actual content.
          </span>
        </p>
        <p className="text-lg leading-relaxed text-foreground/75 md:text-xl">
          Wrap your UI in <code>&lt;OverflowGuard&gt;</code>. It tells you
          when content stops fitting. You decide what happens next.
        </p>
      </section>

      {/* Wins */}
      <section className="grid gap-px overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.08] md:grid-cols-3">
        {[
          {
            title: 'Works with dynamic content',
            body: 'Add a nav item, translate to German, resize a sidebar — it adapts.',
          },
          {
            title: 'No breakpoints to maintain',
            body: 'No pixel values to guess. Behavior follows what actually fits.',
          },
          {
            title: 'One component, drop-in',
            body: 'Wrap existing UI. No layout rewrite needed.',
          },
        ].map((item) => (
          <div key={item.title} className="bg-background p-5">
            <div className="text-sm font-medium">{item.title}</div>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground/75">
              {item.body}
            </p>
          </div>
        ))}
      </section>

      {/* Demo: Menu */}
      <DemoPreview
        title="Menu collapses to hamburger"
        description="Full navigation swaps to a menu button when links stop fitting."
        heightClass="min-h-[5rem]"
      >
        <MenuFallbackExample />
      </DemoPreview>

      {/* Demo: Read more */}
      <DemoPreview
        title="Read more on height overflow"
        description="Vertical overflow reveals a call to action. Same component, different axis."
        heightClass="min-h-[18rem]"
      >
        <ReadMoreExample />
      </DemoPreview>

      {/* Quick start */}
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Quick start</h2>
        <pre className="overflow-x-auto rounded-xl border border-white/[0.08] bg-black/30 p-5 text-sm leading-7 text-foreground/80">
          <code>{heroCode}</code>
        </pre>
      </section>

      {/* Footer */}
      <footer className="flex flex-wrap items-center gap-3 border-t border-white/[0.08] pt-6 text-xs text-foreground/70">
        {['~2 KB', 'TypeScript', 'SSR-safe', 'Zero config'].map((pill) => (
          <span
            key={pill}
            className="rounded-full border border-white/[0.08] px-3 py-1.5"
          >
            {pill}
          </span>
        ))}
      </footer>
    </main>
  )
}

export default App
