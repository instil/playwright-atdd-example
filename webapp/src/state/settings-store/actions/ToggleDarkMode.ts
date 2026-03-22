import type { SettingsState } from "@/state/settings-store/types/SettingsState";

export function toggleDarkMode(state: SettingsState): Partial<SettingsState> {
  return { isDarkMode: !state.isDarkMode };
}
