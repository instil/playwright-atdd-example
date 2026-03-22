import type { FC } from "react";
import { useGameStore } from "@/state/game-store/GameStore";
import { GAME_PAGE_TEST_ID } from "@/view/pages/game/constants/GamePageTestIds";

const GAME_BOARD_TEST_ID = `${GAME_PAGE_TEST_ID}__gameBoard`;

interface Props {
  index: number;
}

export const GameCell: FC<Props> = ({ index }) => {
  const mark = useGameStore((state) => state.board[index]);
  const gameStatus = useGameStore((state) => state.gameStatus);
  const makeMove = useGameStore((state) => state.makeMove);

  const disabled = gameStatus !== "playing" || mark !== undefined;

  return (
    <button
      data-testid={`${GAME_BOARD_TEST_ID}__cell-${index}`}
      disabled={disabled}
      onClick={() => makeMove(index)}
      className="w-24 h-24 text-4xl font-bold border-2 border-foreground flex items-center justify-center hover:bg-muted disabled:cursor-not-allowed disabled:opacity-100"
    >
      {mark}
    </button>
  );
};
