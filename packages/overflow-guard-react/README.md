# overflow-guard-react

`overflow-guard-react` lets components react to their actual content size instead of viewport or container breakpoints.

Repository: <https://github.com/arturmarc/overflow-guard>

Wrap a piece of UI in `<OverflowGuard>`, and it tells you when the content stops fitting. You can then swap layouts, collapse actions, reveal a "Read more" affordance, or render a completely different fallback tree.

## Why use it

- React to content, not guessed pixel values
- Handle dynamic labels, localization, and user-generated content
- Reuse the same component in narrow sidebars, wide panels, and resizable layouts
- Support horizontal overflow, vertical overflow, or both

## Installation

```sh
bun add overflow-guard-react
```

Peer dependencies:

- `react`
- `react-dom`

## Quick start

```tsx
import { OverflowGuard } from 'overflow-guard-react'

export function AdaptiveToolbar() {
  return (
    <OverflowGuard>
      {(isOverflowing) => (
        <div className={isOverflowing ? 'flex flex-wrap gap-2' : 'flex gap-2'}>
          <button>Search</button>
          <button>Share update</button>
          <button>Launch flow</button>
        </div>
      )}
    </OverflowGuard>
  )
}
```

## How it works

`OverflowGuard` renders your content into a hidden measurement layer and compares its `scrollWidth` and `scrollHeight` against the available `clientWidth` and `clientHeight`.

At runtime it exposes:

- `isOverflowing`: `true` when content overflows on any axis
- `overflowAxis`: `'none' | 'horizontal' | 'vertical' | 'both'`

## Usage patterns

### 1. Fallback mode

Use fallback mode when the compact state should be a different tree entirely.

```tsx
import { OverflowGuard } from 'overflow-guard-react'
import { Menu } from 'lucide-react'

function Brand() {
  return <div className="font-semibold">OverflowGuard</div>
}

export function ResponsiveNav() {
  return (
    <OverflowGuard
      fallbackOn="horizontal"
      fallback={
        <nav className="flex items-center justify-between rounded-3xl border px-4 py-3">
          <Brand />
          <button aria-label="Open menu">
            <Menu />
          </button>
        </nav>
      }
    >
      <nav className="flex min-w-max items-center justify-between gap-3 rounded-3xl border px-4 py-3">
        <Brand />
        <div className="flex flex-nowrap gap-2">
          <a href="/docs">Docs</a>
          <a href="/recipes">Recipes</a>
          <a href="/playground">Playground</a>
          <a href="/pricing">Pricing</a>
        </div>
      </nav>
    </OverflowGuard>
  )
}
```

### 2. Render prop mode

Use the render prop when both states share most of the same structure and only behavior or presentation changes.

```tsx
import { OverflowGuard } from 'overflow-guard-react'

function ActionButtons() {
  return (
    <>
      <button>Search</button>
      <button>Export brief</button>
      <button>Share update</button>
      <button>Launch flow</button>
    </>
  )
}

function ActionIcons() {
  return (
    <>
      <button aria-label="Search">S</button>
      <button aria-label="Export brief">E</button>
      <button aria-label="Share update">U</button>
      <button aria-label="Launch flow">L</button>
    </>
  )
}

export function ProjectActions() {
  return (
    <OverflowGuard>
      {(isOverflowing, overflowAxis) => (
        <section className="flex flex-col gap-3">
          <div className="text-sm text-slate-500">overflow: {overflowAxis}</div>
          <div className={isOverflowing ? 'flex flex-wrap gap-2' : 'flex gap-2'}>
            <div className="min-w-max rounded-xl border px-3 py-2">
              Sprint planning
            </div>
            <div className="flex gap-2">
              {isOverflowing ? <ActionIcons /> : <ActionButtons />}
            </div>
          </div>
        </section>
      )}
    </OverflowGuard>
  )
}
```

### 3. Custom hook mode

Use `useOverflowGuard()` when nested children need access to the overflow state without threading props through every layer.

The hook only returns the boolean state. If you need axis details, keep using the render prop at the boundary.

```tsx
import {
  OverflowGuard,
  useOverflowGuard,
} from 'overflow-guard-react'

function ToolbarSummary() {
  const isOverflowing = useOverflowGuard()

  return (
    <span className="text-sm">
      {isOverflowing ? 'Compact mode' : 'Expanded mode'}
    </span>
  )
}

function ToolbarActions() {
  const isOverflowing = useOverflowGuard()

  return isOverflowing ? (
    <>
      <button aria-label="Overview">O</button>
      <button aria-label="Team">T</button>
      <button aria-label="Docs">D</button>
      <button aria-label="Support">S</button>
    </>
  ) : (
    <>
      <button>Overview</button>
      <button>Team updates</button>
      <button>Docs space</button>
      <button>Support</button>
    </>
  )
}

export function NestedExample() {
  return (
    <OverflowGuard className="w-full">
      {() => (
        <div className="flex flex-col gap-3">
          <ToolbarSummary />
          <div className="flex min-w-0 gap-2">
            <ToolbarActions />
          </div>
        </div>
      )}
    </OverflowGuard>
  )
}
```

