import type { FC } from "react";
import type { Side } from "@shared/types/Side";
import { useGameStore } from "@/state/game-store/GameStore";
import { GAME_PAGE_TEST_ID } from "@/view/pages/game/constants/GamePageTestIds";
import { EditableName } from "@/view/pages/game/components/main-game-content/components/scoreboard/components/player-column/components/editable-name/EditableName";

const SCOREBOARD_TEST_ID = `${GAME_PAGE_TEST_ID}__scoreboard`;

interface Props {
  side: Side;
}

export const PlayerColumn: FC<Props> = ({ side }) => {
  const score = useGameStore((state) => state.scores[side]);

  return (
    <div className="flex flex-col gap-1">
      <EditableName side={side} />

      <span className="text-xs text-muted-foreground">({side})</span>

      <span
        data-testid={`${SCOREBOARD_TEST_ID}__${side.toLowerCase()}Score`}
        className="text-2xl font-bold"
      >
        {score}
      </span>
    </div>
  );
};
