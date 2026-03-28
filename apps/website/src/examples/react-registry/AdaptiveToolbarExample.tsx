import { useState } from 'react'
import { FileText, FolderKanban, Search, Send, Sparkles } from 'lucide-react'

import { OverflowGuard } from 'overflow-guard-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils'
import { IconButton, StatusPill } from './common/components'

export function AdaptiveToolbarExample() {
  const [showExtraAction, setShowExtraAction] = useState(false)

  const fullSizeActions = (
    <>
      <Button className="shrink-0" variant="outline">
        <Search />
        Search documents
      </Button>
      {showExtraAction ? (
        <Button className="shrink-0" variant="outline">
          <FileText />
          Export brief
        </Button>
      ) : null}
      <Button className="shrink-0" variant="outline">
        <Send />
        Share update
      </Button>
      <Button className="shrink-0">
        <Sparkles />
        Launch flow
      </Button>
    </>
  )

  const compactActions = (
    <>
      <IconButton icon={<Search />} label="Search" />
      {showExtraAction ? (
        <IconButton icon={<FileText />} label="Export brief" />
      ) : null}
      <IconButton icon={<Send />} label="Share update" />
      <IconButton icon={<Sparkles />} label="Launch flow" />
    </>
  )

  return (
    <OverflowGuard>
      {(isOverflowing, overflowAxis) => (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col gap-2">
              <div className="text-sm font-semibold">Project actions</div>
              <div className="text-xs text-muted-foreground">
                Toggling extra content can trigger the same overflow response as
                resizing.
              </div>
              <div>
                <Button
                  size="sm"
                  onClick={() => setShowExtraAction((current) => !current)}
                >
                  {showExtraAction ? 'Hide extra button' : 'Show extra button'}
                </Button>
              </div>
            </div>
            <StatusPill
              isOverflowing={isOverflowing}
              overflowAxis={overflowAxis}
            />
          </div>
          <div
            className={cn(
              'flex min-w-max gap-2 rounded-[1.4rem] border bg-card p-2 shadow-sm',
              isOverflowing && 'flex-wrap',
            )}
          >
            <div className="flex items-center gap-3 rounded-[1rem] bg-muted/70 px-3 py-3">
              <div className="rounded-full bg-primary/12 p-2 text-primary">
                <FolderKanban className="size-4" />
              </div>
              <div className="text-sm font-semibold whitespace-nowrap">
                Sprint planning
              </div>
            </div>
            <div
              className={cn(
                'flex flex-1 items-center gap-2',
                isOverflowing ? 'justify-end' : 'justify-center',
              )}
            >
              {isOverflowing ? compactActions : fullSizeActions}
            </div>
          </div>
        </div>
      )}
    </OverflowGuard>
  )
}
