import type { Side } from "@shared/types/Side";
import { oppositeSide } from "@/state/game-store/actions/utils/OppositeSide";
import { evaluateBoard } from "@/view/pages/game/hooks/use-ai-move/ai/utils/minimax/utils/EvaluateBoard";
import { getAvailableMoves } from "@/view/pages/game/hooks/use-ai-move/ai/shared/GetAvailableMoves";

/*
 * Minimax algorithm with alpha-beta pruning for selecting optimal Tic-Tac-Toe moves.
 *
 * See: https://en.wikipedia.org/wiki/Minimax
 * See: https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning
 *
 * The algorithm works by recursively simulating all possible future game states,
 * alternating between the AI's turn (maximising — trying to get the highest score)
 * and the human's turn (minimising — trying to get the lowest score). It assumes
 * both players play perfectly.
 *
 * Alpha-beta pruning speeds this up by tracking two bounds:
 *   - alpha: the best score the maximising player (AI) is guaranteed so far
 *   - beta:  the best score the minimising player (human) is guaranteed so far
 * When beta <= alpha, the remaining branches can't affect the final decision and
 * are skipped ("pruned"), avoiding unnecessary work.
 *
 * Scores are adjusted by depth so the AI prefers winning sooner and losing later:
 *   - Win:  +10 minus the number of moves taken (earlier wins score higher)
 *   - Loss: -10 plus the number of moves taken (later losses score higher)
 *   - Draw: 0
 */
export function minimax(
  board: (Side | undefined)[],
  depth: number,
  isMaximising: boolean,
  alpha: number,
  beta: number,
  aiSide: Side,
): number {
  const result = evaluateBoard(board);

  if (result !== undefined) {
    return getScore(result, aiSide, depth);
  }

  const currentSide = getCurrentSide(isMaximising, aiSide);
  const availableMoves = getAvailableMoves(board);

  if (isMaximising) {
    let bestScore = -Infinity;
    for (const move of availableMoves) {
      board[move] = currentSide;
      const score = minimax(board, depth + 1, false, alpha, beta, aiSide);
      board[move] = undefined;
      bestScore = Math.max(score, bestScore);
      alpha = Math.max(alpha, bestScore);
      if (beta <= alpha) break;
    }
    return bestScore;
  }

  let bestScore = Infinity;
  for (const move of availableMoves) {
    board[move] = currentSide;
    const score = minimax(board, depth + 1, true, alpha, beta, aiSide);
    board[move] = undefined;
    bestScore = Math.min(score, bestScore);
    beta = Math.min(beta, bestScore);
    if (beta <= alpha) break;
  }
  return bestScore;
}

const WIN_SCORE = 10;
const LOSS_SCORE = -10;
const DRAW_SCORE = 0;

function getCurrentSide(isMaximising: boolean, aiSide: Side): Side {
  if (isMaximising) return aiSide;
  return oppositeSide(aiSide);
}

function getScore(result: Side | "draw", aiSide: Side, depth: number): number {
  if (result === "draw") return DRAW_SCORE;
  if (result === aiSide) return WIN_SCORE - depth;
  return LOSS_SCORE + depth;
}
