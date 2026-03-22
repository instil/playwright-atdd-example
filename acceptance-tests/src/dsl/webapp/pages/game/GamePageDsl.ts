import { DslError } from "@/dsl/errors/DslError";
import { ExitButtonDsl } from "@/dsl/webapp/pages/components/exit-button/ExitButtonDsl";
import { PageDsl } from "@/dsl/webapp/pages/shared/PageDsl";
import { GameBoardDsl } from "@/dsl/webapp/pages/game/components/game-board/GameBoardDsl";
import { GameOverDsl } from "@/dsl/webapp/pages/game/components/game-over/GameOverDsl";
import { ScoreboardDsl } from "@/dsl/webapp/pages/game/components/scoreboard/ScoreboardDsl";
import { SideSelectorDsl } from "@/dsl/webapp/pages/game/components/side-selector/SideSelectorDsl";
import { GamePagePlaywright } from "@/dsl/webapp/pages/game/playwright/GamePagePlaywright";
import type { Page } from "@playwright/test";

export class GamePageDsl extends PageDsl {
  private readonly playwright: GamePagePlaywright;

  readonly board: GameBoardDsl;
  readonly exitButton: ExitButtonDsl;
  readonly gameOver: GameOverDsl;
  readonly scoreboard: ScoreboardDsl;
  readonly sideSelector: SideSelectorDsl;

  constructor(page: Page) {
    super(page);

    this.playwright = new GamePagePlaywright(page);

    this.board = new GameBoardDsl(page);
    this.exitButton = new ExitButtonDsl(page, "gamePage__backButton");
    this.gameOver = new GameOverDsl(page);
    this.scoreboard = new ScoreboardDsl(page);
    this.sideSelector = new SideSelectorDsl(page);
  }

  async isVisible(): Promise<boolean> {
    try {
      return await this.playwright.isVisible();
    } catch (error) {
      throw new DslError("Failed to check game page visibility", error);
    }
  }
}
