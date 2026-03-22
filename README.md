# Playwright ATDD Example

A learning repository that demonstrates **Acceptance Test Driven Development (ATDD)** using [Playwright](https://playwright.dev/) on a React application. The application itself is a Tic Tac Toe game — a deliberate choice to keep the domain familiar so attention stays on the testing patterns rather than the business logic.

## What You Will Learn

This project is structured to teach:

- **ATDD workflow** — writing tests before implementation, using `then.skip` to stub out behaviour and graduating to `then` as each layer is built
- **Given/When/Then test structure** — tests read as human-readable specifications using aliased Playwright wrappers
- **Two-layer DSL architecture** — a business-logic DSL layer (`*Dsl.ts`) wraps a DOM-interaction Playwright layer (`*Playwright.ts`), decoupling tests from selectors and implementation details
- **Architecture boundaries** — ESLint-enforced rules that prevent layers from importing outside their permitted scope
- **Monorepo layout** — three separate packages (`webapp`, `acceptance-tests`, `shared`) with a single install

## Example - Add the board to the game over screen

### We want to build the test first to validate it

```
Create an acceptance test to update the game over screen to show the board state as well. Do not do the implementation yet.

The top level given will be "a Player wants to see the game board when a round has finished".

I want you to test both x and o winning, and draw situation.
Put those in separate nested givens like `given("player X wins"` etc
```

### We want to build the thing

```
Now do the implementation
```

### We want determinstic proof it worked

```
Run the build and fix any issues, and then run the UI tests and fix any issues with the UI tests
```

## Project Structure

```
playwright-atdd-example/
├── webapp/             # React application (Vite + Zustand + Tailwind)
├── acceptance-tests/   # Playwright acceptance tests with DSL layer
├── shared/             # Shared types and utilities used by both packages
└── .agents/            # Agent skills for this project
```

See the README in each folder for more detail.

## Tech Stack

| Area             | Tools                                                                                                                                                                                   |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Application      | [React 19](https://react.dev/), [Vite](https://vite.dev/), [React Router](https://reactrouter.com/), [Zustand](https://zustand.docs.pmnd.rs/), [Tailwind CSS](https://tailwindcss.com/) |
| Unit tests       | [Vitest](https://vitest.dev/)                                                                                                                                                           |
| Acceptance tests | [Playwright](https://playwright.dev/)                                                                                                                                                   |
| Language         | [TypeScript](https://www.typescriptlang.org/)                                                                                                                                           |
| Package manager  | [pnpm](https://pnpm.io/) (workspaces)                                                                                                                                                   |

## Setup

### Prerequisites

Install the following tools before getting started. Each link points to the official installation guide for that tool.

| Tool    | Purpose            | Install guide                                                                                                                         |
| ------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| Node.js | JavaScript runtime | [nvm](https://github.com/nvm-sh/nvm) (recommended) — install nvm, then run `nvm install` in this repo to pick up the `.nvmrc` version |
| pnpm    | Package manager    | [pnpm installation](https://pnpm.io/installation)                                                                                     |
| Git     | Version control    | [Git downloads](https://git-scm.com/downloads)                                                                                        |

> **Windows users (WSL):** This project is intended for Linux-based environments. Use [WSL 2](https://learn.microsoft.com/en-us/windows/wsl/install) with a Linux distribution rather than native Windows tooling.

> **Git line endings:** On Windows/WSL, configure git to avoid line-ending conflicts:
>
> ```bash
> git config --global core.autocrlf false
> git config --global core.longpaths true
> ```

### Recommended VS Code Extensions

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) — code formatting
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) — linting
- [Vitest](https://marketplace.visualstudio.com/items?itemName=vitest.explorer) — unit test runner in the editor
- [Playwright](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) — acceptance test runner in the editor
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) — Tailwind class suggestions

### Installing Dependencies

```bash
pnpm install
cd acceptance-tests && pnpm run setup
```

`pnpm run setup` installs the Playwright browser binaries required to run acceptance tests.

## Running the App

```bash
cd webapp && npm run start:dev
```

The app runs at `http://localhost:5173` by default.

## Commands

Run from the **repository root** unless otherwise noted.

| Command                                                               | Description                                                                      |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `pnpm build`                                                          | Build all packages — runs TypeScript checks, lint, and tests across the monorepo |
| `pnpm test`                                                           | Run all unit tests (Vitest)                                                      |
| `pnpm run typescript:checks`                                          | Type-check all packages                                                          |
| `pnpm lint --fix`                                                     | Fix formatting and lint issues                                                   |
| `cd acceptance-tests && pnpm test:ui`                                 | Run all acceptance tests                                                         |
| `cd acceptance-tests && pnpm test:ui -- src/tests/path/to/File.ui.ts` | Run a single acceptance test file                                                |

## How Acceptance Tests Are Written

Tests follow a Given/When/Then structure using aliased Playwright functions:

```typescript
import {
  given,
  when,
  then,
  setup,
  expect,
} from "@/playwright-alias/PlaywrightAlias";

given("a Player is on the home page", () => {
  when("they navigate to the app", () => {
    then("the title should be visible", async ({ ticTacToe }) => {
      expect(await ticTacToe.home.getTitle()).toContain("Tic Tac Toe");
    });
  });
});
```

- `given` — the initial context (wraps `test.describe`)
- `when` — the action or event being tested (wraps `test.describe`)
- `then` — the expected outcome (wraps `test`)
- `setup` — shared setup steps within a `given`/`when` block (wraps `test.beforeEach`)
- `ticTacToe` — the root DSL fixture, the entry point into the DSL layer

The `acceptance-tests/` README explains the DSL architecture in more detail.

## Architecture Boundaries

ESLint rules enforce the following import constraints:

- `state/**` cannot import from `view/**`
- `shared/**` cannot import from `view/**`
- `view/components/**` cannot import from `view/pages/**`
- `acceptance-tests` and `webapp` cannot import from each other — shared code lives in `shared/`
