import type { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/utils'

export function StatusPill({
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
          'inline-flex items-center rounded-full border px-2 py-1 font-medium whitespace-nowrap',
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

export function IconButton({
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
