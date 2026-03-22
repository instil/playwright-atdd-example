import { DslError } from "@/dsl/errors/DslError";
import { PagePlaywright } from "@/dsl/webapp/pages/shared/playwright/PagePlaywright";
import type { Page } from "@playwright/test";

export abstract class PageDsl {
  private readonly pagePlaywright: PagePlaywright;

  constructor(page: Page) {
    this.pagePlaywright = new PagePlaywright(page);
  }

  async isDarkModeEnabled(): Promise<boolean> {
    try {
      return await this.pagePlaywright.isDarkModeEnabled();
    } catch (error) {
      throw new DslError("Failed to check dark mode state", error);
    }
  }
}
