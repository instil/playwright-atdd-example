import { DslError } from "@/dsl/errors/DslError";
import { HomePageDsl } from "@/dsl/webapp/pages/home/HomePageDsl";
import { GamePageDsl } from "@/dsl/webapp/pages/game/GamePageDsl";
import { SettingsPageDsl } from "@/dsl/webapp/pages/settings/SettingsPageDsl";
import { TicTacToePlaywright } from "@/dsl/webapp/playwright/TicTacToePlaywright";
import type { Page } from "@playwright/test";

export class TicTacToe {
  private readonly ticTacToePlaywright: TicTacToePlaywright;

  readonly home: HomePageDsl;
  readonly game: GamePageDsl;
  readonly settings: SettingsPageDsl;

  constructor(page: Page) {
    this.ticTacToePlaywright = new TicTacToePlaywright(page);

    this.home = new HomePageDsl(page);
    this.game = new GamePageDsl(page);
    this.settings = new SettingsPageDsl(page);
  }

  async goTo(): Promise<void> {
    try {
      await this.ticTacToePlaywright.goTo();
    } catch (error) {
      throw new DslError("Failed to go to Tic Tac Toe page", error);
    }
  }
}
