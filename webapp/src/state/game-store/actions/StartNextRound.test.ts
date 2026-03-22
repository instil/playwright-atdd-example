import { it, expect } from "vitest";
import { startNextRound } from "@/state/game-store/actions/StartNextRound";
import { initialState } from "@/state/game-store/InitialState";
import type { GameState } from "@/state/game-store/types/GameState";

it("should flip the starting player", () => {
  const state: GameState = { ...initialState, roundStartingPlayer: "X" };

  const result = startNextRound(state);

  expect(result.currentPlayer).toBe("O");
  expect(result.roundStartingPlayer).toBe("O");
});

it("should flip the AI side when one is set", () => {
  const state: GameState = {
    ...initialState,
    roundStartingPlayer: "X",
    aiSide: "O",
  };

  const result = startNextRound(state);

  expect(result.aiSide).toBe("X");
});

it("should leave aiSide undefined when it was not set", () => {
  const state: GameState = {
    ...initialState,
    roundStartingPlayer: "X",
    aiSide: undefined,
  };

  const result = startNextRound(state);

  expect(result.aiSide).toBeUndefined();
});

it("should reset the board and clear the winner", () => {
  const state: GameState = {
    ...initialState,
    roundStartingPlayer: "X",
    winner: "X",
    gameStatus: "won",
  };

  const result = startNextRound(state);

  expect(result.board).toEqual(Array(9).fill(undefined));
  expect(result.winner).toBeUndefined();
  expect(result.gameStatus).toBe("playing");
});
