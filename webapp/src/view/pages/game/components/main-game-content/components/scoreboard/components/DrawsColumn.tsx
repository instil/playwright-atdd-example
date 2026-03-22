import type { FC } from "react";
import { useGameStore } from "@/state/game-store/GameStore";
import { GAME_PAGE_TEST_ID } from "@/view/pages/game/constants/GamePageTestIds";

const SCOREBOARD_TEST_ID = `${GAME_PAGE_TEST_ID}__scoreboard`;

export const DrawsColumn: FC = () => {
  const score = useGameStore((state) => state.scores.draws);

  return (
    <div className="flex flex-col gap-1">
      <span className="font-semibold">Draws</span>

      <span
        data-testid={`${SCOREBOARD_TEST_ID}__drawScore`}
        className="text-2xl font-bold"
      >
        {score}
      </span>
    </div>
  );
};
