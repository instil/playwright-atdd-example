import type { Side } from "@shared/types/Side";
import { getAvailableMoves } from "@/view/pages/game/hooks/use-ai-move/ai/shared/GetAvailableMoves";
import { minimax } from "@/view/pages/game/hooks/use-ai-move/ai/utils/minimax/Minimax";

export function getBestMove(board: (Side | undefined)[], aiSide: Side): number {
  const availableMoves = getAvailableMoves(board);

  return availableMoves.reduce(
    (best, move) => {
      board[move] = aiSide;
      const score = minimax(board, 0, false, -Infinity, Infinity, aiSide);
      board[move] = undefined;

      if (score <= best.score) return best;
      return { score, move };
    },
    { score: -Infinity, move: availableMoves[0] },
  ).move;
}
