<p align="center">
  <img src="./docs/assets/overflow-guard-logo.svg" alt="Overflow Guard logo" width="88" />
</p>

<h1 align="center">overflow-guard</h1>

<p align="center"><strong>Build around content, not breakpoints.</strong></p>

<p align="center">
  <a href="https://overflow-guard.vercel.app/"><strong>Visit the website</strong></a>
</p>

<p align="center">
  <img src="./docs/assets/overflow-guard-demo.gif" alt="Overflow Guard demo" />
</p>

`overflow-guard` includes two packages:

| React                                                                                   | HTML                                                                                 |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| [`overflow-guard-react`](./packages/overflow-guard-react/README.md)                     | [`overflow-guard-html`](./packages/overflow-guard-html/README.md)                    |
| React component and hook API for adaptive UI.                                           | Framework-agnostic custom element for adaptive UI.                                   |
| `bun add overflow-guard-react`                                                          | `bun add overflow-guard-html`                                                        |
| [React docs](#react-docs) · [Package README](./packages/overflow-guard-react/README.md) | [HTML docs](#html-docs) · [Package README](./packages/overflow-guard-html/README.md) |

## Why use it

- Build around content, not guessed pixel values
- Handle dynamic labels, localization, and data-driven content
- Reuse the same UI across narrow sidebars, wide panels, and resizable layouts
- Respond to horizontal overflow, vertical overflow, or both

## React docs

Full docs: [`packages/overflow-guard-react/README.md`](./packages/overflow-guard-react/README.md)

`overflow-guard-react` helps React UI adapt when content stops fitting, instead of relying on viewport breakpoints, container breakpoints, or magic numbers.

Wrap a piece of UI in `<OverflowGuard>`, and it tells you when content no longer fits the available space. You can then switch to a compact layout, collapse actions to icons, swap a full nav for a menu, or reveal a "Read more" affordance.

### Installation

```sh
bun add overflow-guard-react
npm install overflow-guard-react
pnpm add overflow-guard-react
yarn add overflow-guard-react
```

`overflow-guard-react` is a client-side package. It measures rendered DOM with `ResizeObserver`, so use it from client components in frameworks that distinguish server and client rendering.

### Quick start

```tsx
import { OverflowGuard } from "overflow-guard-react";

export function AdaptiveToolbar() {
  return (
    <OverflowGuard>
      {(isOverflowing) => (
        <div className={isOverflowing ? "toolbar toolbar--compact" : "toolbar"}>
          {isOverflowing ? (
            <>
              <button aria-label="Search">S</button>
              <button aria-label="Share update">U</button>
              <button aria-label="Launch flow">+</button>
            </>
          ) : (
            <>
              <button>Search</button>
              <button>Share update</button>
              <button>Launch flow</button>
            </>
          )}
        </div>
      )}
    </OverflowGuard>
  );
}
```

### Runtime state

- `isOverflowing`: `true` when content overflows on any axis
- `overflowAxis`: `'none' | 'horizontal' | 'vertical' | 'both'`

For fallback mode, render props, hooks, and more detailed examples, see [`packages/overflow-guard-react/README.md`](./packages/overflow-guard-react/README.md).

## HTML docs

Full docs: [`packages/overflow-guard-html/README.md`](./packages/overflow-guard-html/README.md)

`overflow-guard-html` is a framework-agnostic custom element that measures whether rendered content still fits its available space and applies reversible fallback mutations when it does not.

It keeps a hidden measurement copy of the original content, watches that copy for overflow, and only mutates the visible primary tree.

### Installation

```sh
bun add overflow-guard-html
npm install overflow-guard-html
pnpm add overflow-guard-html
yarn add overflow-guard-html
```

### Quick start

```html
<script type="module">
  import "overflow-guard-html";
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

### Runtime state

- `overflowing`: present when overflow is active on any axis
- `overflow-axis`: `none | horizontal | vertical | both`
- `data-overflow-axis`: same value as `overflow-axis`

For attributes, events, methods, and usage notes, see [`packages/overflow-guard-html/README.md`](./packages/overflow-guard-html/README.md).
