import { LayoutPanelLeft, Menu } from 'lucide-react'

import { OverflowGuard } from 'overflow-guard-react'
import { Button } from '@/components/ui/button'

export function MenuFallbackExample() {
  const primary = (
    <nav className="flex min-w-max items-center justify-between gap-3 rounded-[1.4rem] border bg-card px-4 py-3">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <div className="rounded-full bg-primary/12 p-2 text-primary">
          <LayoutPanelLeft className="size-4" />
        </div>
        OverflowGuard
      </div>
      <div className="flex flex-nowrap items-center gap-2 text-sm pl-2 shrink-0">
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
      <Button
        aria-label="Open menu"
        className="size-9"
        size="icon"
        variant="outline"
      >
        <Menu />
      </Button>
    </nav>
  )

  return <OverflowGuard fallback={fallback}>{primary}</OverflowGuard>
}
