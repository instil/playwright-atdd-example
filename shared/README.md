# shared

Shared types, utilities, and configuration used across the `webapp` and `acceptance-tests` packages in this monorepo.

## Why This Exists

`webapp` and `acceptance-tests` are separate packages that **cannot import from each other by design**. This boundary is intentional — it keeps the test layer independent of the application's internal implementation details.

When a type or utility is genuinely needed by both packages, it lives here instead. Both packages can depend on `shared`, but neither knows about the other.

```
         ┌──────────┐     ┌───────────────────┐
         │  webapp  │     │  acceptance-tests  │
         └────┬─────┘     └────────┬──────────┘
              │                    │
              └────────┬───────────┘
                       │
                  ┌────▼─────┐
                  │  shared  │
                  └──────────┘
```

## What's in Here

### `config/`

Base configuration files extended by both `webapp` and `acceptance-tests`:

- `eslint.config.base.mts` — shared ESLint rules
- `tsconfig.base.json` — shared TypeScript compiler options

### `src/`

Shared source code — pure types and utilities with no dependency on either `webapp` or `acceptance-tests` internals.

## Adding to shared

Before adding something here, consider whether it truly belongs to both packages or just one. If it's only used in `webapp`, keep it in `webapp/src/shared/`. Only promote code here when it's needed in both.

Code in `shared/src/` must not import from `webapp` or `acceptance-tests`.
