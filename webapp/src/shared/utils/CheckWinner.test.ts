import { it, expect } from "vitest";
import { checkWinner } from "@/shared/utils/CheckWinner";
import { winningLines } from "@/shared/constants/WinningLines";
import {
  buildBoard,
  buildEmptyBoard,
} from "@/shared/testing/builders/BuildBoard";

it("should return the winner when X occupies the top row", () => {
  const board = buildBoard([
    ["X", "X", "X"],
    [".", "O", "."],
    [".", ".", "O"],
  ]);

  expect(checkWinner(board)).toBe("X");
});

it("should return the winner when O occupies the middle row", () => {
  const board = buildBoard([
    ["X", ".", "."],
    ["O", "O", "O"],
    ["X", ".", "."],
  ]);

  expect(checkWinner(board)).toBe("O");
});

it("should return the winner when X occupies the left column", () => {
  const board = buildBoard([
    ["X", "O", "."],
    ["X", "O", "."],
    ["X", ".", "."],
  ]);

  expect(checkWinner(board)).toBe("X");
});

it("should return the winner when O occupies the main diagonal", () => {
  const board = buildBoard([
    ["O", "X", "."],
    ["X", "O", "."],
    [".", ".", "O"],
  ]);

  expect(checkWinner(board)).toBe("O");
});

it("should return the winner for every winning line", () => {
  for (const line of winningLines) {
    const board = buildEmptyBoard();
    for (const index of line) {
      board[index] = "X";
    }

    expect(checkWinner(board)).toBe("X");
  }
});

it("should return undefined when there is no winner", () => {
  const board = buildEmptyBoard();

  expect(checkWinner(board)).toBeUndefined();
});

it("should return undefined for a full board with no winner", () => {
  const board = buildBoard([
    ["X", "O", "X"],
    ["O", "X", "O"],
    ["O", "X", "O"],
  ]);

  expect(checkWinner(board)).toBeUndefined();
});
