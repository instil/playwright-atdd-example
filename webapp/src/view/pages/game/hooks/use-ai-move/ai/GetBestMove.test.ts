import { it, expect } from "vitest";
import { getBestMove } from "@/view/pages/game/hooks/use-ai-move/ai/GetBestMove";
import {
  buildBoard,
  buildEmptyBoard,
} from "@/shared/testing/builders/BuildBoard";

it("should take the winning move when available", () => {
  // X (AI) can win at position 2
  const board = buildBoard([
    ["X", "X", "."],
    ["O", "O", "."],
    [".", ".", "."],
  ]);

  const move = getBestMove(board, "X");

  expect(move).toBe(2);
});

it("should block the human from winning", () => {
  // O (human) is about to win at position 2 — X (AI) must block
  const board = buildBoard([
    ["O", "O", "."],
    ["X", ".", "."],
    [".", ".", "."],
  ]);

  const move = getBestMove(board, "X");

  expect(move).toBe(2);
});

it("should return a valid empty cell on an empty board", () => {
  const board = buildEmptyBoard();

  const move = getBestMove(board, "X");

  expect(move).toBeGreaterThanOrEqual(0);
  expect(move).toBeLessThanOrEqual(8);
  expect(board[move]).toBeUndefined();
});

it("should never lose as X against any single O move", () => {
  const positions = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  for (const humanMove of positions) {
    const board = buildEmptyBoard();
    board[humanMove] = "O";

    const aiMove = getBestMove(board, "X");

    expect(aiMove).not.toBe(humanMove);
    expect(board[aiMove]).toBeUndefined();
  }
});
