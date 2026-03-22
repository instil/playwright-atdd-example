import { it, expect } from "vitest";
import { resetGame } from "@/state/game-store/actions/ResetGame";
import { initialState } from "@/state/game-store/InitialState";

it("should return the initial game state", () => {
  expect(resetGame()).toBe(initialState);
});
