import type { Page } from "@playwright/test";

export class HeaderPlaywright {
  public readonly container: ReturnType<Page["locator"]>;
  public readonly title: ReturnType<Page["locator"]>;

  constructor(page: Page) {
    this.container = page.locator("header");
    this.title = this.container.getByTestId("header__title");
  }

  async getTitle(): Promise<string> {
    return (await this.title.textContent()) ?? "";
  }
}
