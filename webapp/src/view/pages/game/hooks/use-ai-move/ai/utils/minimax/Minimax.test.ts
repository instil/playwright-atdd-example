import { it, expect } from "vitest";
import { minimax } from "@/view/pages/game/hooks/use-ai-move/ai/utils/minimax/Minimax";
import { buildBoard } from "@/shared/testing/builders/BuildBoard";

it("should return a positive score when AI can win immediately", () => {
  // X (AI) can win at position 2
  const board = buildBoard([
    ["X", "X", "."],
    ["O", "O", "."],
    [".", ".", "."],
  ]);

  const score = minimax(board, 0, true, -Infinity, Infinity, "X");

  expect(score).toBeGreaterThan(0);
});

it("should return a negative score when human is about to win", () => {
  // O (human) is about to win at position 2, X is AI
  const board = buildBoard([
    ["O", "O", "."],
    ["X", "X", "."],
    [".", ".", "."],
  ]);

  const score = minimax(board, 0, false, -Infinity, Infinity, "X");

  expect(score).toBeLessThan(0);
});

it("should return 0 for a position that can only result in a draw", () => {
  // Board: X X O / O O X / X O _ — only move is position 8, no winner possible
  // Verified: all winning lines blocked after X plays 8 (X X O / O O X / X O X)
  const board = buildBoard([
    ["X", "X", "O"],
    ["O", "O", "X"],
    ["X", "O", "."],
  ]);

  const score = minimax(board, 0, true, -Infinity, Infinity, "X");

  expect(score).toBe(0);
});
