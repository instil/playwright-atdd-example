import type { FC } from "react";
import { useGameStore } from "@/state/game-store/GameStore";
import { GameBoard } from "@/view/pages/game/components/main-game-content/components/game-board/GameBoard";
import { GameOver } from "@/view/pages/game/components/main-game-content/components/GameOver";
import { Scoreboard } from "@/view/pages/game/components/main-game-content/components/scoreboard/Scoreboard";
import { SideSelector } from "@/view/pages/game/components/main-game-content/components/side-selector/SideSelector";

export const MainGameContent: FC = () => {
  const gameStatus = useGameStore((state) => state.gameStatus);
  const mode = useGameStore((state) => state.mode);
  const aiSide = useGameStore((state) => state.aiSide);

  const isGameOver = gameStatus === "won" || gameStatus === "draw";
  const isAwaitingSideSelection = mode === "HumanVsAI" && aiSide === undefined;

  return (
    <>
      <Scoreboard />

      {isAwaitingSideSelection && <SideSelector />}

      {!isAwaitingSideSelection && !isGameOver && <GameBoard />}

      {isGameOver && <GameOver />}
    </>
  );
};
