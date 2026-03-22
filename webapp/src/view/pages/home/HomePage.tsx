import type { FC } from "react";
import { useNavigate } from "react-router";
import { useGameStore } from "@/state/game-store/GameStore";
import type { GameMode } from "@/state/game-store/types/GameMode";
import { TicTacToeTitle } from "@/view/pages/home/components/TicTacToeTitle";
import { GameModeButton } from "@/view/pages/home/components/GameModeButton";
import { SettingsLink } from "@/view/pages/home/components/SettingsLink";
import { HOME_PAGE_TEST_ID } from "@/view/pages/home/constants/HomePageTestIds";

export const HomePage: FC = () => {
  const navigate = useNavigate();
  const setMode = useGameStore((state) => state.setMode);

  const handleModeSelect = (mode: GameMode): void => {
    setMode(mode);
    void navigate("/game");
  };

  return (
    <div
      data-testid={HOME_PAGE_TEST_ID}
      className="flex flex-col items-center justify-center gap-8 p-8 py-16"
    >
      <TicTacToeTitle />

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <GameModeButton
          testId={`${HOME_PAGE_TEST_ID}__humanVsHumanButton`}
          colorClass="bg-blue-600 hover:bg-blue-700"
          onClick={() => handleModeSelect("HumanVsHuman")}
        >
          Human vs Human
        </GameModeButton>

        <GameModeButton
          testId={`${HOME_PAGE_TEST_ID}__humanVsAiButton`}
          colorClass="bg-green-600 hover:bg-green-700"
          onClick={() => handleModeSelect("HumanVsAI")}
        >
          Human vs AI
        </GameModeButton>
      </div>

      <SettingsLink />
    </div>
  );
};
