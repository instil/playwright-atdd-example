import { type FC } from "react";
import { useGameStore } from "@/state/game-store/GameStore";
import { useAiMove } from "@/view/pages/game/hooks/use-ai-move/UseAiMove";
import { BackButton } from "@/view/components/BackButton";
import { MainGameContent } from "@/view/pages/game/components/main-game-content/MainGameContent";
import { NoModeSelectionContent } from "@/view/pages/game/components/NoModeSelectionContent";
import { GAME_PAGE_TEST_ID } from "@/view/pages/game/constants/GamePageTestIds";

export const GamePage: FC = () => {
  const mode = useGameStore((state) => state.mode);

  useAiMove();

  return (
    <div data-testid={GAME_PAGE_TEST_ID} className="relative">
      <BackButton testId={`${GAME_PAGE_TEST_ID}__backButton`} />

      <div className="flex flex-col items-center justify-center gap-8 p-8 py-16">
        {!mode && <NoModeSelectionContent />}

        {mode && <MainGameContent />}
      </div>
    </div>
  );
};
