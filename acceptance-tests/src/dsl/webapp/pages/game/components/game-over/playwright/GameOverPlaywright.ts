import type { Locator, Page } from "@playwright/test";

export class GameOverPlaywright {
  private readonly container: Locator;
  private readonly message: Locator;
  private readonly playAgainButton: Locator;

  constructor(page: Page) {
    this.container = page.getByTestId("gamePage__gameOver");
    this.message = this.container.getByTestId("gamePage__gameOver__message");
    this.playAgainButton = this.container.getByTestId(
      "gamePage__gameOver__playAgainButton",
    );
  }

  async isVisible(): Promise<boolean> {
    return await this.container.isVisible();
  }

  async getMessage(): Promise<string> {
    await this.message.waitFor({ state: "visible", timeout: 3000 });
    return (await this.message.textContent()) ?? "";
  }

  async clickPlayAgain(): Promise<void> {
    await this.playAgainButton.click();
  }
}
