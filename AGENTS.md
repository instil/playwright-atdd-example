# Acceptance Test Driven Development Example

Example repository for doing Acceptance Test Driven Development via playwright on a React app

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

- PascalCase for all file names
- No barrel files (`index.ts`) anywhere
- Always use absolute imports with `@/` prefix, even within the same directory
- Co-locate files with the component/page that uses them — only promote to shared folders when truly reusable

## Code Style

- Define functions in top-down "newspaper" order: exported/public functions first, then private helpers below — readers should see the high-level logic before implementation details. Never place helper functions above the exported function that calls them.
- Keep functions under 10 lines when possible
- Use early returns with a blank line after to separate from main flow
- Merge consecutive guard clauses that return the same value into a single `if` with `||`
- Prefer never-nesting — use guard clauses instead of `else` statements
- Use `??` over `||` for default values
- Prefer interfaces over types; never use inline types in function signatures — import and reference existing named interfaces instead of redeclaring their shape inline
- Props interfaces: use `Props` when internal/non-exported; use `{ComponentName}Props` when exported
- Prefer function declarations over arrow functions for named functions
- Replace hard-coded values with named constants
- No single-character variables or generic type params — use descriptive names
- No Hungarian notation prefixes on types (e.g., `PlaywrightType` not `TPlaywright`)
- No acronyms — expand them (e.g., `milliseconds` not `ms`)
- Avoid `let` — prefer `const` by extracting logic into helper functions that return values. When a value depends on a try/catch or conditional assignment, move that logic into a function that returns the result
- Never use ternary operators — use early-return `if` statements for conditional values, and `&&` / `!expression &&` pairs for conditional JSX rendering
- No comments unless they provide valuable context — no JSDoc, no apology comments
- Keep TODO comments as useful markers

## Architecture Boundaries

- **State layer** (`src/state/**`) cannot import from view layer (`@/view/**`)
- **Shared layer** (`src/shared/**`) cannot import from view layer
- **Components** (`src/view/components/**`) cannot import from pages (`@/view/pages/**`)