### 4. Vertical overflow example

Overflow handling is not limited to width. You can react to height constraints too.

```tsx
import { OverflowGuard } from 'overflow-guard-react'

export function ReadMoreCard() {
  return (
    <OverflowGuard className="h-full" containerClassName="h-64">
      {(isOverflowing, overflowAxis) => {
        const showReadMore =
          overflowAxis === 'vertical' || overflowAxis === 'both'

        return (
          <article className="flex h-full flex-col rounded-3xl border p-5">
            <div className="mb-3">
              <h2 className="font-semibold">Release notes draft</h2>
            </div>
            <p className={showReadMore ? 'max-h-24 overflow-hidden' : undefined}>
              OverflowGuard can reveal a call to action when the content exceeds
              the available height instead of letting the card blow up the
              surrounding layout.
            </p>
            <div className="mt-4">
              {showReadMore ? <button>Read more</button> : null}
            </div>
          </article>
        )
      }}
    </OverflowGuard>
  )
}
```

## API

### `OverflowGuard`

`OverflowGuard` supports two mutually exclusive modes:

- fallback mode: pass regular `children` plus `fallback`
- render prop mode: pass a function as `children`

### Common props

These props are available in both modes.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` or `(isOverflowing, overflowAxis) => ReactNode` | - | Regular children in fallback mode, or a render function in render-prop mode. |
| `className` | `string` | - | Applied to the inner measured and visible content box. |
| `style` | `CSSProperties` | - | Applied to the inner measured and visible content box. |
| `containerClassName` | `string` | - | Applied to the outer wrapper that hosts the measurement and visible layers. |
| `containerStyle` | `CSSProperties` | - | Applied to the outer wrapper. The component also sets `display: grid` and `position: relative`. |
| `throttleTime` | `number` | `0` | Debounce-like delay, in milliseconds, before re-running overflow checks after resize observer updates. |
| `...divProps` | `HTMLAttributes<HTMLDivElement>` | - | Standard div props such as `id`, `role`, `data-*`, and `aria-*`. These are forwarded to the inner content box. |

### Fallback mode props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `fallback` | `ReactNode` | required | Rendered when overflow matches `fallbackOn`. |
| `fallbackOn` | `'horizontal' \| 'vertical' \| 'both'` | `'both'` | Controls which overflow axis activates the fallback. `'both'` means any overflow triggers it. |

Example:

```tsx
<OverflowGuard fallback={<CompactNav />} fallbackOn="horizontal">
  <FullNav />
</OverflowGuard>
```

### Render prop signature

```ts
(isOverflowing: boolean, overflowAxis: OverflowAxis) => ReactNode
```

Parameters:

| Parameter | Type | Description |
| --- | --- | --- |
| `isOverflowing` | `boolean` | `true` when content overflows on any axis. |
| `overflowAxis` | `'none' \| 'horizontal' \| 'vertical' \| 'both'` | The measured overflow direction. |

Example:

```tsx
<OverflowGuard>
  {(isOverflowing, overflowAxis) => (
    <div data-overflow-axis={overflowAxis}>
      {isOverflowing ? <CompactLayout /> : <FullLayout />}
    </div>
  )}
</OverflowGuard>
```

### `useOverflowGuard()`

```ts
const isOverflowing = useOverflowGuard()
```

Returns the nearest `OverflowGuard` boolean overflow state.

Use it inside descendants rendered by `OverflowGuard` when you want nested components to react to the current compact or expanded state.

## Exported types

```ts
import type {
  FallbackOn,
  OverflowAxis,
  OverflowGuardProps,
} from 'overflow-guard-react'
```

## Notes and gotchas

- `fallback` and render-prop `children` are mutually exclusive.
- `fallbackOn` can only be used together with `fallback`.
- The hook returns only `boolean`. It does not expose the overflow axis.
- `className` and `style` apply to the measured content box, so layout-affecting styles should usually live there.
- The outer container always uses `display: grid` and `position: relative` so the visible layer can stack on top of the hidden measurement layer.
- Overflow detection uses a small `+1` tolerance to avoid noisy flips from sub-pixel measurement differences.
- The component includes loop protection for layouts that oscillate endlessly between states. In that case it locks into an overflowing state and warns in the console.

## When to choose this over CSS queries

Use `overflow-guard-react` when the decision depends on whether the rendered content actually fits:

- action bars that collapse only when labels stop fitting
- navigation that turns into a menu based on content length
- translated UI where text length changes by locale
- cards that reveal "Read more" only when body copy exceeds available height

Use media or container queries when you already know the rule should be based on viewport or container size alone.
