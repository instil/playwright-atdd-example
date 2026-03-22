import type { GameState } from "@/state/game-store/types/GameState";

export function startGame(): Partial<GameState> {
  return {
    gameStatus: "playing",
    board: Array(9).fill(undefined),
    currentPlayer: "X",
  };
}
