import type { Side } from "@shared/types/Side";

type Cell = Side | undefined;
type InputCell = Side | ".";
type Row = [InputCell, InputCell, InputCell];

export function buildBoard(rows: [Row, Row, Row]): Cell[] {
  return rows.flat().map((cell) => (cell === "." ? undefined : cell));
}

export function buildEmptyBoard(): Cell[] {
  return Array<Cell>(9).fill(undefined);
}
