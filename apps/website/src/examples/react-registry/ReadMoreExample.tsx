import { ArrowRight } from 'lucide-react'

import { OverflowGuard } from 'overflow-guard-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils'
import { StatusPill } from './common/components'

export function ReadMoreExample() {
  return (
    <OverflowGuard className="h-full" containerClassName="h-full">
      {(isOverflowing, overflowAxis) => {
        const showReadMore =
          overflowAxis === 'vertical' || overflowAxis === 'both'

        return (
          <article
            className={cn(
              'flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[1.6rem] border bg-card p-10 shadow-sm',
              isOverflowing && 'h-full',
            )}
          >
            <div className="mb-3 flex shrink-0 items-center justify-between gap-3">
              <div className="min-w-0">
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
            <div className="relative min-h-0 min-w-0 flex-1">
              <p className="h-full overflow-hidden pr-2 text-sm leading-6 text-muted-foreground">
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
            <div className="mt-4 flex shrink-0 min-w-0 items-center justify-between gap-3">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Vertical handling
              </span>
              {showReadMore ? (
                <Button className="shrink-0" size="sm">
                  Read more
                  <ArrowRight />
                </Button>
              ) : (
                <span className="inline-flex min-h-7 items-center text-xs text-muted-foreground">
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
