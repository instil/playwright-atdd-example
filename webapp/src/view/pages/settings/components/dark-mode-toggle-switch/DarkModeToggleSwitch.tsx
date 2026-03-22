import type { FC } from "react";
import { ToggleSwitch } from "@/view/pages/settings/components/dark-mode-toggle-switch/components/ToggleSwitch";
import { SETTINGS_PAGE_TEST_ID } from "@/view/pages/settings/constants/SettingsPageTestIds";
import { useSettingsStore } from "@/state/settings-store/SettingsStore";

export const DarkModeToggleSwitch: FC = () => {
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);
  const toggleDarkMode = useSettingsStore((state) => state.toggleDarkMode);

  return (
    <div className="flex items-center gap-4">
      <span className="font-semibold">Dark Mode</span>

      <ToggleSwitch
        data-testid={`${SETTINGS_PAGE_TEST_ID}__darkModeToggle`}
        checked={isDarkMode}
        onChange={toggleDarkMode}
      />
    </div>
  );
};
