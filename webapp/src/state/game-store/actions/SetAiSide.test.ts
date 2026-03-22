import { it, expect } from "vitest";
import { setAiSide } from "@/state/game-store/actions/SetAiSide";

it("should set the AI side and change gameStatus to playing", () => {
  const result = setAiSide("O");

  expect(result.aiSide).toBe("O");
  expect(result.gameStatus).toBe("playing");
});
