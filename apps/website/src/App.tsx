import { useState, type ReactNode } from 'react'
import { Check, Copy, ArrowUpRight } from 'lucide-react'

import {
  AdaptiveToolbarExample,
  heroCode,
  MenuFallbackExample,
  ReadMoreExample,
} from '@/examples/registry'
import { Button } from '@/components/ui/button'

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

function InstallCard({ label, command }: { label: string; command: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="flex min-w-0 flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <div className="group flex min-w-0 items-center gap-3 rounded-xl border border-border bg-card/60 px-4 py-3 backdrop-blur-sm">
        <span className="shrink-0 font-mono text-sm text-muted-foreground select-none">
          $
        </span>
        <code
          className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-mono text-sm text-foreground/80"
          title={command}
        >
          {command}
        </code>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="shrink-0 text-foreground/20 opacity-0 transition duration-200 group-hover:text-foreground/60 group-hover:opacity-100 focus-visible:text-foreground/60 focus-visible:opacity-100"
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

function ResizeGrip() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-1.5 bottom-1.5 text-muted-foreground/40 transition-colors group-hover/preview:text-muted-foreground/70"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <circle cx="17" cy="3" r="1.4" />
        <circle cx="17" cy="10" r="1.4" />
        <circle cx="10" cy="10" r="1.4" />
        <circle cx="17" cy="17" r="1.4" />
        <circle cx="10" cy="17" r="1.4" />
        <circle cx="3" cy="17" r="1.4" />
      </svg>
    </div>
  )
}

function DemoPreview({
  title,
  description,
  heightClass = 'min-h-48',
  children,
}: {
  title: string
  description: string
  heightClass?: string
  children: ReactNode
}) {
  const [widthPct, setWidthPct] = useState(100)

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-1.5">
          <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            {title}
          </h3>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Width
          </span>
          <input
            type="range"
            min={40}
            max={100}
            value={widthPct}
            onChange={(e) => setWidthPct(Number(e.target.value))}
            className="demo-slider w-48"
          />
          <span className="w-9 text-right font-mono text-xs font-medium tabular-nums text-muted-foreground">
            {widthPct}%
          </span>
        </div>
      </div>
      <div
        style={{ width: `${widthPct.toString()}%` }}
        className={`demo-preview group/preview relative min-w-0 overflow-hidden rounded-2xl border border-border bg-card/60 p-6 resize ${heightClass}`}
      >
        {children}
        <ResizeGrip />
      </div>
    </section>
  )
}

const features = [
  {
    title: 'Dynamic content ready',
    body: 'Add a nav item, translate a label, resize a sidebar — it adapts instantly.',
  },
  {
    title: 'Zero breakpoints',
    body: 'No pixel values to guess or maintain. Behavior follows what actually fits.',
  },
  {
    title: 'One component, drop-in',
    body: 'Wrap existing UI. No layout rewrite. Works with any component tree.',
  },
]

function App() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 pt-8 md:px-10 md:pt-12">
        <div className="flex items-center gap-3">
          <img
            src="/favicon.svg"
            alt="Overflow Guard logo"
            className="h-8 w-8 shrink-0"
          />
          <span className="font-display text-lg font-semibold tracking-tight">
            OverflowGuard
          </span>
        </div>
        <a
          href="https://github.com/arturmarc/overflow-guard"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon />
          <span className="hidden sm:inline">GitHub</span>
          <ArrowUpRight className="hidden h-3.5 w-3.5 sm:block" />
        </a>
      </nav>

      <main className="mx-auto flex max-w-5xl flex-col gap-28 px-6 pb-20 pt-20 md:gap-36 md:px-10 md:pt-32">
        {/* ——— Hero ——— */}
        <section className="flex flex-col items-center gap-10 text-center animate-fade-in-up">
          <div className="flex flex-col items-center gap-6">
            <code className="rounded-2xl bg-primary/10 px-5 py-2.5 font-mono text-xl font-semibold text-primary md:text-5xl">
              &lt;OverflowGuard&gt;
            </code>
            <h1 className="font-display text-[2.75rem] leading-[1.08] font-semibold tracking-tight md:text-7xl md:leading-[1.06]">
              Build around content,
              <br />
              not breakpoints.
            </h1>
            <p className="mx-auto max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl md:leading-relaxed">
              A React component that knows when content stops fitting.
              No&nbsp;media queries. No&nbsp;container queries. No&nbsp;magic
              numbers.
            </p>
          </div>

          <div className="grid w-full max-w-2xl gap-5 text-left md:grid-cols-2">
            <InstallCard label="Install" command="npm i overflow-guard-react" />
            <InstallCard
              label="Agent skill"
              command="npx skills add https://github.com/arturmarc/overflow-guard --skill overflow-guard-react"
            />
          </div>
        </section>

        {/* ——— Demo: Toolbar ——— */}
        <DemoPreview
          title="Toolbar adapts in place"
          description="Buttons collapse to icons when they stop fitting. Toggle extra content to trigger the same response as resizing."
          heightClass="min-h-[14rem]"
        >
          <AdaptiveToolbarExample />
        </DemoPreview>

        {/* ——— Value Proposition ——— */}
        <section className="flex flex-col gap-5">
          <p className="font-display text-2xl leading-snug font-medium tracking-tight text-foreground/70 md:text-4xl md:leading-snug">
            Media queries respond to the viewport. Container queries respond to
            the parent.{' '}
            <span className="text-foreground">
              Neither responds to what&apos;s actually inside.
            </span>
          </p>
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Wrap your UI in <code>&lt;OverflowGuard&gt;</code>. It tells you
            when content overflows. You decide what happens next — swap to
            compact icons, show a hamburger menu, or collapse into a stack.
          </p>
        </section>

        {/* ——— Features ——— */}
        <section className="grid gap-5 md:grid-cols-3">
          {features.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-card/60 p-6"
            >
              <h4 className="font-display text-base font-semibold tracking-tight">
                {item.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </div>
          ))}
        </section>

        {/* ——— Demo: Menu ——— */}
        <DemoPreview
          title="Menu collapses to hamburger"
          description="Full navigation swaps to a menu button when links stop fitting. Fallback mode handles the switch."
          heightClass="min-h-[5rem]"
        >
          <MenuFallbackExample />
        </DemoPreview>

        {/* ——— Demo: Read more ——— */}
        <DemoPreview
          title="Read more on height overflow"
          description="Vertical overflow reveals a call to action. Same component, different axis. Drag the corner to resize height."
          heightClass="h-80"
        >
          <ReadMoreExample />
        </DemoPreview>

        {/* ——— Quick start ——— */}
        <section className="flex flex-col gap-5">
          <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            Quick start
          </h2>
          <pre className="overflow-x-auto rounded-2xl border border-border bg-card/60 p-6 font-mono text-sm leading-7 text-foreground/85">
            <code>{heroCode}</code>
          </pre>
        </section>

        {/* ——— Footer ——— */}
        <footer className="flex flex-col gap-6 border-t border-border/60 pt-8">
          <div className="flex flex-wrap gap-2.5">
            {['~2 KB', 'TypeScript', 'SSR-safe', 'Zero config'].map(
              (pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-border px-3.5 py-1.5 text-xs font-medium text-muted-foreground"
                >
                  {pill}
                </span>
              ),
            )}
          </div>
          <p className="text-xs text-muted-foreground/70">
            MIT License &middot; Built by{' '}
            <a
              href="https://github.com/arturmarc"
              className="text-muted-foreground underline decoration-border/60 underline-offset-2 transition hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              Artur Marczyk
            </a>
          </p>
        </footer>
      </main>
    </div>
  )
}

export default App
