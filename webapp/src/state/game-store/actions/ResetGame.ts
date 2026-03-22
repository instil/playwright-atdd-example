import type { GameState } from "@/state/game-store/types/GameState";
import { initialState } from "@/state/game-store/InitialState";

export function resetGame(): GameState {
  return initialState;
}
