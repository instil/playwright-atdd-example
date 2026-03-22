import type { FC } from "react";
import { useGameStore } from "@/state/game-store/GameStore";
import { GAME_PAGE_TEST_ID } from "@/view/pages/game/constants/GamePageTestIds";

const TEST_ID = `${GAME_PAGE_TEST_ID}__gameBoard__currentPlayer`;

export const CurrentPlayer: FC = () => {
  const currentPlayer = useGameStore((state) => state.currentPlayer);

  return (
    <p data-testid={TEST_ID} className="text-xl font-semibold">
      Current player: {currentPlayer}
    </p>
  );
};
