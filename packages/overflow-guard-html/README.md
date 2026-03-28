# overflow-guard-html

Build around content, not breakpoints, with a framework-agnostic custom element.

`overflow-guard-html` measures whether your rendered content still fits its available space and applies reversible fallback mutations to the visible content when it does not.

It keeps a hidden measurement copy of the original content, watches that copy for overflow, and only mutates the visible primary tree.

## Installation

```sh
bun add overflow-guard-html
npm install overflow-guard-html
pnpm add overflow-guard-html
yarn add overflow-guard-html
```

## Quick start

Use `fallbackClass` when you want the same content tree to adapt in place.

```html
<script type="module">
  import 'overflow-guard-html'
</script>

<style>
  .toolbar .icon-action {
    display: none;
  }

  .toolbar.toolbar--compact .full-action {
    display: none;
  }

  .toolbar.toolbar--compact .icon-action {
    display: inline-flex;
  }
</style>

<overflow-guard check-only="horizontal" fallbackClass="toolbar--compact">
  <nav class="toolbar">
    <span>Sprint planning</span>
    <div>
      <button class="full-action">Search documents</button>
      <button class="icon-action" aria-label="Search">S</button>
      <button class="full-action">Share update</button>
      <button class="icon-action" aria-label="Share">U</button>
      <button class="full-action">Launch flow</button>
      <button class="icon-action" aria-label="Launch">+</button>
    </div>
  </nav>
</overflow-guard>
```

When fallback mode becomes active, the class from `fallbackClass` is added to the primary child element, not the `<overflow-guard>` host.

## How it works

- The default child is the primary content tree.
- The element clones that tree into a hidden measurement copy.
- Overflow detection always happens against that hidden copy.
- When overflow activates, `fallbackClass` is added to the visible primary child.
- Those fallback mutations are recorded and reversed automatically when the content fits again.

## Attributes

| Attribute | Values | Default | Description |
| --- | --- | --- | --- |
| `check-only` | `horizontal \| vertical` | - | Optional axis filter. When omitted, the element checks both axes and any overflow can activate fallback rendering. |
| `fallbackClass` | string | - | Class name(s) added to the primary child element while fallback mode is active. |

HTML attribute names are case-insensitive, so `fallbackClass`, `fallbackclass`, and `fallback-class` are all accepted.

## Reflected state

The element reflects runtime state on itself:

- `overflowing`: present when overflow is active on any axis
- `overflow-axis`: `none | horizontal | vertical | both`
- `data-overflow-axis`: same value as `overflow-axis`

## Events

### `overflowchange`

Fires whenever the measured state changes.

```js
const guard = document.querySelector('overflow-guard')

guard?.addEventListener('overflowchange', (event) => {
  console.log(event.detail.isOverflowing)
  console.log(event.detail.overflowAxis)
})
```

`event.detail` includes `isOverflowing` and `overflowAxis`.

## Methods

### `refresh()`

Forces the element to rebuild its measurement copy and re-check overflow. This is useful if you mutate the source markup programmatically.

```js
guard?.refresh()
```

## Notes

- Importing `overflow-guard-html` registers `<overflow-guard>` automatically.
- The element uses `ResizeObserver`, so it should run in the browser.
- Named fallback slots are not supported. Use `fallbackClass` instead.

Repository: <https://github.com/arturmarc/overflow-guard>
