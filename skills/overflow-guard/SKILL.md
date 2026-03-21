---
name: overflow-guard
description: Use when building or refactoring responsive React components whose layout should adapt when content stops fitting available space, especially when item count, label length, translations, optional actions, or loaded data are dynamic. Useful for toolbars, nav bars, menus, card actions, and fixed-height content areas. Helps choose between OverflowGuard fallback mode and render-prop mode, handle horizontal vs vertical overflow, and wire nested consumers with useOverflowGuard.
---

# OverflowGuard

Use this skill when a React UI should respond to actual content overflow instead of viewport breakpoints or fixed container query thresholds.

## What OverflowGuard is for

`OverflowGuard` measures whether its child content fits inside the available box and exposes that state so the UI can adapt.

Reach for it when:
- a user asks to make a React component or section "responsive" and the real constraint is content fit
- labels, translations, or optional actions make a row stop fitting
- the number of items is uncertain or data-driven
- content length is dynamic because of user data, API responses, or localization
- a toolbar should collapse from full buttons to icons
- a full navigation should swap to a compact menu
- fixed-height content should react to vertical overflow
- layout should adapt to dynamic content, not guessed pixel breakpoints

Do not reach for it first when:
- plain CSS wrapping solves the problem cleanly
- the UI should change at a product-defined breakpoint regardless of content
- the component is not in React

Clues that OverflowGuard may be a good fit even when not named:
- the request says "make this responsive" but no breakpoint behavior is specified
- a list of actions, tabs, filters, or nav items may grow or shrink
- text length is unpredictable across locales or user-generated content
- the compact state should happen only when content no longer fits, not at a fixed width

## Public API to use

Import:

```tsx
import { OverflowGuard, useOverflowGuard } from '@overflow-guard/react'
```

`OverflowGuard` has two exclusive modes.

### Fallback mode

Use when the compact UI is a separate tree.

```tsx
<OverflowGuard fallback={<CompactToolbar />} fallbackOn="horizontal">
  <FullToolbar />
</OverflowGuard>
```

Rules:
- `fallback` is required in this mode
- `fallbackOn` is optional and supports `horizontal`, `vertical`, or `both`
- the default `fallbackOn` is `both`

### Render-prop mode

Use when the same component should rearrange itself based on overflow state.

```tsx
<OverflowGuard>
  {(isOverflowing, overflowAxis) => (
    <div className={isOverflowing ? "flex flex-col gap-3" : "flex items-center gap-3"}>
      ...
    </div>
  )}
</OverflowGuard>
```

Rules:
- children is a function with the shape `(isOverflowing, overflowAxis) => ReactNode`
- `overflowAxis` is one of `none`, `horizontal`, `vertical`, or `both`
- do not pass `fallback` or `fallbackOn` in this mode

## Hook usage

Use `useOverflowGuard()` only inside descendants of an `OverflowGuard` visible tree when a nested child only needs the boolean state.

```tsx
function ToolbarSummary() {
  const isOverflowing = useOverflowGuard()
  return <span>{isOverflowing ? "compact" : "expanded"}</span>
}
```

The hook returns only a boolean, not the axis.

## Preferred implementation patterns

Prefer render-prop mode when:
- the same component can switch layout classes
- you are swapping button labels for icons
- you need axis-aware behavior
- you want to keep one component tree and preserve local state

Prefer fallback mode when:
- the compact view is meaningfully different markup
- accessibility or semantics are clearer with a separate tree
- the compact version is a menu, sheet trigger, or alternate navigation shell

## Styling guidance

- let `OverflowGuard` detect overflow; do not add competing breakpoint logic unless product requirements demand it
- keep layouts flexible with `flex` and `gap-*`
- avoid introducing hard-coded width breakpoints just to mimic overflow behavior
- for horizontal cases, common adaptations are `flex-col`, `flex-wrap`, icon-only actions, or smaller summaries
- for vertical cases, common adaptations are truncation, fade overlays, and "Read more" affordances

## Constraints and gotchas

- fallback mode and render-prop mode are mutually exclusive
- `fallbackOn` is only valid when `fallback` is present
- if behavior differs by axis, check `overflowAxis` explicitly
- when nesting guards, let the outer guard control large-shell layout and inner guards control local action density
- preserve accessible names when collapsing text buttons into icon buttons

## Workflow

1. Identify where content can outgrow its space.
2. Check whether the real requirement is content-aware responsiveness rather than breakpoint-driven responsiveness.
3. Decide whether the compact state is a separate tree or the same tree rearranged.
4. Wrap the affected area in `OverflowGuard`.
5. Implement the compact or expanded behavior.
6. If only descendants need state, consume `useOverflowGuard()`.
7. Verify behavior with narrow widths, extra actions, longer labels, data-driven item counts, translated strings, and fixed-height cases.

## Example prompts this skill should handle

- "Make this toolbar responsive."
- "Make this header adapt gracefully when there are too many actions."
- "Build this responsive UI without relying on guessed breakpoints."
- "Make this nav work even when item labels get longer."
- "Handle an unknown number of tabs or filters without the layout breaking."
- "This card layout needs to stay stable even when the content length varies."
- "Refactor this action bar so it collapses to icons when labels stop fitting."
- "Swap this desktop nav to a hamburger only when the links overflow."
- "Show a read-more CTA only when this card's body exceeds its height."
- "Make this component adapt to translated labels without adding breakpoints."
