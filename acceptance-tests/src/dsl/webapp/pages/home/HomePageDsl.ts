import { DslError } from "@/dsl/errors/DslError";
import { HumanVsAiButtonDsl } from "@/dsl/webapp/pages/home/components/HumanVsAiButtonDsl";
import { HumanVsHumanButtonDsl } from "@/dsl/webapp/pages/home/components/HumanVsHumanButtonDsl";
import { PageDsl } from "@/dsl/webapp/pages/shared/PageDsl";
import { HomePagePlaywright } from "@/dsl/webapp/pages/home/playwright/HomePagePlaywright";
import type { Page } from "@playwright/test";

export class HomePageDsl extends PageDsl {
  private readonly homePagePlaywright: HomePagePlaywright;

  readonly humanVsHumanButton: HumanVsHumanButtonDsl;
  readonly humanVsAiButton: HumanVsAiButtonDsl;

  constructor(page: Page) {
    super(page);

    this.homePagePlaywright = new HomePagePlaywright(page);

    this.humanVsHumanButton = new HumanVsHumanButtonDsl(page);
    this.humanVsAiButton = new HumanVsAiButtonDsl(page);
  }

  async getTitle(): Promise<string> {
    try {
      return await this.homePagePlaywright.getTitle();
    } catch (error) {
      throw new DslError("Failed to get home page title", error);
    }
  }

  async clickSettingsLink(): Promise<void> {
    try {
      await this.homePagePlaywright.clickSettingsLink();
    } catch (error) {
      throw new DslError("Failed to click settings link", error);
    }
  }
}
