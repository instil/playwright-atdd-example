import type { FC } from "react";
import { useGameStore } from "@/state/game-store/GameStore";
import type { GameStatus } from "@/state/game-store/types/GameStatus";
import type { Side } from "@shared/types/Side";
import { GAME_PAGE_TEST_ID } from "@/view/pages/game/constants/GamePageTestIds";

const GAME_OVER_TEST_ID = `${GAME_PAGE_TEST_ID}__gameOver`;

export const GameOver: FC = () => {
  const gameStatus = useGameStore((state) => state.gameStatus);
  const winner = useGameStore((state) => state.winner);
  const playerNames = useGameStore((state) => state.playerNames);
  const startNextRound = useGameStore((state) => state.startNextRound);

  const message = getGameOverMessage(gameStatus, winner, playerNames);

  return (
    <div
      data-testid={GAME_OVER_TEST_ID}
      className="flex flex-col items-center gap-4 p-6 border-2 border-foreground rounded-lg"
    >
      <p
        data-testid={`${GAME_OVER_TEST_ID}__message`}
        className="text-2xl font-bold"
      >
        {message}
      </p>
      <button
        data-testid={`${GAME_OVER_TEST_ID}__playAgainButton`}
        onClick={startNextRound}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
      >
        Play Again
      </button>
    </div>
  );
};

function getGameOverMessage(
  gameStatus: GameStatus,
  winner: Side | undefined,
  playerNames: Record<Side, string>,
): string {
  if (gameStatus === "won" && winner)
    return `${playerNames[winner]} (${winner}) wins!`;
  return "Draw!";
}
