# AGENTS.md

Repository-level instructions for agentic development in this project.

## Project context

- This repository is an open source monorepo for the `overflow-guard-react` and `overflow-guard-html` libraries.
- It also contains the website/example app used to demonstrate the libraries.
- Package source code and package READMEs are the source of truth for library behavior and public API.

## Skills

- The `skills/` directory contains distributable agent skills for downstream users of this library.
- Do not treat files under `skills/` as repository instructions by default when working on this codebase.
- Only use or modify files under `skills/` when the user explicitly asks to work on the skill itself or agent-integration materials.

## Package manager

- This project uses `bun`.
- Use `bun` commands instead of `npm` commands.
- Prefer `bun install`, `bun run <script>`, `bun test`, and other equivalent `bun` workflows.
- Do not introduce `npm`-specific commands or guidance unless the user explicitly asks for them.

## Dev server

- Do not start the dev server automatically.
- If validating a change would require the dev server and it is not already running, ask the user to start it.
- Do not run `bun run dev` unless the user explicitly asks for it.

## Styling

- Do not introduce Tailwind `space-y-*` utilities for vertical layouts.
- Prefer `flex flex-col` with `gap-*` for vertical spacing unless a non-flex layout is explicitly required.

## TypeScript style

- Prefer `type` aliases over `interface`.
- Keep TypeScript type definitions consistent with the ESLint `@typescript-eslint/consistent-type-definitions` rule configured for `type`.
- Do not use explicit `any` in TypeScript. Prefer `unknown` and narrow the type at usage sites.
- Treat explicit function and getter return types as banned by default.
- Only add an explicit return type when it is genuinely necessary, such as for type predicates, `never`, overloads, or a public API boundary where inference is unclear or unstable.
- Strongly prefer not naming local TypeScript types when the shape can be expressed with inference, `typeof`, indexed access, `ReturnType`, `Parameters`, or another built-in utility type.
- Do not introduce named local type aliases for simple one-off unions or shapes unless the type is reused enough to earn a name.
- Do not extract trivial helper functions when they have a single call site. Inline the logic at the use site unless extraction materially improves readability or reuse.
