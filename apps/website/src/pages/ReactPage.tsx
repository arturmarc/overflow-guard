import { reactHeroCode, reactHomeExamples } from '@/examples/react-registry/react-home-examples'
import {
  DemoPreview,
  InstallCard,
  SiteFooter,
  SiteHeader,
} from './components/site-shell'

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

export default function ReactPage() {
  const [heroExample, ...otherExamples] = reactHomeExamples

  if (!heroExample) {
    return null
  }

  return (
    <div className="min-h-screen">
      <SiteHeader activeMode="react" />

      <main className="mx-auto flex max-w-5xl flex-col gap-28 px-6 pb-20 pt-20 md:gap-36 md:px-10 md:pt-32">
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

        <DemoPreview
          title={heroExample.title}
          description={heroExample.description}
          heightClass={heroExample.heightClass}
        >
          {heroExample.render}
        </DemoPreview>

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

        {otherExamples.map((example) => (
          <DemoPreview
            key={example.id}
            title={example.title}
            description={example.description}
            heightClass={example.heightClass}
          >
            {example.render}
          </DemoPreview>
        ))}

        <section className="flex flex-col gap-5">
          <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            Quick start
          </h2>
          <pre className="overflow-x-auto rounded-2xl border border-border bg-card/60 p-6 font-mono text-sm leading-7 text-foreground/85">
            <code>{reactHeroCode}</code>
          </pre>
        </section>

        <SiteFooter pills={['~2 KB', 'TypeScript', 'SSR-safe', 'Zero config']} />
      </main>
    </div>
  )
}
