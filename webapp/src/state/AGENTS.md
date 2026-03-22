# State Layer (`src/state/`)

Follow all conventions in the root `AGENTS.md` and `webapp/AGENTS.md` plus the state-specific conventions below.

## Never

- Import from Zustand or the store file inside action files (`state/**/actions/`) — actions are pure functions
- Import from `@/view/**` — state layer cannot depend on the view layer
- Put multiple actions in one file — one action per file, PascalCase filename
- Add logic to the store file — it contains only Zustand `create()` boilerplate

## Store Folder Structure

Each store lives in its own folder under `src/state/`. The folder contains only the Zustand boilerplate file plus organised subfolders — no bucket files (no `store.actions.ts`, no `store.utils.ts`):

```
state/{feature}-store/
  {Feature}Store.ts          ← Zustand create() boilerplate only
  InitialState.ts            ← initial state constant (only when shared with a ResetGame action)
  types/
    {TypeName}.ts            ← one file per type or interface (PascalCase)
  actions/
    {ActionName}.ts          ← one file per action, PascalCase (e.g. SetMode.ts, MakeMove.ts)
    {ActionName}.test.ts     ← co-located test for each action
    shared/                  ← utilities used by more than one action
      {UtilName}.ts
      {UtilName}.test.ts
    {action-name}/           ← action gets its own folder when it has child utilities
      {ActionName}.ts
      {ActionName}.test.ts
      utils/
        {child-util}/        ← utility only used by this action → nested here, not in shared/
          {UtilName}.ts
          {UtilName}.test.ts
```

Apply the tiered nesting rule to utilities inside `actions/`:
- Utility used by only one action → nest it inside that action's folder (the action gets a named subfolder)
- Utility used by more than one action → place it in `actions/shared/`

## `*Store.ts` — Zustand Store File

Contains only Zustand `create()` boilerplate. Wires action functions into `set` calls. Re-exports public types consumed by other layers so import paths stay stable.

```typescript
// GameStore.ts
export const useGameStore = create<GameState & GameActions>((set) => ({
  ...initialState,
  setMode: (mode) => set(setMode(mode)),
  makeMove: (index) => set((state) => makeMove(state, index)),
  ...
}));
```

## `actions/*.ts` — Action Files

Export a single pure function that computes a state update. Never import from Zustand or the store file.

```typescript
// actions/SetMode.ts — no current state needed
export function setMode(mode: GameMode): Partial<GameState> {
  return { mode, gameStatus: "playing", ... };
}

// actions/make-move/MakeMove.ts — needs current state, gets its own folder (has child utils)
export function makeMove(state: GameState, index: number): Partial<GameState> | GameState {
  ...
}
```

## `types/*.ts` — Type Files

One file per type or interface, PascalCase filename. Types go in `types/` as separate files. The store re-exports any types consumed by other layers.

The actions interface (`GameActions`, `SettingsActions`, etc.) may be declared inline in the store file rather than in `types/` when it is not imported anywhere else — this keeps the contract close to its only consumer.

## `actions/*.test.ts` — Action Test Files

Action files are pure functions and must have co-located unit tests.

- AAA pattern: Arrange, Act, Assert — separated by blank lines, no section comments
- Begin with `it("should ...")`
- `Stub` suffix for data objects; `Mock` suffix for `vi.mocked()` functions
