import type { GameState } from "@/state/game-store/types/GameState";

export const initialState: GameState = {
  mode: undefined,
  board: Array(9).fill(undefined),
  currentPlayer: "X",
  playerNames: { X: "Player 1", O: "Player 2" },
  scores: { X: 0, O: 0, draws: 0 },
  aiSide: undefined,
  gameStatus: "setup",
  winner: undefined,
  roundStartingPlayer: "X",
};
