# DSL and Playwright Layer

Follow all conventions in the root `AGENTS.md` and `acceptance-tests/AGENTS.md` plus the DSL-specific conventions below.

## Never

- Use Playwright `Page` directly in a DSL class — only pass it to Playwright or DSL constructors
- Pass a `Locator` into or out of a DSL — DSL constructors accept only `Page` and/or plain string identifiers (e.g. `testId`); locator creation belongs in the Playwright layer
- Use abstract methods or subclass overrides for error messages — use generic inline strings; the stack trace is sufficient
- Place a `*Playwright.ts` file in a parent directory's `playwright/` folder — it must live in a `playwright/` subfolder at the same level as the DSL file it serves
- Name the private Playwright field anything other than `playwright` (not `{name}Playwright`)

## Directory Structure

```
dsl/webapp/
  TicTacToeDsl.ts              ← root DSL, owns page DSLs as properties
  playwright/
    TicTacToePlaywright.ts
  pages/
    shared/                    ← abstract base classes shared by all pages
      PageDsl.ts
      playwright/
        PagePlaywright.ts
    components/                ← components shared across more than one page
      {component}/
        {Component}Dsl.ts
        playwright/
          {Component}Playwright.ts
    {page}/
      {Page}PageDsl.ts         ← owns component DSLs as properties
      playwright/
        {Page}PagePlaywright.ts
      components/
        {component}/
          {Component}Dsl.ts
          playwright/
            {Component}Playwright.ts
        shared/                ← abstract base classes shared by multiple sibling components
          {Base}Dsl.ts
          playwright/
            {Base}Playwright.ts
```

**`shared/` folders:** Use a `shared/` subfolder when an abstract base class (or any file) is consumed by more than one sibling in the same `components/` directory. A single-consumer file lives directly inside that consumer's own folder per the Tiered Nesting Rule in the root `AGENTS.md`.

## `*Dsl.ts` — DSL Layer

Business-level operations. Wraps the Playwright layer with try-catch and `DslError`.

- Naming: `{Name}Dsl`
- Expose sub-components as `public readonly` properties
- Wrap all Playwright calls in try-catch throwing `DslError` with a generic inline message
- Abstract base DSL classes construct their own Playwright instance internally; subclasses pass only a `testId` string (not a `new XxxPlaywright(...)` instance)

### Constructor Spacing

- Blank line after `super()`
- Blank line between the Playwright instantiation and the DSL fields
- DSL fields stay grouped with no blank lines between them
- When there is no `super()`, blank line between the Playwright instantiation and the DSL fields only

```typescript
export class GamePageDsl {
  private readonly playwright: GamePagePlaywright;

  readonly board: GameBoardDsl;
  readonly scoreboard: ScoreboardDsl;

  constructor(page: Page) {
    this.playwright = new GamePagePlaywright(page);

    this.board = new GameBoardDsl(page);
    this.scoreboard = new ScoreboardDsl(page);
  }

  async exit(): Promise<void> {
    try {
      await this.playwright.clickExit();
    } catch (error) {
      throw new DslError("Failed to click exit button", error);
    }
  }
}
```

## `*Playwright.ts` — Playwright Layer

DOM-level interactions using Playwright locators.

- All locators declared as `private readonly` in the constructor
- Uses `getByTestId` with the hierarchical test ID pattern: `{pageId}__{component}__{element}`
- Returns raw values (booleans, strings, numbers) — no domain objects, no business logic
- Rely on Playwright's built-in waiting mechanisms

```typescript
export class GameBoardPlaywright {
  private readonly container: Locator;
  private readonly currentPlayerIndicator: Locator;

  constructor(page: Page) {
    this.container = page.getByTestId("gamePage__gameBoard");
    this.currentPlayerIndicator = page.getByTestId("gamePage__gameBoard__currentPlayer");
  }

  private cellLocator(index: number): Locator {
    return this.container.getByTestId(`gamePage__gameBoard__cell-${index}`);
  }

  async getCellMark(index: number): Promise<string> {
    return (await this.cellLocator(index).textContent()) ?? "";
  }
}
```
