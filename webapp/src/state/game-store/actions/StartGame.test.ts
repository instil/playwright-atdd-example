import { it, expect } from "vitest";
import { startGame } from "@/state/game-store/actions/StartGame";

it("should set gameStatus to playing and reset the board", () => {
  const result = startGame();

  expect(result.gameStatus).toBe("playing");
  expect(result.board).toEqual(Array(9).fill(undefined));
  expect(result.currentPlayer).toBe("X");
});
