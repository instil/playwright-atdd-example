// All possible winning combinations for a 3x3 Tic-Tac-Toe board, where each cell
// is indexed 0–8 left-to-right, top-to-bottom. Includes rows, columns, and diagonals.
// https://en.wikipedia.org/wiki/Tic-tac-toe#Combinatorics
export const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const;
