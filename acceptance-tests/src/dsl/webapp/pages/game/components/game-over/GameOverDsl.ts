import { DslError } from "@/dsl/errors/DslError";
import { GameOverPlaywright } from "@/dsl/webapp/pages/game/components/game-over/playwright/GameOverPlaywright";
import type { Page } from "@playwright/test";

export class GameOverDsl {
  private readonly gameOverPlaywright: GameOverPlaywright;

  constructor(page: Page) {
    this.gameOverPlaywright = new GameOverPlaywright(page);
  }

  async isVisible(): Promise<boolean> {
    try {
      return await this.gameOverPlaywright.isVisible();
    } catch (error) {
      throw new DslError("Failed to check game over visibility", error);
    }
  }

  async getMessage(): Promise<string> {
    try {
      return await this.gameOverPlaywright.getMessage();
    } catch (error) {
      throw new DslError("Failed to get game over message", error);
    }
  }

  async clickPlayAgain(): Promise<void> {
    try {
      await this.gameOverPlaywright.clickPlayAgain();
    } catch (error) {
      throw new DslError("Failed to click play again", error);
    }
  }
}
