import type { GameMode } from "@/state/game-store/types/GameMode";
import type { GameState } from "@/state/game-store/types/GameState";
import type { GameStatus } from "@/state/game-store/types/GameStatus";

export function setMode(mode: GameMode): Partial<GameState> {
  return {
    mode,
    aiSide: undefined,
    gameStatus: gameModeToInitialStatus(mode),
    board: Array(9).fill(undefined),
    currentPlayer: "X",
    roundStartingPlayer: "X",
  };
}

function gameModeToInitialStatus(mode: GameMode): GameStatus {
  if (mode === "HumanVsHuman") return "playing";
  return "setup";
}
