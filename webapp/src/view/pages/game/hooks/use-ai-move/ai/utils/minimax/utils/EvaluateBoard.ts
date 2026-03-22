import type { Side } from "@shared/types/Side";
import { checkWinner } from "@/shared/utils/CheckWinner";

type BoardResult = Side | "draw" | undefined;

export function evaluateBoard(board: (Side | undefined)[]): BoardResult {
  const winner = checkWinner(board);
  if (winner) return winner;

  if (board.every((cell) => cell !== undefined)) {
    return "draw";
  }

  return undefined;
}
