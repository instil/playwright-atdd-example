# View Layer (`src/view/`)

Follow all conventions in the root `AGENTS.md` and `webapp/AGENTS.md` plus the view-specific conventions below.

## State Access

- Components read state directly from the store via `useGameStore` — do not pass store state down as props (prop tunneling). If a child component needs a value from the store, let it subscribe directly.
- The only props a component should receive are things that cannot come from the store: discriminator keys (e.g. `side: Side`) that determine *which* slice of store state to access, or truly local UI config.

## Never

- Define sub-components as file-local functions within a parent component file — every named component must live in its own file
- Create `.test.tsx` files for files under `src/view/pages/` — page components are fully covered by acceptance tests
- Use inline `style` prop — use Tailwind arbitrary values (e.g. `w-[200px]`, `bg-[#f0f0f0]`)
- Add child component IDs to `constants/{Page}PageTestIds.ts` — only the root test ID belongs there

## Project Structure

```
view/
├── router/
│   ├── AppRoutes.tsx           # Route definitions
│   └── components/             # Components used only by AppRoutes
├── components/                 # Shared UI components used by multiple pages
└── pages/                      # Page-level components
```

## Component Folder Pattern

A component only gets its own named subfolder when it has child files. A standalone component with no children lives as a single file directly inside the parent `components/` folder.

The tiered nesting rule applies recursively — if a component is only used by one other component, nest it inside that consumer's `components/` folder:

```
pages/game/components/
  NoModeSelectionContent.tsx              ← used by GamePage, standalone → flat file
  main-game-content/                      ← used by GamePage, has children → folder
    MainGameContent.tsx
    components/
      GameOver.tsx                        ← only used by MainGameContent, standalone → flat
      scoreboard/                         ← only used by MainGameContent, has children → folder
        Scoreboard.tsx
        components/
          DrawsColumn.tsx                 ← only used by Scoreboard, standalone → flat
          player-column/                  ← only used by Scoreboard, has children → folder
            PlayerColumn.tsx
            components/
              editable-name/
                EditableName.tsx
                components/
                  NameButton.tsx
                  NameInput.tsx
```

## Page Folder Pattern

```
src/view/pages/{feature}/
  {Feature}Page.tsx
  {Feature}Page.test.tsx
  components/
    StandaloneComponent.tsx     ← no children → flat file directly in components/
    complex-component/          ← has children → gets its own named subfolder
      ComplexComponent.tsx
      components/
        ChildComponent.tsx
      utils/SomeUtil.ts
  hooks/
  types/
  utils/
  pages/{subfeature}/
    {Subfeature}Page.tsx
```

## Hook Folder Pattern

Hooks follow the same recursive co-location principle. When a hook has its own utilities, types, or sub-hooks, wrap it in a kebab-case folder:

```
hooks/
  use-form/
    UseForm.ts
    hooks/
      use-submit/
        UseSubmit.ts
        utils/
          GetSubmitTooltip.ts
          GetSubmitTooltip.test.ts
    utils/
      ParseFormData.ts
```

Place utilities inside the hook folder that uses them — not in a shared `utils/` folder one level up.

## `*.tsx` — React Component Files

### Props Interfaces

```typescript
// Not exported — internal to the file
interface Props {
  title: string;
  isActive?: boolean;
}

// Exported — when parent components need the type
export interface {ComponentName}Props {
  title: string;
}
```

### JSX Spacing

Always place a blank line between sibling JSX elements, at every level of nesting:

```tsx
<div>
  <Title />

  <Section>
    <ItemA />

    <ItemB />
  </Section>

  <Footer />
</div>
```

### Component Template

Add `data-testid` to every meaningful element using the pattern `{componentTestId}__{elementName}`.

```typescript
import type { FC } from "react";

interface Props {
  // ...
}

export const ComponentName: FC<Props> = ({ name, role }) => {
  return (
    <div data-testid="componentName">
      <h2 data-testid="componentName__name">{name}</h2>
      <span data-testid="componentName__role">{role}</span>
    </div>
  );
};
```

### Page Test ID Constants

Each page has a `constants/{Page}PageTestIds.ts` file exporting only the root test ID. Child components compose hierarchical IDs using template literals following `{pageId}__{component}__{element}`. Define intermediate IDs as file-local constants so children can extend them without string duplication.

```typescript
// constants/HomePageTestIds.ts
export const HOME_PAGE_TEST_ID = "homePage";

// HomePage.tsx — uses constant directly
<div data-testid={HOME_PAGE_TEST_ID} />

// components/settings-link/SettingsLink.tsx — direct child of page
import { HOME_PAGE_TEST_ID } from "@/view/pages/home/constants/HomePageTestIds";
<a data-testid={`${HOME_PAGE_TEST_ID}__settingsLink`} />
// → "homePage__settingsLink"

// components/side-selector/SideSelector.tsx — defines a file-local intermediate constant
import { GAME_PAGE_TEST_ID } from "@/view/pages/game/constants/GamePageTestIds";
const SIDE_SELECTOR_TEST_ID = `${GAME_PAGE_TEST_ID}__sideSelector`;
<div data-testid={SIDE_SELECTOR_TEST_ID} />
// → "gamePage__sideSelector"
```

## Styling Conventions

- Use Tailwind CSS for all styling — layout, spacing, typography, and component styles
- Never use inline `style` prop — use Tailwind arbitrary values instead (e.g., `w-[200px]`, `bg-[#f0f0f0]`)
- Use `clsx` with `twMerge` from `tailwind-merge` for conditional and merged class names:

```tsx
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

className={twMerge(clsx(
  "base-class-1 base-class-2",
  { "conditional-class": someCondition, "w-full": isExpanded },
))}
```

- Prefer flex with gap over margin — use `flex` layouts with `gap` utilities
- Prefer flex over grid — only use CSS Grid for true two-dimensional layouts

## `*.test.tsx` / `*.test.ts` — Component Unit Test Files

- Test hooks (`hooks/`) and pure utility/shared functions (`utils/`, `src/shared/`) — do **not** test page components (covered by acceptance tests)
- AAA pattern: Arrange, Act, Assert — separated by blank lines, no section comments
- Begin with `it("should ...")`
- `Mock` suffix for `vi.mocked()` functions; `Stub` suffix for data objects

```typescript
import { render, screen } from "@testing-library/react";
import { ComponentName } from "@/view/pages/feature/components/component-name/ComponentName";

it("should render the title", () => {
  const titleStub = "Hello";

  render(<ComponentName title={titleStub} />);

  expect(screen.getByTestId("componentName__title")).toHaveTextContent(titleStub);
});
```
