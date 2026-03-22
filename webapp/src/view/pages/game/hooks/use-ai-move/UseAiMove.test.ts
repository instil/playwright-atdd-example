// @vitest-environment jsdom
import { it, expect, vi, beforeEach } from "vitest";
import { buildEmptyBoard } from "@/shared/testing/builders/BuildBoard";
import { renderHook } from "@testing-library/react";
import { useAiMove } from "@/view/pages/game/hooks/use-ai-move/UseAiMove";
import { useGameStore } from "@/state/game-store/GameStore";
import { getBestMove } from "@/view/pages/game/hooks/use-ai-move/ai/GetBestMove";

vi.mock("@/view/pages/game/hooks/use-ai-move/ai/GetBestMove");

const getBestMoveMock = vi.mocked(getBestMove);

beforeEach(() => {
  useGameStore.getState().resetGame();
});

it("should not call getBestMove when game is not playing", () => {
  useGameStore.setState({ gameStatus: "setup", mode: "HumanVsAI" });

  renderHook(() => useAiMove());

  expect(getBestMoveMock).not.toHaveBeenCalled();
});

it("should not call getBestMove when mode is not HumanVsAI", () => {
  useGameStore.setState({ gameStatus: "playing", mode: "HumanVsHuman" });

  renderHook(() => useAiMove());

  expect(getBestMoveMock).not.toHaveBeenCalled();
});

it("should not call getBestMove when it is not the AI's turn", () => {
  useGameStore.setState({
    gameStatus: "playing",
    mode: "HumanVsAI",
    currentPlayer: "X",
    aiSide: "O",
  });

  renderHook(() => useAiMove());

  expect(getBestMoveMock).not.toHaveBeenCalled();
});

it("should call getBestMove and make the move when it is the AI's turn", () => {
  const board = buildEmptyBoard();
  getBestMoveMock.mockReturnValue(4);

  useGameStore.setState({
    gameStatus: "playing",
    mode: "HumanVsAI",
    currentPlayer: "X",
    aiSide: "X",
    board,
  });

  renderHook(() => useAiMove());

  expect(getBestMoveMock).toHaveBeenCalledWith(board, "X");
  expect(useGameStore.getState().board[4]).toBe("X");
});
