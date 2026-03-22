import { it, expect } from "vitest";
import { setMode } from "@/state/game-store/actions/SetMode";

it("should set gameStatus to playing for HumanVsHuman", () => {
  const result = setMode("HumanVsHuman");

  expect(result.gameStatus).toBe("playing");
  expect(result.mode).toBe("HumanVsHuman");
});

it("should set gameStatus to setup for HumanVsAI", () => {
  const result = setMode("HumanVsAI");

  expect(result.gameStatus).toBe("setup");
  expect(result.mode).toBe("HumanVsAI");
});

it("should reset board, currentPlayer, roundStartingPlayer and clear aiSide", () => {
  const result = setMode("HumanVsHuman");

  expect(result.board).toEqual(Array(9).fill(undefined));
  expect(result.currentPlayer).toBe("X");
  expect(result.roundStartingPlayer).toBe("X");
  expect(result.aiSide).toBeUndefined();
});
