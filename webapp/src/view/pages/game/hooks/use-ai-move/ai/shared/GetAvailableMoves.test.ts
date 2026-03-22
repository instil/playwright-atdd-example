import { it, expect } from "vitest";
import { getAvailableMoves } from "@/view/pages/game/hooks/use-ai-move/ai/shared/GetAvailableMoves";
import {
  buildBoard,
  buildEmptyBoard,
} from "@/shared/testing/builders/BuildBoard";

it("should return all indices for an empty board", () => {
  const board = buildEmptyBoard();

  const moves = getAvailableMoves(board);

  expect(moves).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
});

it("should return only empty cell indices", () => {
  const board = buildBoard([
    ["X", ".", "O"],
    [".", "X", "."],
    [".", ".", "."],
  ]);

  const moves = getAvailableMoves(board);

  expect(moves).toEqual([1, 3, 5, 6, 7, 8]);
});

it("should return empty array for a full board", () => {
  const board = buildBoard([
    ["X", "O", "X"],
    ["O", "X", "O"],
    ["X", "O", "X"],
  ]);

  const moves = getAvailableMoves(board);

  expect(moves).toEqual([]);
});
