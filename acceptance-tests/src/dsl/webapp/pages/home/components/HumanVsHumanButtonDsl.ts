import { GameModeButtonDsl } from "@/dsl/webapp/pages/home/components/shared/GameModeButtonDsl";
import type { Page } from "@playwright/test";

export class HumanVsHumanButtonDsl extends GameModeButtonDsl {
  constructor(page: Page) {
    super(page, "homePage__humanVsHumanButton");
  }
}
