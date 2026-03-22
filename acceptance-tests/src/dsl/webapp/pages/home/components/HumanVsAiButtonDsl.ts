import { GameModeButtonDsl } from "@/dsl/webapp/pages/home/components/shared/GameModeButtonDsl";
import type { Page } from "@playwright/test";

export class HumanVsAiButtonDsl extends GameModeButtonDsl {
  constructor(page: Page) {
    super(page, "homePage__humanVsAiButton");
  }
}
