# webapp

The React application for the Playwright ATDD Example project. It implements a Tic Tac Toe game and exists primarily as a subject for the acceptance tests in `../acceptance-tests/`.

## What's in Here

```
webapp/
└── src/
    ├── view/       # UI layer — pages, components, and the router
    ├── state/      # Zustand stores and actions
    └── shared/     # Pure utilities and constants shared within webapp (no view imports)
```

### `view/`

All React components and pages. The router is defined here using React Router.

Pages are not unit tested — they are covered by acceptance tests in `acceptance-tests/`. Pure functions used by the view layer are unit tested.

### `state/`

Zustand stores. Each feature has its own store folder (e.g. `game-store/`, `settings-store/`). Actions are pure functions defined one-per-file in an `actions/` subfolder. The store file itself contains only the Zustand boilerplate.

State code cannot import from the `view/` layer — this is enforced by ESLint.

### `shared/`

Pure utilities and constants that are used both by `state/` and `view/` within the webapp but have no dependency on either. Also contains test helpers such as board builders used in unit tests.

> This `shared/` folder is **internal to webapp**. Code that needs to be shared between `webapp` and `acceptance-tests` lives in `../shared/` at the monorepo root.

## Tech Stack

| Tool | Purpose |
|---|---|
| [Vite](https://vite.dev/) | Build tool and dev server |
| [React 19](https://react.dev/) | UI framework |
| [React Router](https://reactrouter.com/) | Client-side routing |
| [Zustand](https://zustand.docs.pmnd.rs/) | State management |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [Vitest](https://vitest.dev/) | Unit testing |

## Commands

Run from the `webapp/` directory.

| Command | Description |
|---|---|
| `npm run start:dev` | Start the dev server (defaults to `http://localhost:5173`) |
| `npm run build` | Production build |
| `npm test` | Run unit tests |

## Architecture Boundaries

These are enforced by ESLint and will cause CI to fail if violated:

- `state/**` cannot import from `view/**`
- `shared/**` cannot import from `view/**`
- `view/components/**` cannot import from `view/pages/**`

## Test IDs

Components that need to be targeted by acceptance tests use `data-testid` attributes. The naming convention follows [BEM (Block Element Modifier)](https://getbem.com/) style, using `__` as the separator between levels. Read more at [getbem.com](https://getbem.com/). The convention is:

```
{pageId}__{component}__{element}
```

For example: `game__scoreboard__player-name`. Test ID constants are co-located with each page in a `*TestIds.ts` file.
