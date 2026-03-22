import type { Side } from "@shared/types/Side";

export function getAvailableMoves(board: (Side | undefined)[]): number[] {
  return board.reduce<number[]>((moves, cell, index) => {
    if (cell === undefined) {
      moves.push(index);
    }
    return moves;
  }, []);
}
