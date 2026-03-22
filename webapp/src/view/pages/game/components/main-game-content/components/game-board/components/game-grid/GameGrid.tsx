import type { FC } from "react";
import { useGameStore } from "@/state/game-store/GameStore";
import { GameCell } from "@/view/pages/game/components/main-game-content/components/game-board/components/game-grid/components/GameCell";

export const GameGrid: FC = () => {
  const board = useGameStore((state) => state.board);

  return (
    <div className="grid grid-cols-3 gap-1">
      {board.map((_, index) => (
        <GameCell key={index} index={index} />
      ))}
    </div>
  );
};
