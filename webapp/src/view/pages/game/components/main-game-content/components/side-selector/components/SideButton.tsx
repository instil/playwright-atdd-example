import type { FC } from "react";
import type { Side } from "@shared/types/Side";
import { useGameStore } from "@/state/game-store/GameStore";
import { oppositeSide } from "@/state/game-store/actions/utils/OppositeSide";
import { GAME_PAGE_TEST_ID } from "@/view/pages/game/constants/GamePageTestIds";

const SIDE_SELECTOR_TEST_ID = `${GAME_PAGE_TEST_ID}__sideSelector`;

interface Props {
  side: Side;
}

export const SideButton: FC<Props> = ({ side }) => {
  const setAiSide = useGameStore((state) => state.setAiSide);

  const handleClick = (): void => {
    setAiSide(oppositeSide(side));
  };

  return (
    <button
      data-testid={`${SIDE_SELECTOR_TEST_ID}__pick${side}Button`}
      onClick={handleClick}
      className="px-8 py-4 text-2xl font-bold border-2 border-foreground rounded-lg hover:bg-muted"
    >
      {side}
    </button>
  );
};
