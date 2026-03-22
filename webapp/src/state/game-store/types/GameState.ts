import type { GameMode } from "@/state/game-store/types/GameMode";
import type { GameStatus } from "@/state/game-store/types/GameStatus";
import type { Side } from "@shared/types/Side";

export interface GameState {
  mode: GameMode | undefined;
  board: (Side | undefined)[];
  currentPlayer: Side;
  playerNames: Record<Side, string>;
  scores: { X: number; O: number; draws: number };
  aiSide: Side | undefined;
  gameStatus: GameStatus;
  winner: Side | undefined;
  roundStartingPlayer: Side;
}
