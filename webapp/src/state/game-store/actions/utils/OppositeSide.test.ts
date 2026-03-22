import { it, expect } from "vitest";
import { oppositeSide } from "@/state/game-store/actions/utils/OppositeSide";

it("should return O when given X", () => {
  expect(oppositeSide("X")).toBe("O");
});

it("should return X when given O", () => {
  expect(oppositeSide("O")).toBe("X");
});
