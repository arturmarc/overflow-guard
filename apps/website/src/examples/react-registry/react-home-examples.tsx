import type { ReactNode } from 'react'

import type { HomeExampleDefinition } from './common/types'
import { AdaptiveToolbarExample } from './AdaptiveToolbarExample'
import { MenuFallbackExample } from './MenuFallbackExample'
import { ReadMoreExample } from './ReadMoreExample'

export { AdaptiveToolbarExample } from './AdaptiveToolbarExample'
export { MenuFallbackExample } from './MenuFallbackExample'
export { ReadMoreExample } from './ReadMoreExample'

export type ReactHomeExampleDefinition = HomeExampleDefinition & {
  render: ReactNode
}

export const reactHomeExamples: ReactHomeExampleDefinition[] = [
  {
    id: 'adaptive-toolbar',
    title: 'Toolbar adapts in place',
    description:
      'Buttons collapse to icons when they stop fitting. Toggle extra content to trigger the same response as resizing.',
    heightClass: 'min-h-[14rem]',
    render: <AdaptiveToolbarExample />,
  },
  {
    id: 'menu-fallback',
    title: 'Menu collapses to a hamburger',
    description:
      'Full navigation swaps to a menu button when links stop fitting. Fallback mode handles the switch.',
    heightClass: 'min-h-[5rem]',
    render: <MenuFallbackExample />,
  },
  {
    id: 'read-more',
    title: 'Read more appears on height overflow',
    description:
      'Vertical overflow reveals a call to action. Same component, different axis. Drag the corner to resize height.',
    heightClass: 'h-80',
    render: <ReadMoreExample />,
  },
]

export const reactHeroCode = String.raw`import { OverflowGuard } from "overflow-guard-react"

export function AdaptiveToolbar() {
  return (
    <OverflowGuard>
      {(isOverflowing) => (
        <div className={isOverflowing ? "flex flex-wrap gap-2" : "flex gap-2"}>
          <button>Search</button>
          <button>Share update</button>
          <button>Launch flow</button>
        </div>
      )}
    </OverflowGuard>
  )
}`
