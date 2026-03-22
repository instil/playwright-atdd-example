import type { Side } from "@shared/types/Side";
import { winningLines } from "@/shared/constants/WinningLines";

export function checkWinner(board: (Side | undefined)[]): Side | undefined {
  for (const [a, b, c] of winningLines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return undefined;
}
