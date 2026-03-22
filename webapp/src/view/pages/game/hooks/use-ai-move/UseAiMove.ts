import { useLayoutEffect } from "react";
import { useGameStore } from "@/state/game-store/GameStore";
import { getBestMove } from "@/view/pages/game/hooks/use-ai-move/ai/GetBestMove";

export function useAiMove(): void {
  const gameStatus = useGameStore((state) => state.gameStatus);
  const mode = useGameStore((state) => state.mode);
  const board = useGameStore((state) => state.board);
  const currentPlayer = useGameStore((state) => state.currentPlayer);
  const aiSide = useGameStore((state) => state.aiSide);
  const makeMove = useGameStore((state) => state.makeMove);

  useLayoutEffect(() => {
    if (gameStatus !== "playing") return;
    if (mode !== "HumanVsAI") return;
    if (currentPlayer !== aiSide) return;

    const boardCopy = [...board];
    const aiMove = getBestMove(boardCopy, aiSide);
    makeMove(aiMove);
  }, [gameStatus, mode, currentPlayer, aiSide, board, makeMove]);
}
