import type { Locator, Page } from "@playwright/test";

export class DarkModeToggleButtonPlaywright {
  private readonly darkModeToggle: Locator;

  constructor(page: Page) {
    const container = page.getByTestId("settingsPage");
    this.darkModeToggle = container.getByTestId("settingsPage__darkModeToggle");
  }

  async click(): Promise<void> {
    await this.darkModeToggle.click();
  }

  async isChecked(): Promise<boolean> {
    const checked = await this.darkModeToggle.getAttribute("aria-checked");
    return checked === "true";
  }
}
