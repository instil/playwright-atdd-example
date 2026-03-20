# Acceptance Test Builder

Follow all conventions in the root `AGENTS.md` plus the acceptance-test-specific conventions below.

## Project Structure

```
acceptance-tests/src/
├── tests/                          # Test files — must use .ui.ts suffix
├── dsl/
│   ├── webapp/                     # Webapp DSL
│   │   ├── MySiteDsl.ts            # Main DSL class (exported as MySite)
│   │   └── components/             # Component-level DSL and types
│   │       └── [name]/
│   │           └── types/          # TypeScript interfaces for DSL return shapes
│   └── errors/                     # DslError, UnimplementedMethodError
├── playwright-alias/
│   └── PlaywrightAlias.ts          # Exports: given, when, then, setup, expect
└── utils/
    └── WaitFor.ts                  # waitFor<T>() polling utility
```

## DSL Two-Layer Architecture

### Layer 1: DSL Classes (`*Dsl.ts`)

Business-level operations. Wraps the Playwright layer with try-catch and `DslError`.

- Naming: `{Name}Dsl` (e.g., `MySitePageDsl`)
- Exposes sub-components as `public readonly` properties
- Does not use Playwright `Page` directly — only passes it to Playwright or DSL constructors

```typescript
export class MySitePageDsl {
  private readonly mySitePlaywright: MySitePagePlaywright;
  public readonly header: HeaderDsl;

  constructor(page: Page) {
    this.mySitePlaywright = new MySitePagePlaywright(page);
    this.header = new HeaderDsl(page);
  }

  async goTo(): Promise<void> {
    try {
      await this.mySitePlaywright.goTo();
    } catch (error) {
      throw new DslError("Failed to navigate to page", error);
    }
  }
}
```

### Layer 2: Playwright Classes (`*Playwright.ts`)

DOM-level interactions using Playwright locators.

- All locators declared as `private readonly` in the constructor
- Uses `getByTestId` with pattern: `{componentTestId}__{elementName}`
- Returns raw values (booleans, strings, numbers) — no domain objects, no business logic
- Rely on Playwright's built-in waiting mechanisms

```typescript
export class MySitePagePlaywright {
  private readonly container: Locator;
  private readonly heading: Locator;

  constructor(private readonly page: Page) {
    this.container = page.getByTestId("mySitePage");
    this.heading = this.container.getByTestId("mySitePage__heading");
  }
}
```

### DSL Directory Structure

```
dsl/
  errors/
    DslError.ts
    UnimplementedMethodError.ts
  webapp/
    {Feature}Dsl.ts
    components/{component}/
      {Component}Dsl.ts
      playwright/{Component}Playwright.ts
    pages/{page}/
      {Page}PageDsl.ts
      components/
      playwright/{Page}PagePlaywright.ts
```

### ATDD Pattern

Write tests before implementation, using `unimplementedMethodError` as the method body. Use `then.skip` until the UI, Playwright layer, and DSL layer are all implemented.

## Acceptance Test Conventions

- Test files use `.ui.ts` suffix and live under `src/tests/`
- Use PascalCase for filenames; no barrel files
- Always use absolute imports with `@/` prefix
- The fixture name is `mySite` — this is the DSL entry point in tests
- Never use `page` directly in tests — it is intentionally undefined in fixtures; all interactions go through the DSL
- Import `given`, `when`, `then`, `setup`, `expect` from `@/playwright-alias/PlaywrightAlias`
- Import `waitFor` from `@/utils/WaitFor` for polling async DSL results
- No focused tests (`.only`) in committed code
- Always wrap all tests in a top-level `given` block for file-level `.skip` support

### Given-When-Then Structure

- `given` — initial context (wraps `test.describe`)
- `when` — action or event (wraps `test.describe`)
- `then` — expected outcome (wraps `test`)
- `setup` — async setup within `given`/`when` (wraps `test.beforeEach`)
- `given`/`when` are never async; `setup` and `then` are always async
- Use destructured fixture when needed; omit the parameter entirely when unused
- Supports `.only` and `.skip` modifiers

### Variable Scoping

Declare shared variables at the outermost `given`. Assign once in the top-level `setup` — available to all nested tests. Do not reassign in nested `setup` blocks.

### Consolidate Shared Setup

Use a single `given` with nested `given`/`when` blocks when multiple scenarios share the same precondition — never duplicate `given` blocks with identical text.

### Test File Organization

```
tests/
  {feature-plural}/
    {Feature}s.*.ui.ts                   # List/overview page tests
    pages/{feature-singular}/
      {Feature}.*.ui.ts                  # Individual item page tests
      {subfeature}/
```
