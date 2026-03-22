import type { Page } from "@playwright/test";

export class PagePlaywright {
  constructor(protected readonly page: Page) {}

  async isDarkModeEnabled(): Promise<boolean> {
    const htmlClasses = await this.page.locator("html").getAttribute("class");
    return htmlClasses?.includes("dark") ?? false;
  }
}
