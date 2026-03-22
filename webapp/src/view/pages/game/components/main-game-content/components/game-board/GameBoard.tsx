import type { FC } from "react";
import { GAME_PAGE_TEST_ID } from "@/view/pages/game/constants/GamePageTestIds";
import { CurrentPlayer } from "@/view/pages/game/components/main-game-content/components/game-board/components/CurrentPlayer";
import { GameGrid } from "@/view/pages/game/components/main-game-content/components/game-board/components/game-grid/GameGrid";

const GAME_BOARD_TEST_ID = `${GAME_PAGE_TEST_ID}__gameBoard`;

export const GameBoard: FC = () => (
  <div
    data-testid={GAME_BOARD_TEST_ID}
    className="flex flex-col items-center gap-4"
  >
    <CurrentPlayer />

    <GameGrid />
  </div>
);
