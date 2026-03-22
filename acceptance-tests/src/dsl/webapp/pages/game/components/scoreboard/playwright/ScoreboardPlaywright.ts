import type { Locator, Page } from "@playwright/test";

export class ScoreboardPlaywright {
  private readonly container: Locator;
  private readonly xScore: Locator;
  private readonly oScore: Locator;
  private readonly drawScore: Locator;

  constructor(page: Page) {
    this.container = page.getByTestId("gamePage__scoreboard");
    this.xScore = this.container.getByTestId("gamePage__scoreboard__xScore");
    this.oScore = this.container.getByTestId("gamePage__scoreboard__oScore");
    this.drawScore = this.container.getByTestId(
      "gamePage__scoreboard__drawScore",
    );
  }

  async getXScore(): Promise<number> {
    const text = (await this.xScore.textContent()) ?? "0";
    return parseInt(text, 10);
  }

  async getOScore(): Promise<number> {
    const text = (await this.oScore.textContent()) ?? "0";
    return parseInt(text, 10);
  }

  async getDrawScore(): Promise<number> {
    const text = (await this.drawScore.textContent()) ?? "0";
    return parseInt(text, 10);
  }
}
