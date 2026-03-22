import { it, expect } from "vitest";
import { evaluateBoard } from "@/view/pages/game/hooks/use-ai-move/ai/utils/minimax/utils/EvaluateBoard";
import { buildBoard } from "@/shared/testing/builders/BuildBoard";

it("should return X when X wins the top row", () => {
  const board = buildBoard([
    ["X", "X", "X"],
    [".", "O", "."],
    [".", "O", "."],
  ]);

  expect(evaluateBoard(board)).toBe("X");
});

it("should return O when O wins a diagonal", () => {
  const board = buildBoard([
    ["O", "X", "."],
    ["X", "O", "."],
    ["X", ".", "O"],
  ]);

  expect(evaluateBoard(board)).toBe("O");
});

it("should return draw when all cells filled with no winner", () => {
  const board = buildBoard([
    ["X", "O", "X"],
    ["O", "X", "O"],
    ["O", "X", "O"],
  ]);

  expect(evaluateBoard(board)).toBe("draw");
});

it("should return undefined for an in-progress board", () => {
  const board = buildBoard([
    ["X", ".", "."],
    [".", "O", "."],
    [".", ".", "."],
  ]);

  expect(evaluateBoard(board)).toBeUndefined();
});
