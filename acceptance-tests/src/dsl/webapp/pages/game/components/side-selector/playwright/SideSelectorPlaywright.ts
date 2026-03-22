import type { Locator, Page } from "@playwright/test";

export class SideSelectorPlaywright {
  private readonly container: Locator;
  private readonly pickXButton: Locator;
  private readonly pickOButton: Locator;

  constructor(page: Page) {
    this.container = page.getByTestId("gamePage__sideSelector");
    this.pickXButton = this.container.getByTestId(
      "gamePage__sideSelector__pickXButton",
    );
    this.pickOButton = this.container.getByTestId(
      "gamePage__sideSelector__pickOButton",
    );
  }

  async isVisible(): Promise<boolean> {
    try {
      await this.container.waitFor({ state: "visible", timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async clickPickX(): Promise<void> {
    await this.pickXButton.click();
  }

  async clickPickO(): Promise<void> {
    await this.pickOButton.click();
  }
}
