import { DslError } from "@/dsl/errors/DslError";
import { DarkModeToggleButtonPlaywright } from "@/dsl/webapp/pages/settings/components/dark-mode-toggle-button/playwright/DarkModeToggleButtonPlaywright";
import type { Page } from "@playwright/test";

export class DarkModeToggleButtonDsl {
  private readonly darkModeToggleButtonPlaywright: DarkModeToggleButtonPlaywright;

  constructor(page: Page) {
    this.darkModeToggleButtonPlaywright = new DarkModeToggleButtonPlaywright(
      page,
    );
  }

  async click(): Promise<void> {
    try {
      await this.darkModeToggleButtonPlaywright.click();
    } catch (error) {
      throw new DslError("Failed to click dark mode toggle", error);
    }
  }

  async isChecked(): Promise<boolean> {
    try {
      return await this.darkModeToggleButtonPlaywright.isChecked();
    } catch (error) {
      throw new DslError("Failed to check toggle checked state", error);
    }
  }
}
