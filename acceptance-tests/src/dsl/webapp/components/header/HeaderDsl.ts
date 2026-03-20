import { DslError } from "@/dsl/errors/DslError";
import { HeaderPlaywright } from "@/dsl/webapp/components/header/playwright/HeaderPlaywright";
import type { Page } from "@playwright/test";

export class HeaderDsl {
  private readonly headerPlaywright: HeaderPlaywright;

  constructor(page: Page) {
    this.headerPlaywright = new HeaderPlaywright(page);
  }

  async getTitle(): Promise<string> {
    try {
      return await this.headerPlaywright.getTitle();
    } catch (error) {
      throw new DslError("Failed to get header title", error);
    }
  }
}
