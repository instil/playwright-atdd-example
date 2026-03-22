import { useEffect, type FC } from "react";
import { useSettingsStore } from "@/state/settings-store/SettingsStore";
import { BackButton } from "@/view/components/BackButton";
import { DarkModeToggleSwitch } from "@/view/pages/settings/components/dark-mode-toggle-switch/DarkModeToggleSwitch";
import { SettingsHeading } from "@/view/pages/settings/components/SettingsHeading";
import { SETTINGS_PAGE_TEST_ID } from "@/view/pages/settings/constants/SettingsPageTestIds";

export const SettingsPage: FC = () => {
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div
      data-testid={SETTINGS_PAGE_TEST_ID}
      className="relative flex flex-col items-center justify-center gap-8 p-8 py-16"
    >
      <BackButton testId={`${SETTINGS_PAGE_TEST_ID}__backButton`} />
      <SettingsHeading />

      <DarkModeToggleSwitch />
    </div>
  );
};
