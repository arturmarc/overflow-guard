import type { ReactNode } from 'react'

import {
  ArrowRight,
  BookOpen,
  ChartNoAxesCombined,
  CircleHelp,
  Compass,
  FileText,
  FolderKanban,
  Grid2x2,
  Home,
  LayoutPanelLeft,
  Menu,
  Search,
  Send,
  Sparkles,
  Star,
  Users,
} from 'lucide-react'

import {
  OverflowGuard,
  useOverflowGuard,
} from '@/components/overflow-guard'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type ExampleDefinition = {
  id: string
  title: string
  description: string
  mode: 'fallback' | 'render-prop' | 'mixed'
  previewHeightClassName?: string
  component: ReactNode
  code: string
}

function StatusPill({
  isOverflowing,
  overflowAxis,
}: {
  isOverflowing: boolean
  overflowAxis: string
}) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <span
        className={cn(
          'inline-flex items-center rounded-full border px-2 py-1 font-medium',
          isOverflowing
            ? 'border-primary/30 bg-primary/10 text-primary'
            : 'border-border bg-background text-muted-foreground',
        )}
      >
        {isOverflowing ? `overflow: ${overflowAxis}` : 'fits'}
      </span>
    </div>
  )
}

function IconButton({
  icon,
  label,
}: {
  icon: ReactNode
  label: string
}) {
  return (
    <Button
      aria-label={label}
      className="shrink-0"
      size="icon"
      variant="outline"
    >
      {icon}
    </Button>
  )
}

