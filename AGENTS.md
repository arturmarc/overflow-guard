# AGENTS.md

Repository-level instructions for agentic development in this project.

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
