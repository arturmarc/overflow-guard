---
name: overflow-guard-react
description: Use when building or refactoring responsive React components whose layout should adapt when content stops fitting available space, especially when item count, label length, translations, optional actions, or loaded data are dynamic. Helps choose between OverflowGuard fallback mode and render-prop mode, handle horizontal vs vertical overflow, and wire nested consumers with useOverflowGuard.
requires:
  - react
---

# OverflowGuard React

Use this skill when a React UI should respond to actual content overflow instead of viewport breakpoints or fixed container query thresholds.

## Reach for it when

- a user asks to make a React component "responsive" and the real constraint is content fit
- labels, translations, optional actions, or data-driven counts make a row stop fitting
- a toolbar should collapse from full buttons to icons
- a full navigation should swap to a compact menu only when links overflow
- fixed-height content should react to vertical overflow

Do not reach for it first when:
- plain CSS wrapping solves the problem cleanly
- the UI should change at a product-defined breakpoint regardless of content
- the component is not in React

## Public API

Import from `overflow-guard-react`:

```tsx
import { OverflowGuard, useOverflowGuard } from 'overflow-guard-react'
```

`OverflowGuard` has two exclusive modes.

### Fallback mode

Use this when the compact state is a separate tree.

```tsx
<OverflowGuard fallback={<CompactToolbar />} fallbackOn="horizontal">
  <FullToolbar />
</OverflowGuard>
```

Rules:
- `fallback` is required in this mode
- `fallbackOn` supports `horizontal`, `vertical`, or `both`
- the default `fallbackOn` is `both`

### Render-prop mode

Use this when the same tree should rearrange itself based on overflow state.

```tsx
<OverflowGuard>
  {(isOverflowing, overflowAxis) => (
    <div className={isOverflowing ? 'flex flex-col gap-3' : 'flex items-center gap-3'}>
      ...
    </div>
  )}
</OverflowGuard>
```

Rules:
- children is a function with the shape `(isOverflowing, overflowAxis) => ReactNode`
- `overflowAxis` is one of `none`, `horizontal`, `vertical`, or `both`
- do not pass `fallback` or `fallbackOn` in this mode

### Hook usage

Use `useOverflowGuard()` only inside descendants of the visible `OverflowGuard` tree when a nested child only needs the boolean state.

```tsx
function ToolbarSummary() {
  const isOverflowing = useOverflowGuard()
  return <span>{isOverflowing ? 'compact' : 'expanded'}</span>
}
```

The hook returns only a boolean, not the axis.

## Preferred patterns

Prefer render-prop mode when:
- the same component can switch layout classes
- you are swapping text buttons for icons
- you need axis-aware behavior
- you want to keep one component tree and preserve local state

Prefer fallback mode when:
- the compact view is meaningfully different markup
- accessibility or semantics are clearer with a separate tree
- the compact version is a menu, sheet trigger, or alternate navigation shell

## Constraints and gotchas

- fallback mode and render-prop mode are mutually exclusive
- `fallbackOn` is only valid when `fallback` is present
- if behavior differs by axis, check `overflowAxis` explicitly
- preserve accessible names when collapsing text buttons into icon buttons
- this package measures rendered DOM with `ResizeObserver`, so treat it as client-side behavior

## Workflow

1. Identify where content can outgrow its space.
2. Check whether the real requirement is content-aware responsiveness rather than breakpoint-driven behavior.
3. Decide whether the compact state is a separate tree or the same tree rearranged.
4. Wrap the affected area in `OverflowGuard`.
5. Implement the compact or expanded behavior.
6. If only descendants need state, consume `useOverflowGuard()`.
7. Verify with narrow widths, long labels, translated strings, dynamic item counts, and fixed-height cases.
