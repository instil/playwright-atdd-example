import { create } from "zustand";
import type { SettingsState } from "@/state/settings-store/types/SettingsState";
import { toggleDarkMode } from "@/state/settings-store/actions/ToggleDarkMode";

interface SettingsActions {
  toggleDarkMode: () => void;
}

const initialState: SettingsState = {
  isDarkMode: false,
};

export const useSettingsStore = create<SettingsState & SettingsActions>(
  (set) => ({
    ...initialState,

    toggleDarkMode: () => set((state) => toggleDarkMode(state)),
  }),
);
