import { PagePlaywright } from "@/dsl/webapp/pages/shared/playwright/PagePlaywright";
import type { Locator, Page } from "@playwright/test";

export class SettingsPagePlaywright extends PagePlaywright {
  private readonly container: Locator;

  constructor(page: Page) {
    super(page);

    this.container = page.getByTestId("settingsPage");
  }

  async isVisible(): Promise<boolean> {
    try {
      await this.container.waitFor({ state: "visible", timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}
