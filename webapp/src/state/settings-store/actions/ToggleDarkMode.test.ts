import { it, expect } from "vitest";
import { toggleDarkMode } from "@/state/settings-store/actions/ToggleDarkMode";

it("should enable dark mode when it is off", () => {
  const result = toggleDarkMode({ isDarkMode: false });

  expect(result.isDarkMode).toBe(true);
});

it("should disable dark mode when it is on", () => {
  const result = toggleDarkMode({ isDarkMode: true });

  expect(result.isDarkMode).toBe(false);
});
