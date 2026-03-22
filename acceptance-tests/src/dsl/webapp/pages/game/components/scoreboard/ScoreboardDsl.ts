import { DslError } from "@/dsl/errors/DslError";
import { PlayerDsl } from "@/dsl/webapp/pages/game/components/scoreboard/player/PlayerDsl";
import { ScoreboardPlaywright } from "@/dsl/webapp/pages/game/components/scoreboard/playwright/ScoreboardPlaywright";
import type { Page } from "@playwright/test";

export class ScoreboardDsl {
  private readonly scoreboardPlaywright: ScoreboardPlaywright;

  readonly x: PlayerDsl;
  readonly o: PlayerDsl;

  constructor(page: Page) {
    this.scoreboardPlaywright = new ScoreboardPlaywright(page);

    this.x = new PlayerDsl(page, "x");
    this.o = new PlayerDsl(page, "o");
  }

  async getDrawScore(): Promise<number> {
    try {
      return await this.scoreboardPlaywright.getDrawScore();
    } catch (error) {
      throw new DslError("Failed to get draw score", error);
    }
  }
}
