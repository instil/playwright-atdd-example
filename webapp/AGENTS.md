# Webapp Developer

Follow all conventions in the root `AGENTS.md` plus the webapp-specific conventions below.

## Technology Stack

Vite 8, React 19, React Router 7 (`createBrowserRouter`/`RouterProvider`), Tailwind CSS 4, Vitest 4

## Project Structure

```
webapp/src/
├── App.tsx                         # Root component — routing + error boundary
├── main.tsx                        # Entry point
├── index.css                       # Global Tailwind styles
├── view/
│   ├── router/
│   │   └── AppRoutes.tsx           # Route definitions
│   ├── components/                 # Reusable UI components
│   └── pages/                      # Page-level components
├── state/                          # State management (cannot import from view)
└── shared/                         # Cross-layer utilities (cannot import from view)
    └── testing/
        └── SetupTests.ts           # Vitest + React Testing Library setup
```

## Architecture Boundaries

Enforced by ESLint — violations cause build failures:

- `state/**` — cannot import from `@/view/**`
- `shared/**` — cannot import from `@/view/**`
- `view/components/**` — cannot import from `@/view/pages/**`
- `view/pages/**` — can import from anywhere

Always use `@/` absolute imports, never relative paths.

## File Organization

### Co-location Principle

Nest files within the component or page that uses them. Co-locate test files beside their source (`.test.ts`/`.test.tsx` in the same directory). Only promote to a shared folder when used in more than one place.

### Component Folder Pattern

Simple component: `src/view/components/page-tab-bar/PageTabBar.tsx`

Complex component:

```
src/view/components/table/
  Table.tsx
  Table.test.tsx
  components/
    table-body/
      TableBody.tsx
      utils/FormatCellData.ts
  constants/TableDefaults.ts
  hooks/UsePagination.ts
  types/TableColumn.ts
  utils/SortTableData.ts
```

### Page Folder Pattern

```
src/view/pages/{feature}/
  {Feature}Page.tsx
  {Feature}Page.test.tsx
  components/{sub-component}/
  hooks/
  types/
  utils/
  pages/{subfeature}/
    {Subfeature}Page.tsx
```

This pattern is recursive — sub-components inside `components/` follow the same structure (their own `utils/`, `hooks/`, `types/`, etc.).

### Hook Folder Pattern

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

## Component Conventions

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

## Unit Test Conventions

- AAA pattern: Arrange, Act, Assert — separated by blank lines, no section comments
- No `describe` wrapper for single-export function files — keep `it` tests flat
- Begin tests with `it("should ...")`
- `Mock` suffix for `vi.mocked` functions, `Stub` suffix for data objects
- Inline simple stubs that aren't reused
- Mock entire modules with `vi.mock("path")` — never pass a factory function
- No blank lines between consecutive `vi.mock()` declarations — group them as a single block
- Extract mocked functions into top-level `const` variables with `vi.mocked()` and `Mock` suffix — reuse throughout
- Import mocked functions normally, then wrap with `vi.mocked()` — no dynamic `await import()`

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

### Component Test Template

```typescript
import { render, screen } from "@testing-library/react";
import { ComponentName } from "@/view/components/component-name/ComponentName";

it("should render the title", () => {
  const titleStub = "Hello";

  render(<ComponentName title={titleStub} />);

  expect(screen.getByTestId("componentName__title")).toHaveTextContent(titleStub);
});
```
