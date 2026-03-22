import { PagePlaywright } from "@/dsl/webapp/pages/shared/playwright/PagePlaywright";
import type { Locator, Page } from "@playwright/test";

export class HomePagePlaywright extends PagePlaywright {
  private readonly title: Locator;
  private readonly settingsLink: Locator;

  constructor(page: Page) {
    super(page);

    this.title = page.getByTestId("homePage__title");
    this.settingsLink = page.getByTestId("homePage__settingsLink");
  }

  async getTitle(): Promise<string> {
    return (await this.title.textContent()) ?? "";
  }

  async clickSettingsLink(): Promise<void> {
    await this.settingsLink.click();
  }
}
