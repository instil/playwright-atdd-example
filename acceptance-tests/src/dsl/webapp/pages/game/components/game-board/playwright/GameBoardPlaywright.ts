import type { Locator, Page } from "@playwright/test";
import type { Side } from "@shared/types/Side";
import { waitFor } from "@/utils/WaitFor";

export class GameBoardPlaywright {
  private readonly container: Locator;
  private readonly currentPlayerIndicator: Locator;

  constructor(page: Page) {
    this.container = page.getByTestId("gamePage__gameBoard");
    this.currentPlayerIndicator = page.getByTestId(
      "gamePage__gameBoard__currentPlayer",
    );
  }

  private cellLocator(index: number): Locator {
    return this.container.getByTestId(`gamePage__gameBoard__cell-${index}`);
  }

  async getCellMark(index: number): Promise<string> {
    return (await this.cellLocator(index).textContent()) ?? "";
  }

  async clickCell(index: number): Promise<void> {
    await this.cellLocator(index).click();
  }

  async isCellDisabled(index: number): Promise<boolean> {
    return (await this.cellLocator(index).getAttribute("disabled")) !== null;
  }

  async getCurrentPlayerText(): Promise<string> {
    return (await this.currentPlayerIndicator.textContent()) ?? "";
  }

  async isBoardVisible(): Promise<boolean> {
    return await this.container.isVisible();
  }

  async getCellCount(): Promise<number> {
    await this.container.waitFor({ state: "visible", timeout: 5000 });
    return await this.container
      .getByTestId(/gamePage__gameBoard__cell-/)
      .count();
  }

  async waitForAiResponse(
    humanSide: Side,
    clickedCellIndex: number,
  ): Promise<void> {
    await waitFor(
      async () => {
        if (!(await this.isBoardVisible())) return;

        const mark = await this.cellLocator(clickedCellIndex)
          .textContent({ timeout: 0 })
          .catch(() => null);
        if (mark === humanSide) return;

        throw new Error(
          `Cell ${clickedCellIndex} not yet showing ${humanSide}`,
        );
      },
      1000,
      50,
    );

    await waitFor(
      async () => {
        const isVisible = await this.isBoardVisible();
        if (!isVisible) return;

        const text = await this.getCurrentPlayerText();
        if (text.includes(humanSide)) return;

        throw new Error("Waiting for AI response");
      },
      1000,
      50,
    );
  }
}
