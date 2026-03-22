# acceptance-tests

Playwright acceptance tests for the Tic Tac Toe application. This package is the primary learning focus of the repository — it demonstrates how to structure acceptance tests using a two-layer DSL pattern.

## What's in Here

```
acceptance-tests/
└── src/
    ├── tests/              # Test files (*.ui.ts) — Given/When/Then structure
    ├── dsl/                # DSL layer — business DSL and Playwright interaction classes
    ├── playwright-alias/   # given, when, then, setup, expect exports
    └── utils/              # Shared utilities (e.g. waitFor polling helper)
```

## The Two-Layer DSL Pattern

This is the core concept demonstrated in this project. Rather than writing Playwright calls directly in tests, interactions are split across two layers:

```
Test file  →  DSL layer (*Dsl.ts)  →  Playwright layer (*Playwright.ts)  →  Browser
```

### DSL Layer (`*Dsl.ts`)

Expresses interactions in business language. A test calls `ticTacToe.game.clickCell(0)` — it doesn't know or care how that maps to the DOM.

DSL methods wrap Playwright calls in a `try/catch` and throw a `DslError` on failure, giving tests clear error messages that describe what business operation failed rather than which selector timed out.

### Playwright Layer (`*Playwright.ts`)

Handles all direct Playwright interactions — locating elements by `data-testid`, clicking, reading text. Returns primitive values (strings, numbers, booleans) rather than Playwright locators, so the DSL layer is not coupled to Playwright types.

### Why Two Layers?

- Tests stay readable as specifications and don't need to change when the DOM changes
- When a selector breaks, you fix it in one Playwright class rather than across many test files
- The DSL layer can be swapped for a different implementation (e.g. API calls instead of UI) without touching tests

## Test Structure

Tests use Given/When/Then aliases that wrap Playwright's `test.describe` and `test`:

```typescript
import { given, when, then, setup, expect } from "@/playwright-alias/PlaywrightAlias";

given("a Player wants to start a game", () => {
  setup(async ({ ticTacToe }) => {
    await ticTacToe.home.navigateTo();
  });

  when("they select Human vs Human mode", () => {
    setup(async ({ ticTacToe }) => {
      await ticTacToe.home.clickHumanVsHuman();
    });

    then("the game board should be visible", async ({ ticTacToe }) => {
      expect(await ticTacToe.game.board.isVisible()).toBe(true);
    });
  });
});
```

| Alias | Maps to | Purpose |
|---|---|---|
| `given` | `test.describe` | Initial context |
| `when` | `test.describe` | Action or event |
| `then` | `test` | Expected outcome |
| `then.skip` | `test.skip` | Stubbed outcome not yet implemented |
| `setup` | `test.beforeEach` | Shared setup within a describe block |
| `expect` | Playwright's `expect` | Assertions |

The `ticTacToe` fixture is the root entry point into the DSL. All page interactions flow through it (e.g. `ticTacToe.home`, `ticTacToe.game`, `ticTacToe.settings`).

## ATDD Workflow

The intended workflow when building a new feature:

1. Write the `then` block first using `then.skip` — this is the acceptance criteria
2. Implement the DSL method stubs, throwing `UnimplementedMethodError`
3. Build the UI in `webapp/`
4. Implement the Playwright layer to target the new UI
5. Implement the DSL layer to call the Playwright layer
6. Promote `then.skip` to `then` — the test should now pass

## Commands

Run from the `acceptance-tests/` directory.

| Command | Description |
|---|---|
| `pnpm run setup` | Install Playwright browser binaries (run once after `pnpm install`) |
| `pnpm test:ui` | Run all acceptance tests |
| `pnpm test:ui -- src/tests/path/to/File.ui.ts` | Run a single test file |

## Environment Configuration

The test base URLs for each environment are configured in `.env` files:

| File | Environment |
|---|---|
| `.env` | Default / local development |
| `.env.uat` | UAT |
| `.env.production` | Production |
