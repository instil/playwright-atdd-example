import { create } from "zustand";
import type { GameMode } from "@/state/game-store/types/GameMode";
import type { GameState } from "@/state/game-store/types/GameState";
import type { Side } from "@shared/types/Side";
import { initialState } from "@/state/game-store/InitialState";
import { makeMove } from "@/state/game-store/actions/make-move/MakeMove";
import { resetGame } from "@/state/game-store/actions/ResetGame";
import { setAiSide } from "@/state/game-store/actions/SetAiSide";
import { setMode } from "@/state/game-store/actions/SetMode";
import { setPlayerName } from "@/state/game-store/actions/SetPlayerName";
import { startGame } from "@/state/game-store/actions/StartGame";
import { startNextRound } from "@/state/game-store/actions/StartNextRound";

interface GameActions {
  setMode: (mode: GameMode) => void;
  setAiSide: (side: Side) => void;
  startGame: () => void;
  makeMove: (index: number) => void;
  startNextRound: () => void;
  setPlayerName: (side: Side, name: string) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState & GameActions>((set) => ({
  ...initialState,

  setMode: (mode) => set(setMode(mode)),
  setAiSide: (side) => set(setAiSide(side)),
  startGame: () => set(startGame()),
  makeMove: (index) => set((state) => makeMove(state, index)),
  startNextRound: () => set((state) => startNextRound(state)),
  setPlayerName: (side, name) =>
    set((state) => setPlayerName(state, side, name)),
  resetGame: () => set(resetGame()),
}));
