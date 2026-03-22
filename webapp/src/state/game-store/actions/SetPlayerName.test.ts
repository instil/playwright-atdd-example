import { it, expect } from "vitest";
import { setPlayerName } from "@/state/game-store/actions/SetPlayerName";
import { initialState } from "@/state/game-store/InitialState";

it("should update the name for the given side", () => {
  const result = setPlayerName(initialState, "X", "Alice");

  expect(result.playerNames?.X).toBe("Alice");
  expect(result.playerNames?.O).toBe("Player 2");
});

it("should not mutate the original playerNames", () => {
  setPlayerName(initialState, "X", "Alice");

  expect(initialState.playerNames.X).toBe("Player 1");
});
