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

## CDN and raw HTML

`overflow-guard-html` supports two browser-first paths:

- Use the npm package when your app already has a bundler or build step.
- Use a CDN script when you want to drop the element into plain HTML, a CMS embed, a prototype, or another no-build page.

### Browser bundle

The simplest no-build path is the browser bundle. It auto-registers `<overflow-guard>` and is suitable for plain `<script>` usage.

```html
<script src="https://cdn.jsdelivr.net/npm/overflow-guard-html@0"></script>
```

UNPKG can serve the same bundle:

```html
<script src="https://unpkg.com/overflow-guard-html@0"></script>
```

### ES module from a CDN

If you prefer module scripts in the browser, load the ESM build directly:

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/overflow-guard-html@0/dist/index.js"
></script>
```

For production sites, prefer pinning an exact version instead of a moving major tag.

## AI agents

The recommended path for AI-assisted usage is TanStack Intent. This package ships its own skill so agent guidance can stay aligned with the installed package version.

After installing the package, run:

```sh
npx @tanstack/intent@latest list
```

Standalone skill installer ecosystems can still be supported separately, but TanStack Intent is the canonical path for this package.

## Quick start

Use `fallbackClass` when you want the same content tree to adapt in place.

```html
<script src="https://cdn.jsdelivr.net/npm/overflow-guard-html@0"></script>

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

<overflow-guard fallbackClass="toolbar--compact">
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
- The browser bundle from jsDelivr or UNPKG also registers `<overflow-guard>` automatically.
- The element uses `ResizeObserver`, so it should run in the browser.
- Named fallback slots are not supported. Use `fallbackClass` instead.
- `check-only` is an optional extra attribute for limiting checks to `horizontal` or `vertical` when you need axis-specific behavior.

Repository: <https://github.com/arturmarc/overflow-guard>