function BasicLayoutExample() {
  return (
    <OverflowGuard>
      {(isOverflowing, overflowAxis) => (
        <div className="space-y-3">
          <StatusPill
            isOverflowing={isOverflowing}
            overflowAxis={overflowAxis}
          />
          <div
            className={cn(
              'flex gap-3',
              isOverflowing ? 'flex-col' : 'items-center',
            )}
          >
            {[
              { label: 'Signals', Icon: Sparkles },
              { label: 'Routing', Icon: Compass },
              { label: 'Metrics', Icon: ChartNoAxesCombined },
            ].map(({ label, Icon }) => (
              <div
                key={label}
                className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border bg-card px-4 py-3 shadow-sm"
              >
                <Icon className="size-4 shrink-0 text-primary" />
                <div>
                  <div className="text-sm font-medium">{label}</div>
                  <div className="text-xs text-muted-foreground">
                    Rearranges from one row into a vertical stack.
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </OverflowGuard>
  )
}

function ButtonsFallbackExample() {
  const primary = (
    <div className="flex flex-nowrap gap-2">
      <Button className="shrink-0" variant="outline">
        <Search />
        Search
      </Button>
      <Button className="shrink-0" variant="outline">
        <Send />
        Share update
      </Button>
      <Button className="shrink-0">
        <Sparkles />
        Launch flow
      </Button>
    </div>
  )

  const fallback = (
    <div className="flex items-center justify-end gap-2">
      <IconButton icon={<Search />} label="Search" />
      <IconButton icon={<Send />} label="Share update" />
      <IconButton icon={<Sparkles />} label="Launch flow" />
    </div>
  )

  return (
    <div className="space-y-3">
      <div className="text-xs text-muted-foreground">
        <span className="font-medium text-foreground">fallbackOn="horizontal"</span>{' '}
        keeps the full buttons until the row no longer fits.
      </div>
      <OverflowGuard fallback={fallback} fallbackOn="horizontal">
        {primary}
      </OverflowGuard>
    </div>
  )
}

function MenuFallbackExample() {
  const primary = (
    <nav className="flex items-center justify-between gap-3 rounded-[1.4rem] border bg-card px-4 py-3">
      <div className="flex min-w-0 items-center gap-2 text-sm font-semibold">
        <div className="rounded-full bg-primary/12 p-2 text-primary">
          <LayoutPanelLeft className="size-4" />
        </div>
        OverflowGuard
      </div>
      <div className="flex flex-nowrap items-center gap-2 text-sm">
        {['Docs', 'Recipes', 'Playground', 'Pricing'].map((item) => (
          <a
            key={item}
            className="shrink-0 rounded-full px-3 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            href="#"
            onClick={(event) => event.preventDefault()}
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  )

  const fallback = (
    <nav className="flex items-center justify-between gap-3 rounded-[1.4rem] border bg-card px-4 py-3">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <div className="rounded-full bg-primary/12 p-2 text-primary">
          <LayoutPanelLeft className="size-4" />
        </div>
        OverflowGuard
      </div>
      <Button aria-label="Open menu" size="icon" variant="outline">
        <Menu />
      </Button>
    </nav>
  )

  return <OverflowGuard fallback={fallback}>{primary}</OverflowGuard>
}

function ReadMoreExample() {
  return (
    <OverflowGuard className="h-52">
      {(isOverflowing, overflowAxis) => {
        const showReadMore =
          overflowAxis === 'vertical' || overflowAxis === 'both'

        return (
          <article className="flex h-full flex-col rounded-[1.6rem] border bg-card p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold">Release notes draft</div>
                <div className="text-xs text-muted-foreground">
                  Height overflow reveals a call to action.
                </div>
              </div>
              <StatusPill
                isOverflowing={isOverflowing}
                overflowAxis={overflowAxis}
              />
            </div>
            <div className="relative min-h-0 flex-1">
              <p
                className={cn(
                  'pr-2 text-sm leading-6 text-muted-foreground',
                  showReadMore && 'max-h-24 overflow-hidden',
                )}
              >
                OverflowGuard can be used for more than horizontal button rows.
                This example keeps a fixed-height card and measures whether the
                full article body would exceed the available vertical space. When
                that happens, the visible version trims the copy, exposes a
                dedicated affordance, and still gives the parent layout a stable
                footprint. That means the surrounding card grid stays calm while
                the content adapts to the available height instead of spilling
                out awkwardly.
              </p>
              {showReadMore ? (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card via-card/90 to-transparent" />
              ) : null}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Vertical handling
              </span>
              {showReadMore ? (
                <Button size="sm">
                  Read more
                  <ArrowRight />
                </Button>
              ) : (
                <span className="text-xs text-muted-foreground">
                  No overflow yet
                </span>
              )}
            </div>
          </article>
        )
      }}
    </OverflowGuard>
  )
}

function NestedToolbarSummary() {
  const isOverflowing = useOverflowGuard()

  return (
    <div
      className={cn(
        'rounded-full border px-3 py-1 text-xs font-medium',
        isOverflowing
          ? 'border-primary/30 bg-primary/10 text-primary'
          : 'border-border bg-background text-muted-foreground',
      )}
    >
      child guard: {isOverflowing ? 'compressed' : 'expanded'}
    </div>
  )
}

function NestedUsageExample() {
  return (
    <OverflowGuard className="w-full">
      {(shellOverflowing, shellAxis) => (
        <div className="space-y-3">
          <StatusPill
            isOverflowing={shellOverflowing}
            overflowAxis={shellAxis}
          />
          <div
            className={cn(
              'flex w-full gap-3 rounded-[1.8rem] border bg-card p-3 shadow-sm',
              shellOverflowing ? 'flex-col items-stretch' : 'items-center',
            )}
          >
            <div className="flex min-w-0 items-center gap-3 rounded-[1.2rem] bg-muted/70 px-3 py-3">
              <div className="rounded-full bg-primary/12 p-2 text-primary">
                <FolderKanban className="size-4" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">
                  Project Atlas
                </div>
                <div className="text-xs text-muted-foreground">
                  Outer guard shifts the whole shell.
                </div>
              </div>
            </div>
            <OverflowGuard
              className="min-w-0 flex-1"
              containerClassName="min-w-0 flex-1"
            >
              {(actionsOverflowing) => (
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Inner guard
                    </div>
                    <NestedToolbarSummary />
                  </div>
                  <div className="flex min-w-0 flex-nowrap items-center gap-2">
                    {actionsOverflowing ? (
                      <>
                        <IconButton icon={<Home />} label="Home" />
                        <IconButton icon={<Users />} label="Team" />
                        <IconButton icon={<BookOpen />} label="Docs" />
                        <IconButton icon={<CircleHelp />} label="Support" />
                        <IconButton icon={<Star />} label="Watch" />
                      </>
                    ) : (
                      <>
                        <Button className="shrink-0" variant="outline">
                          <Home />
                          Overview
                        </Button>
                        <Button className="shrink-0" variant="outline">
                          <Users />
                          Team updates
                        </Button>
                        <Button className="shrink-0" variant="outline">
                          <BookOpen />
                          Docs space
                        </Button>
                        <Button className="shrink-0" variant="outline">
                          <CircleHelp />
                          Support
                        </Button>
                        <Button className="shrink-0">
                          <Star />
                          Watch board
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </OverflowGuard>
          </div>
        </div>
      )}
    </OverflowGuard>
  )
}

export const exampleRegistry: ExampleDefinition[] = [
  {
    id: 'basic-layout-switch',
    title: 'Basic layout switch',
    description:
      'A row of feature tiles flips into a column and reports the detected overflow axis.',
    mode: 'render-prop',
    previewHeightClassName: 'min-h-[14rem]',
    component: <BasicLayoutExample />,
    code: String.raw`<OverflowGuard>
  {(isOverflowing, overflowAxis) => (
    <div className={isOverflowing ? "flex flex-col gap-3" : "flex gap-3"}>
      <StatusPill isOverflowing={isOverflowing} overflowAxis={overflowAxis} />
      <FeatureTiles />
    </div>
  )}
</OverflowGuard>`,
  },
  {
    id: 'buttons-to-icons',
    title: 'Buttons compress to icons',
    description:
      'The fallback shortcut swaps full buttons for icon-only controls once the toolbar overflows horizontally.',
    mode: 'fallback',
    previewHeightClassName: 'min-h-[11rem]',
    component: <ButtonsFallbackExample />,
    code: String.raw`<OverflowGuard
  fallbackOn="horizontal"
  fallback={
    <div className="flex items-center gap-2">
      <IconButton icon={<Search />} label="Search" />
      <IconButton icon={<Send />} label="Share update" />
      <IconButton icon={<Sparkles />} label="Launch flow" />
    </div>
  }
>
  <div className="flex flex-nowrap gap-2">
    <Button variant="outline"><Search />Search</Button>
    <Button variant="outline"><Send />Share update</Button>
    <Button><Sparkles />Launch flow</Button>
  </div>
</OverflowGuard>`,
  },
  {
    id: 'menu-to-hamburger',
    title: 'Menu collapses to hamburger',
    description:
      'The primary navigation stays fully visible until the fallback replacement is actually needed.',
    mode: 'fallback',
    previewHeightClassName: 'min-h-[11rem]',
    component: <MenuFallbackExample />,
    code: String.raw`<OverflowGuard
  fallback={
    <nav className="flex items-center justify-between rounded-3xl border bg-card px-4 py-3">
      <Brand />
      <Button size="icon" variant="outline" aria-label="Open menu">
        <Menu />
      </Button>
    </nav>
  }
>
  <nav className="flex items-center justify-between rounded-3xl border bg-card px-4 py-3">
    <Brand />
    <div className="flex flex-nowrap gap-2">
      <NavLink>Docs</NavLink>
      <NavLink>Recipes</NavLink>
      <NavLink>Playground</NavLink>
      <NavLink>Pricing</NavLink>
    </div>
  </nav>
</OverflowGuard>`,
  },
  {
    id: 'read-more',
    title: 'Read more appears on height overflow',
    description:
      'A fixed-height article card uses the runtime axis signal to reveal a vertical overflow affordance.',
    mode: 'render-prop',
    previewHeightClassName: 'min-h-[20rem]',
    component: <ReadMoreExample />,
    code: String.raw`<OverflowGuard className="h-52">
  {(isOverflowing, overflowAxis) => {
    const showReadMore =
      overflowAxis === "vertical" || overflowAxis === "both"

    return (
      <article className="flex h-full flex-col rounded-3xl border bg-card p-5">
        <div className={showReadMore ? "max-h-24 overflow-hidden" : ""}>
          <LongArticleCopy />
        </div>
        {showReadMore ? <Button size="sm">Read more</Button> : null}
      </article>
    )
  }}
</OverflowGuard>`,
  },
  {
    id: 'nested-usage',
    title: 'Nested shell and toolbar',
    description:
      'The outer guard changes the overall shell layout while the inner guard independently compresses the action set.',
    mode: 'mixed',
    previewHeightClassName: 'min-h-[18rem]',
    component: <NestedUsageExample />,
    code: String.raw`<OverflowGuard className="w-full">
  {(shellOverflowing, shellAxis) => (
    <div className={shellOverflowing ? "flex flex-col gap-3" : "flex gap-3"}>
      <ProjectSummary />
      <OverflowGuard className="min-w-0 flex-1" containerClassName="min-w-0 flex-1">
        {(actionsOverflowing) =>
          actionsOverflowing ? <ActionIcons /> : <ActionButtons />
        }
      </OverflowGuard>
    </div>
  )}
</OverflowGuard>`,
  },
]

export const publicApiSnippets = {
  fallback: String.raw`type OverflowGuardFallbackProps = {
  children: ReactNode
  fallback: ReactNode
  fallbackOn?: "both" | "horizontal" | "vertical"
} & HTMLAttributes<HTMLDivElement>`,
  renderProp: String.raw`type OverflowGuardRenderProps = {
  children: (
    isOverflowing: boolean,
    overflowAxis: "none" | "horizontal" | "vertical" | "both"
  ) => ReactNode
  fallback?: never
  fallbackOn?: never
} & HTMLAttributes<HTMLDivElement>`,
}

export const usageHighlights = [
  'Use `fallback` when the overflowing state should swap in a replacement tree.',
  'Use the render prop when the overflowing state should adapt the same view in place.',
  'Call `useOverflowGuard()` inside descendants when nested content only needs the boolean state.',
  'Use `containerClassName` or `containerStyle` when the outer measuring wrapper needs layout constraints.',
]

export const demoStats = [
  { label: 'Examples', value: exampleRegistry.length.toString() },
  { label: 'Modes', value: 'fallback + render' },
  { label: 'Axis signal', value: 'runtime' },
  { label: 'Layout', value: 'all live' },
]

export const featureBadges = [
  'render prop',
  'fallback prop',
  'runtime axis',
  'nested composition',
]

export const heroCode = String.raw`import { OverflowGuard } from "@/components/overflow-guard"

<OverflowGuard fallbackOn="horizontal" fallback={<CompactActions />}>
  <FullActions />
</OverflowGuard>

<OverflowGuard>
  {(isOverflowing, overflowAxis) => (
    <Toolbar data-axis={overflowAxis} compact={isOverflowing} />
  )}
</OverflowGuard>`

export const exampleIcons = {
  fallback: Grid2x2,
  'render-prop': FileText,
  mixed: FolderKanban,
}
