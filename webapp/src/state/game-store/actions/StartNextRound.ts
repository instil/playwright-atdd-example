import type { GameState } from "@/state/game-store/types/GameState";
import type { Side } from "@shared/types/Side";
import { oppositeSide } from "@/state/game-store/actions/utils/OppositeSide";

export function startNextRound(state: GameState): Partial<GameState> {
  const nextStartingPlayer = oppositeSide(state.roundStartingPlayer);

  return {
    board: Array(9).fill(undefined),
    currentPlayer: nextStartingPlayer,
    roundStartingPlayer: nextStartingPlayer,
    gameStatus: "playing",
    winner: undefined,
    aiSide: nextAiSide(state.aiSide),
  };
}

function nextAiSide(aiSide: Side | undefined): Side | undefined {
  if (aiSide === undefined) return undefined;
  return oppositeSide(aiSide);
}
