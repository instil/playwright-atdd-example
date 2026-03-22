import type { GameState } from "@/state/game-store/types/GameState";
import type { Side } from "@shared/types/Side";

export function setAiSide(side: Side): Partial<GameState> {
  return {
    aiSide: side,
    gameStatus: "playing",
  };
}
