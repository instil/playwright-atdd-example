import { DslError } from "@/dsl/errors/DslError";
import { PlayerPlaywright } from "@/dsl/webapp/pages/game/components/scoreboard/player/playwright/PlayerPlaywright";
import type { Page } from "@playwright/test";

export class PlayerDsl {
  private readonly playwright: PlayerPlaywright;

  constructor(page: Page, player: "x" | "o") {
    this.playwright = new PlayerPlaywright(page, player);
  }

  async getName(): Promise<string> {
    try {
      return await this.playwright.getName();
    } catch (error) {
      throw new DslError("Failed to get player name", error);
    }
  }

  async getScore(): Promise<number> {
    try {
      return await this.playwright.getScore();
    } catch (error) {
      throw new DslError("Failed to get player score", error);
    }
  }

  async editName(name: string): Promise<void> {
    try {
      await this.playwright.clickNameToEdit();
      await this.playwright.typeName(name);
    } catch (error) {
      throw new DslError("Failed to edit player name", error);
    }
  }
}
