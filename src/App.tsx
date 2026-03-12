import { BookOpen, MoveHorizontal, ScanSearch, Sparkles } from 'lucide-react'

import {
  demoStats,
  exampleIcons,
  exampleRegistry,
  featureBadges,
  heroCode,
  publicApiSnippets,
  usageHighlights,
} from '@/examples/registry'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

function App() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-6 md:px-8 md:py-10">
      <section className="mesh-panel overflow-hidden rounded-[2rem] border border-white/60 shadow-[0_18px_70px_-36px_rgba(120,58,24,0.45)]">
        <div className="grid gap-8 px-5 py-6 md:grid-cols-[minmax(0,1.4fr)_minmax(19rem,0.9fr)] md:px-8 md:py-8">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {featureBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-medium tracking-[0.16em] text-primary uppercase"
                >
                  {badge}
                </span>
              ))}
            </div>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance md:text-6xl">
                OverflowGuard
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                A React component for measuring whether primary content still
                fits, then either switching to a fallback tree or adapting the
                same view with a render prop.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {demoStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[1.3rem] border bg-card/80 px-4 py-3 shadow-sm backdrop-blur"
                >
                  <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {stat.label}
                  </div>
                  <div className="mt-2 text-sm font-semibold">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
          <Card className="border-0 bg-zinc-950 text-zinc-50 ring-1 ring-black/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-zinc-50">
                <Sparkles className="size-4 text-amber-300" />
                Quick start
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Two mutually exclusive public modes: fallback replacement or
                render-prop adaptation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="overflow-x-auto text-sm leading-6 text-zinc-100">
                <code>{heroCode}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.9fr)]">
        <Card className="mesh-panel">
          <CardHeader>
            <CardTitle>Public API</CardTitle>
            <CardDescription>
              The render prop gets the runtime overflow axis. The fallback mode
              keeps the API compact and explicit.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="fallback">
              <TabsList>
                <TabsTrigger value="fallback">
                  <MoveHorizontal className="size-4" />
                  Fallback mode
                </TabsTrigger>
                <TabsTrigger value="render-prop">
                  <ScanSearch className="size-4" />
                  Render prop
                </TabsTrigger>
              </TabsList>
              <TabsContent value="fallback" className="mt-4">
                <pre className="overflow-x-auto rounded-[1.4rem] bg-zinc-950 p-4 text-sm leading-6 text-zinc-100">
                  <code>{publicApiSnippets.fallback}</code>
                </pre>
              </TabsContent>
              <TabsContent value="render-prop" className="mt-4">
                <pre className="overflow-x-auto rounded-[1.4rem] bg-zinc-950 p-4 text-sm leading-6 text-zinc-100">
                  <code>{publicApiSnippets.renderProp}</code>
                </pre>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="size-4 text-primary" />
              Usage notes
            </CardTitle>
            <CardDescription>
              A few practical rules that keep the measured and visible versions
              predictable.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {usageHighlights.map((highlight) => (
              <div
                key={highlight}
                className="rounded-[1.2rem] border bg-muted/35 px-4 py-3 text-sm text-muted-foreground"
              >
                {highlight}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">
            Live example gallery
          </h2>
          <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
            Every example runs at the same time. Each preview area is resizable,
            so you can drag the lower-right corner to force breakpoints and see
            the measured behavior in action.
          </p>
        </div>
        <div className="grid gap-5 xl:grid-cols-2">
          {exampleRegistry.map((example) => {
            const ExampleIcon = exampleIcons[example.mode]

            return (
              <Card key={example.id} className="overflow-visible">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        <ExampleIcon className="size-4 text-primary" />
                        {example.title}
                      </CardTitle>
                      <CardDescription>{example.description}</CardDescription>
                    </div>
                    <span className="rounded-full border bg-muted/60 px-3 py-1 text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
                      {example.mode}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="preview-grid rounded-[1.6rem] border bg-muted/30 p-3">
                    <div className="overflow-auto rounded-[1.3rem] border border-border/80 bg-background/95 p-3 shadow-sm">
                      <div
                        className={`mx-auto resize overflow-auto rounded-[1.2rem] border border-dashed border-primary/20 bg-card p-4 shadow-sm ${example.previewHeightClassName ?? 'min-h-[12rem]'} min-w-[17rem] max-w-full`}
                      >
                        {example.component}
                      </div>
                    </div>
                    <div className="pt-3 text-right text-xs text-muted-foreground">
                      Drag the preview corner to resize
                    </div>
                  </div>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="code">
                      <AccordionTrigger>Usage snippet</AccordionTrigger>
                      <AccordionContent>
                        <pre className="overflow-x-auto rounded-[1.2rem] bg-zinc-950 p-4 text-sm leading-6 text-zinc-100">
                          <code>{example.code}</code>
                        </pre>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      <Separator />

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: 'Fallback-first replacements',
            body: 'Use the fallback shortcut when the overflowing state should replace the whole interaction pattern, like menus or condensed toolbars.',
          },
          {
            title: 'Render-prop adaptation',
            body: 'Use the render prop when you want to keep one mental model and tune the visible layout with `isOverflowing` and the runtime axis.',
          },
          {
            title: 'Nested composition',
            body: 'Multiple guards can collaborate so a parent changes structure while a child compresses only its own surface area.',
          },
        ].map((item) => (
          <Card key={item.title} size="sm" className="h-full">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">
                {item.body}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  )
}

export default App
