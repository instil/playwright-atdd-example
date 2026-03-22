import type { FC } from "react";
import { GAME_PAGE_TEST_ID } from "@/view/pages/game/constants/GamePageTestIds";
import { PlayerColumn } from "@/view/pages/game/components/main-game-content/components/scoreboard/components/player-column/PlayerColumn";
import { DrawsColumn } from "@/view/pages/game/components/main-game-content/components/scoreboard/components/DrawsColumn";

const SCOREBOARD_TEST_ID = `${GAME_PAGE_TEST_ID}__scoreboard`;

export const Scoreboard: FC = () => (
  <div
    data-testid={SCOREBOARD_TEST_ID}
    className="flex gap-8 p-4 border border-foreground rounded-lg text-center"
  >
    <PlayerColumn side="X" />

    <DrawsColumn />

    <PlayerColumn side="O" />
  </div>
);
