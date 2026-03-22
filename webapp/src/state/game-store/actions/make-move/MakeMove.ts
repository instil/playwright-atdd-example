import type { GameState } from "@/state/game-store/types/GameState";
import { checkWinner } from "@/shared/utils/CheckWinner";
import { oppositeSide } from "@/state/game-store/actions/utils/OppositeSide";

export function makeMove(
  state: GameState,
  index: number,
): Partial<GameState> | GameState {
  if (state.gameStatus !== "playing" || state.board[index] !== undefined) {
    return state;
  }

  const newBoard = [...state.board];
  newBoard[index] = state.currentPlayer;

  const winner = checkWinner(newBoard);

  if (winner) {
    return {
      board: newBoard,
      winner,
      gameStatus: "won",
      scores: { ...state.scores, [winner]: state.scores[winner] + 1 },
    };
  }

  if (newBoard.every((cell) => cell !== undefined)) {
    return {
      board: newBoard,
      gameStatus: "draw",
      scores: { ...state.scores, draws: state.scores.draws + 1 },
    };
  }

  return {
    board: newBoard,
    currentPlayer: oppositeSide(state.currentPlayer),
  };
}
