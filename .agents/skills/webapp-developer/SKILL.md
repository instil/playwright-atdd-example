---
name: webapp-developer
description: Implement features or changes in the webapp. Use when the user asks to build a component, page, hook, or any webapp feature.
---

Implement webapp features following all conventions in `webapp/AGENTS.md`.

## Workflow

### Step 1: Understand the Requirement

Identify which layer the work belongs to (component, page, state, shared) before touching any code.

### Step 2: Search for Existing Patterns

1. Check `src/view/components/` for reusable components to extend or compose
2. Check `src/state/` for existing state logic
3. Check `src/shared/` for utilities

### Step 3: Implement

- Place files at the correct layer per the architecture boundaries in `webapp/AGENTS.md`
- Add `data-testid` to all meaningful elements (`{componentTestId}__{elementName}`)
- Use Tailwind for all styling
- Follow newspaper order: exported function first, helpers below

### Step 4: Write Tests

Create or update the co-located `.test.tsx` / `.test.ts` file covering:
- Happy path / default render
- Key conditional branches
- User interactions where applicable

### Step 5: Validate

```bash
cd webapp && pnpm build
```

Fix all TypeScript, lint, and test errors before considering work done.
