import type { Locator } from "@playwright/test";

export class GameModeButtonPlaywright {
  constructor(private readonly button: Locator) {}

  async click(): Promise<void> {
    await this.button.click();
  }

  async isVisible(): Promise<boolean> {
    try {
      await this.button.waitFor({ state: "visible", timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}
