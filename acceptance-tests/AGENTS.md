# Acceptance Test Builder

Follow all conventions in the root `AGENTS.md` plus the acceptance-test-specific conventions below.

> **Subdirectory instruction files:** Additional AGENTS.md files in `src/tests/` and `src/dsl/` extend these rules for their respective areas. Always read the nearest AGENTS.md before editing files in those directories.

## Never

- Use `page` directly in tests — all interactions go through the DSL
- Navigate to a URL in tests or DSL methods — always navigate by clicking as a real user would (sole exception: `TicTacToe.goTo()` loading the initial entry point)
- Call `ticTacToe.goTo()` in a `setup` block — the fixture calls it automatically before every test
- Add focused tests (`.only`) in committed code

## Project Structure

```
acceptance-tests/src/
├── tests/                          # Acceptance test files (see src/tests/AGENTS.md)
├── dsl/                            # DSL and Playwright layer (see src/dsl/AGENTS.md)
│   ├── errors/
│   │   ├── DslError.ts
│   │   └── UnimplementedMethodError.ts
│   └── webapp/
│       ├── TicTacToeDsl.ts         # Root DSL — fixture entry point (class: TicTacToe)
│       ├── playwright/
│       │   └── TicTacToePlaywright.ts
│       └── pages/
├── playwright-alias/
│   └── PlaywrightAlias.ts          # Exports: given, when, then, setup, expect
└── utils/
    └── WaitFor.ts                  # waitFor<T>() polling utility
```

## ATDD Pattern

Write tests before implementation, using `unimplementedMethodError` as the method body. Use `then.skip` until the UI, Playwright layer, and DSL layer are all implemented.
