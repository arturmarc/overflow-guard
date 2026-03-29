---
name: overflow-guard-html
description: Use when building or refactoring plain HTML, CSS, or custom-element based UI whose layout should adapt when rendered content stops fitting available space. Helps apply fallbackClass-driven compact states, listen for overflowchange, use check-only for axis-specific behavior, and refresh the measurement copy after programmatic DOM changes.
---

# OverflowGuard HTML

Use this skill when a non-React UI should respond to actual content overflow instead of viewport breakpoints or guessed container widths.

## Reach for it when

- a toolbar, nav, or action row should switch to a compact state only when content stops fitting
- labels, translations, optional actions, or data-driven items make the rendered markup overflow
- you want to keep one visible DOM tree and toggle a CSS class when overflow activates
- a fixed-height area should react to vertical overflow

Do not reach for it first when:
- plain CSS wrapping solves the problem cleanly
- the UI should change at a fixed product breakpoint regardless of content
- the consumer is already working in React and can use `overflow-guard-react`

## Public API

Importing `overflow-guard-html` registers the custom element automatically.

```html
<script type="module">
  import 'overflow-guard-html'
</script>
```

Wrap exactly one primary child element:

```html
<overflow-guard fallbackClass="toolbar--compact">
  <nav class="toolbar">
    ...
  </nav>
</overflow-guard>
```

## Primary behavior

- the default child is the visible primary tree
- the element clones that tree into a hidden measurement copy
- overflow detection happens against the hidden copy
- when overflow activates, `fallbackClass` is added to the visible primary child element
- those fallback mutations are reversed automatically when the content fits again

## Runtime state

The host element reflects state with:
- `overflowing`
- `overflow-axis`
- `data-overflow-axis`

Listen for `overflowchange` when script logic needs the state:

```js
guard.addEventListener('overflowchange', (event) => {
  console.log(event.detail.isOverflowing)
  console.log(event.detail.overflowAxis)
})
```

Call `refresh()` after programmatic DOM changes that should rebuild the measurement copy:

```js
guard.refresh()
```

## Preferred patterns

Prefer `fallbackClass` when:
- the same markup should adapt in place with CSS
- compact mode can be expressed with class-driven style changes
- you want the visible DOM tree to remain stable

Prefer `check-only="horizontal"` or `check-only="vertical"` when:
- only one axis should activate the compact state
- you are targeting width overflow separately from height overflow

## Constraints and gotchas

- the element expects exactly one primary child element
- named slots are not supported
- `fallbackClass` is applied to the primary child, not the `<overflow-guard>` host
- if you mutate source markup programmatically, call `refresh()`
- preserve accessible names when hiding text labels in a compact state

## Workflow

1. Identify where rendered content may outgrow its available space.
2. Decide whether a class-driven compact state is enough.
3. Wrap the visible element in `<overflow-guard>`.
4. Add fallback CSS keyed off `fallbackClass` or reflected overflow state.
5. Use `overflowchange` for behavior that needs JavaScript.
6. Use `check-only` when the fallback should react to a single axis.
7. Verify with narrow widths, long labels, translated strings, dynamic item counts, and fixed-height cases.
