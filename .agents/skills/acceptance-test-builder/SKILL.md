---
name: acceptance-test-builder
description: Generate acceptance test files (.ui.ts) by analyzing existing DSL and writing structured Given/When/Then tests. Use when the user asks to write a new acceptance test or UI scenario.
argument-hint: "JIRA ticket URL and feature name"
---

Generate acceptance test files following all conventions in `acceptance-tests/AGENTS.md`.

## Workflow

### Step 1: Gather Requirements

Ask for:

1. **JIRA ticket URL** — added as a comment above the first `given`
2. **Acceptance criteria** — the Given/When/Then scenarios
3. **Feature name** — for file name and folder placement

### Step 2: Analyze Existing DSL

Search `acceptance-tests/src/dsl/` before writing anything:

1. Check `MySiteDsl.ts` for existing navigation/interaction methods
2. Check `dsl/webapp/components/` for component-level DSL and types
3. Note what exists vs. what is missing

### Step 3: Generate Test File

Place at `src/tests/[FeatureName].basic.ui.ts` (or a subfolder matching the page hierarchy).

- Use `then.skip` for tests where DSL is not yet implemented (ATDD pattern)
- No implementation hints in test description strings

### Step 4: Add TODO Comments for Missing DSL

```typescript
setup(async ({ mySite }) => {
  // TODO: Navigate to the page
  // Expected location: acceptance-tests/src/dsl/webapp/MySiteDsl.ts
});
```

Describe WHAT, not HOW — no example implementation code.

## Template

```typescript
import {
  given,
  when,
  then,
  setup,
  expect,
} from "@/playwright-alias/PlaywrightAlias";
import { waitFor } from "@/utils/WaitFor";

// [JIRA TICKET URL]
given.skip("[context description]", () => {
  setup(async ({ mySite }) => {
    // Navigation or global setup
  });

  when("[user action]", () => {
    setup(async ({ mySite }) => {
      // Action setup
    });

    then("[expected outcome]", async ({ mySite }) => {
      // Assertion — use waitFor() for async DSL calls
    });
  });
});
```

## Output

1. DSL analysis — methods/types found vs. missing
2. Complete test file with inline TODO comments
3. List of DSL files/methods to create with expected locations
