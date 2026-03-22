# Acceptance Test Files (`*.ui.ts`)

Follow all conventions in the root `AGENTS.md` and `acceptance-tests/AGENTS.md` plus the test-specific conventions below.

## Never

- Use `describe` wrappers — keep `it` tests flat at the top level. The only acceptable use is when a single file covers multiple exported functions, but prefer splitting files instead
- Have more than one top-level `given` block per file — use `given.skip` to skip all tests in a file
- Pass a factory function to `vi.mock("path")` — always use the bare two-argument form
- Use `await import()` for mocked modules — import normally then wrap with `vi.mocked()`

## File Conventions

- Files use `.ui.ts` suffix and live under `src/tests/`
- Use PascalCase for filenames; no barrel files
- Always use absolute imports with `@/` prefix
- The fixture name is `ticTacToe` — this is the DSL entry point (class `TicTacToe`, file `TicTacToeDsl.ts`)
- No focused tests (`.only`) in committed code

## Test File Organization

```
tests/
  TicTacToe.backbutton.ui.ts     ← generic cross-page tests (no subdirectory)
  home/
    Home.{feature}.ui.ts         ← one file per home page feature
  game/
    Game.{feature}.ui.ts         ← one file per game page feature
  settings/
    Settings.{feature}.ui.ts     ← one file per settings page feature
```

Test filename prefix matches the page/feature area (`Home`, `Game`, `Settings`). Generic tests that span multiple pages live at the top level.

## Imports

```typescript
import { given, when, then, setup, expect } from "@/playwright-alias/PlaywrightAlias";
import { waitFor } from "@/utils/WaitFor"; // for polling async DSL results
```

## Given-When-Then Structure

- `given` — initial context (wraps `test.describe`)
- `when` — action or event (wraps `test.describe`)
- `then` — expected outcome (wraps `test`)
- `setup` — async setup within `given`/`when` (wraps `test.beforeEach`)
- `given`/`when` are never async; `setup` and `then` are always async
- Use destructured fixture when needed; omit the parameter entirely when unused
- Supports `.only` and `.skip` modifiers
- Use "a Player" (not "a User") as the subject in `given` and `when` descriptions

## Top-Level `given` and JIRA Tickets

The JIRA ticket URL is placed as a comment on the line immediately before the top-level `given`:

```typescript
// https://instil.atlassian.net/browse/TIC-0
given("a Player wants to ...", () => {
  ...
});
```

When a file covers **multiple distinct scenario contexts** (each needing its own setup), the top-level `given` is a pure feature wrapper with no `setup` of its own. Each context becomes a `when` block:

```typescript
// https://instil.atlassian.net/browse/TIC-0
given("a Player wants to go back to a previous screen", () => {
  when("a Player is on the game screen", () => {
    setup(async ({ ticTacToe }) => { /* navigate to context */ });

    when("they click the back button", () => {
      setup(async ({ ticTacToe }) => { /* perform action */ });
      then("they are returned to the home screen", async ({ ticTacToe }) => { ... });
    });
  });
});
```

When all scenarios share a **single common context**, the top-level `given` holds the shared `setup` and nested `when` blocks cover each action:

```typescript
// https://instil.atlassian.net/browse/TIC-2
given("a Player is playing a Human vs Human game", () => {
  setup(async ({ ticTacToe }) => { /* shared context */ });

  when("Player X clicks a cell", () => {
    setup(async ({ ticTacToe }) => { /* action */ });
    then("the cell shows X", async ({ ticTacToe }) => { ... });
  });
});
```

## Variable Scoping

Declare shared variables at the outermost `given`. Assign once in the top-level `setup` — available to all nested tests. Do not reassign in nested `setup` blocks.

## Consolidate Shared Setup

Use a single `given` with nested `when` blocks when multiple scenarios share the same precondition — never duplicate `given` blocks with identical text. Nested contexts inside a `when` are also expressed as `when` (not `given`).

## Unit Test Conventions (`.test.ts`)

- AAA pattern: Arrange, Act, Assert — separated by blank lines, no section comments
- Begin tests with `it("should ...")`
- `Mock` suffix for `vi.mocked` functions, `Stub` suffix for data objects
- Inline simple stubs that aren't reused
- Mock entire modules with `vi.mock("path")` — never pass a factory function
- No blank lines between consecutive `vi.mock()` declarations — group them as a single block
- Extract mocked functions into top-level `const` variables with `vi.mocked()` and `Mock` suffix

### Mocking Pattern

```typescript
import { it, expect, vi, beforeEach } from "vitest";
import { getUser } from "@/api/GetUser";
import { processUser } from "@/utils/ProcessUser";

vi.mock("@/api/GetUser");

const getUserMock = vi.mocked(getUser);

beforeEach(() => {
  getUserMock.mockReturnValue({ name: "Default" });
});

it("should process user name", () => {
  getUserMock.mockReturnValue({ name: "Alice" });

  const result = processUser();

  expect(result).toBe("ALICE");
});
```
