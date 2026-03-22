import { DslError } from "@/dsl/errors/DslError";
import { GameModeButtonPlaywright } from "@/dsl/webapp/pages/home/components/shared/playwright/GameModeButtonPlaywright";
import type { Page } from "@playwright/test";

export abstract class GameModeButtonDsl {
  private readonly playwright: GameModeButtonPlaywright;

  constructor(page: Page, testId: string) {
    this.playwright = new GameModeButtonPlaywright(page.getByTestId(testId));
  }

  async click(): Promise<void> {
    try {
      await this.playwright.click();
    } catch (error) {
      throw new DslError("Failed to click game mode button", error);
    }
  }

  async isVisible(): Promise<boolean> {
    try {
      return await this.playwright.isVisible();
    } catch (error) {
      throw new DslError("Failed to check game mode button visibility", error);
    }
  }
}
