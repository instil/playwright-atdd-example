# Playwright ATDD Example

An example repository demonstrating **Acceptance Test Driven Development (ATDD)** with [Playwright](https://playwright.dev/) on a React app.

## What This Project Demonstrates

This project shows how to practice ATDD using a structured DSL (Domain-Specific Language) layer that sits between Playwright and your test assertions:

- **Given/When/Then test structure** — tests read like specifications using aliased Playwright `test.describe` and `test` wrappers
- **Two-layer DSL architecture** — a business-logic DSL layer (`*Dsl.ts`) wraps a DOM-interaction Playwright layer (`*Playwright.ts`), keeping tests free of selectors and implementation details
- **Test-first workflow** — write tests with `then.skip` before implementing the UI or DSL; graduate to `then` as each layer is built out
- **Agent skill** — a `.agents/skills/acceptance-test-builder/` skill that can generate new acceptance test files following all project conventions

## Project Structure

```
├── webapp/                   # React application (Vite)
├── acceptance-tests/         # Playwright acceptance tests
│   └── src/
│       ├── tests/            # .ui.ts test files (Given/When/Then)
│       ├── dsl/
│       │   ├── webapp/       # Business-level DSL classes
│       │   └── errors/       # DslError, UnimplementedMethodError
│       ├── playwright-alias/ # given, when, then, setup, expect exports
│       └── utils/            # waitFor() polling utility
├── shared/                   # Shared code across packages
└── .agents/                  # Agent skills for this project
```

## Setup

1. Install VSCode extensions: Prettier, Vitest, ESLint, Playwright, GitHub Actions, Tailwind
2. Install [nvm](https://github.com/nvm-sh/nvm) and [configure it to auto-load `.nvmrc`](https://stackoverflow.com/a/48322289)
3. Install the Node version: `nvm install`
4. Install pnpm: `npm install --global corepack@latest && corepack use pnpm@latest-10 && corepack enable pnpm`
5. Install dependencies: `pnpm install`
6. Configure git: `git config --global core.autocrlf false && git config --global core.longpaths true`
7. Set up Playwright: `cd acceptance-tests && pnpm run setup`

## Running the App

```bash
cd webapp && npm run start:dev
```

## Commands

| Command | Description |
|---|---|
| `pnpm build` | Build all packages (TypeScript + lint + tests) |
| `pnpm test` | Run unit tests (Vitest) |
| `cd acceptance-tests && pnpm test:ui` | Run all acceptance tests |
| `cd acceptance-tests && pnpm test:ui -- src/tests/path/to/File.ui.ts` | Run a single acceptance test file |
| `pnpm lint --fix` | Fix formatting and lint issues |
| `pnpm run typescript:checks` | Type-check all packages |
