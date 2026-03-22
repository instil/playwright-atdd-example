import { it, expect } from "vitest";
import { makeMove } from "@/state/game-store/actions/make-move/MakeMove";
import { initialState } from "@/state/game-store/InitialState";
import type { GameState } from "@/state/game-store/types/GameState";
import {
  buildBoard,
  buildEmptyBoard,
} from "@/shared/testing/builders/BuildBoard";

it("should place the current player's mark on the board", () => {
  const state: GameState = {
    ...initialState,
    gameStatus: "playing",
    currentPlayer: "X",
  };

  const result = makeMove(state, 4) as Partial<GameState>;

  expect(result.board?.[4]).toBe("X");
});

it("should advance to the next player after a normal move", () => {
  const state: GameState = {
    ...initialState,
    gameStatus: "playing",
    currentPlayer: "X",
  };

  const result = makeMove(state, 0) as Partial<GameState>;

  expect(result.currentPlayer).toBe("O");
});

it("should detect a winning move and update scores", () => {
  const board = buildBoard([
    ["X", "X", "."],
    ["O", "O", "."],
    [".", ".", "."],
  ]);
  const state: GameState = {
    ...initialState,
    gameStatus: "playing",
    currentPlayer: "X",
    board,
  };

  const result = makeMove(state, 2) as Partial<GameState>;

  expect(result.winner).toBe("X");
  expect(result.gameStatus).toBe("won");
  expect(result.scores?.X).toBe(1);
});

it("should detect a draw when the board is full with no winner", () => {
  const board = buildBoard([
    ["X", "O", "X"],
    ["O", "X", "O"],
    ["O", "X", "."],
  ]);
  const state: GameState = {
    ...initialState,
    gameStatus: "playing",
    currentPlayer: "O",
    board,
  };

  const result = makeMove(state, 8) as Partial<GameState>;

  expect(result.gameStatus).toBe("draw");
  expect(result.scores?.draws).toBe(1);
});

it("should return the same state when the target cell is occupied", () => {
  const board = buildEmptyBoard();
  board[4] = "O";
  const state: GameState = {
    ...initialState,
    gameStatus: "playing",
    currentPlayer: "X",
    board,
  };

  const result = makeMove(state, 4);

  expect(result).toBe(state);
});

it("should return the same state when the game is not playing", () => {
  const state: GameState = { ...initialState, gameStatus: "won" };

  const result = makeMove(state, 0);

  expect(result).toBe(state);
});
