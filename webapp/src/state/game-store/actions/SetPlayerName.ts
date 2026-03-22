import type { GameState } from "@/state/game-store/types/GameState";
import type { Side } from "@shared/types/Side";

export function setPlayerName(
  state: GameState,
  side: Side,
  name: string,
): Partial<GameState> {
  return {
    playerNames: { ...state.playerNames, [side]: name },
  };
}
