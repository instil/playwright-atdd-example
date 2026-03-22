# Webapp Developer

Follow all conventions in the root `AGENTS.md` plus the webapp-specific conventions below.

> **Subdirectory instruction files:** Additional AGENTS.md files in `src/view/` and `src/state/` extend these rules for their respective areas. Always read the nearest AGENTS.md before editing files in those directories.

## Never

- Import from `@/view/**` within `state/**` or `shared/**` — ESLint enforces this and violations fail the build
- Import from `@/view/pages/**` within `view/components/**`

## Technology Stack

Vite 8, React 19, React Router 7 (`createBrowserRouter`/`RouterProvider`), Tailwind CSS 4, Vitest 4

## Project Structure

```
webapp/src/
├── App.tsx                         # Root component — routing + error boundary
├── main.tsx                        # Entry point
├── index.css                       # Global Tailwind styles
├── view/                           # UI layer — components, pages, router (see src/view/AGENTS.md)
├── state/                          # State management (see src/state/AGENTS.md)
└── shared/                         # Cross-layer utilities (cannot import from view)
    └── testing/
        ├── SetupTests.ts           # Vitest + React Testing Library setup
        └── builders/               # Test data builders (PascalCase, e.g. BuildBoard.ts)
```

## Architecture Boundaries

Enforced by ESLint — violations cause build failures:

- `state/**` — cannot import from `@/view/**`
- `shared/**` — cannot import from `@/view/**`
- `view/components/**` — cannot import from `@/view/pages/**`
- `view/pages/**` — can import from anywhere

## Domain Conventions

- Game mode values use fully qualified string literals: `"HumanVsHuman"` and `"HumanVsAI"` — never short codes or abbreviations
- Game side values use `"X"` and `"O"` as string literals
