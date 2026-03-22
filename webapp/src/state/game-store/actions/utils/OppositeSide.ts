import type { Side } from "@shared/types/Side";

export function oppositeSide(side: Side): Side {
  if (side === "X") return "O";
  return "X";
}
