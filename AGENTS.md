# Acceptance Test Driven Development Example

Example repository for doing Acceptance Test Driven Development via playwright on a React app.

> **Subdirectory instruction files:** Additional AGENTS.md files in `webapp/` and `acceptance-tests/` extend these rules for their respective workspaces. Always read the nearest AGENTS.md before editing files in those directories.

## Never

- Use `npm` or `npx` — always use `pnpm`
- Use `null` — use `undefined` except when required by an external API
- Use `let` — use `const`, extracting logic into helper functions that return values
- Use ternary operators — use early-return `if` for conditional values; `&&` / `!x &&` for conditional JSX
- Use enums — use string union types: `type Foo = "a" | "b" | "c"`
- Use inline types in function signatures — import named interfaces instead
- Use barrel files (`index.ts`) anywhere
- Re-export symbols from one module via another — always import directly from the source file
- Use single-character variables or acronyms — use descriptive names

## Commands

- **Package manager:** Always use `pnpm` — never `npm` or `npx`
- **Build:** `pnpm build` — always run after a complete set of code changes to validate TypeScript compilation, lint, and tests all pass
- **Type check:** `pnpm run typescript:checks`
- **Unit tests:** `pnpm test` (Vitest)
- **Acceptance tests:** `cd acceptance-tests && pnpm test:ui` (run from the `acceptance-tests/` directory, never `npx playwright`)
- **Single acceptance test:** `cd acceptance-tests && pnpm test:ui -- src/tests/path/to/File.ui.ts`
- **Formatting/lint fix:** `pnpm lint --fix` — always run before `pnpm build` to auto-fix formatting and lint issues
- **Build must pass clean:** `pnpm build` must complete with zero errors — fix any TypeScript, lint, or test failures before considering work done

## File Conventions

- PascalCase for all source file names (components, hooks, utilities, types, constants, and tests)
- Folder names use kebab-case (e.g. `use-ai-move/`, `game-board/`)
- No barrel files (`index.ts`) anywhere
- Always use absolute imports with `@/` prefix, even within the same directory
- Co-locate files with the component/feature that uses them — only promote to shared folders when used by more than one consumer

## Tiered Nesting Rule

If a file is used by only one other file, place it in a subfolder inside that consumer's folder — not as a sibling alongside it. This applies recursively at every level.

When a file is used by more than one consumer, place it in a `shared/` subfolder at the lowest common ancestor of those consumers.

**The violation to avoid:** file X and its single consumer Y are siblings in the same directory. Fix by giving Y its own named folder and nesting X inside it.

A file only gets its own named subfolder when it has child files. A standalone file with no dependents lives directly inside the parent folder.

## Code Style

- Define functions in top-down "newspaper" order: exported/public functions first, then private helpers below — readers should see the high-level logic before implementation details. Never place helper functions above the exported function that calls them.
- Keep functions under 10 lines when possible
- Use early returns with a blank line after to separate from main flow
- Merge consecutive guard clauses that return the same value into a single `if` with `||`
- Prefer never-nesting — use guard clauses instead of `else` statements
- Use `??` over `||` for default values
- Prefer `undefined` over `null` — never use `null` unless required by an external API (e.g. `JSON.stringify` replacer, DOM `getAttribute`)
- Prefer interfaces over types; never use inline types in function signatures — import and reference existing named interfaces instead of redeclaring their shape inline
- Prefer string union types over enums — use `type Foo = "a" | "b" | "c"` instead of `enum Foo { A = "a", B = "b", C = "c" }`
- Prefer function declarations over arrow functions for named functions
- Replace hard-coded values with named constants
- No single-character variables or generic type params — use descriptive names
- No Hungarian notation prefixes on types (e.g., `PlaywrightType` not `TPlaywright`)
- No acronyms — expand them (e.g., `milliseconds` not `ms`)
- Avoid `let` — prefer `const` by extracting logic into helper functions that return values. When a value depends on a try/catch or conditional assignment, move that logic into a function that returns the result
- Never use ternary operators — use early-return `if` statements for conditional values, and `&&` / `!expression &&` pairs for conditional JSX rendering
- No comments unless they provide valuable context — no JSDoc, no apology comments
- Keep TODO comments as useful markers
