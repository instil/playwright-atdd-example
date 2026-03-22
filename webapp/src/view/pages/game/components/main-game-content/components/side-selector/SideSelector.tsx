import type { FC } from "react";
import { GAME_PAGE_TEST_ID } from "@/view/pages/game/constants/GamePageTestIds";
import { SideSelectorHeading } from "@/view/pages/game/components/main-game-content/components/side-selector/components/SideSelectorHeading";
import { SideButton } from "@/view/pages/game/components/main-game-content/components/side-selector/components/SideButton";

const SIDE_SELECTOR_TEST_ID = `${GAME_PAGE_TEST_ID}__sideSelector`;

export const SideSelector: FC = () => (
  <div
    data-testid={SIDE_SELECTOR_TEST_ID}
    className="flex flex-col items-center gap-4"
  >
    <SideSelectorHeading />

    <div className="flex gap-4">
      <SideButton side="X" />

      <SideButton side="O" />
    </div>
  </div>
);
