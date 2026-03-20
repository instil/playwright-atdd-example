import { DslError } from "@/dsl/errors/DslError";
import { HeaderDsl } from "@/dsl/webapp/components/header/HeaderDsl";
import { MySitePlaywright } from "@/dsl/webapp/playwright/MySitePlaywright";
import type { BrowserContext, Page } from "@playwright/test";

export class MySite {
  private readonly mySitePlaywright: MySitePlaywright;
  readonly header: HeaderDsl;

  constructor(_context: BrowserContext, page: Page) {
    this.mySitePlaywright = new MySitePlaywright(page);
    this.header = new HeaderDsl(page);
  }

  async goTo(): Promise<void> {
    try {
      await this.mySitePlaywright.goTo();
    } catch (error) {
      throw new DslError("Failed to go to MySite", error);
    }
  }
}
