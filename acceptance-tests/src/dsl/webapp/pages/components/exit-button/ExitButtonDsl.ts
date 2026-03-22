import { DslError } from "@/dsl/errors/DslError";
import { ExitButtonPlaywright } from "@/dsl/webapp/pages/components/exit-button/playwright/ExitButtonPlaywright";
import type { Page } from "@playwright/test";

export class ExitButtonDsl {
  private readonly exitButtonPlaywright: ExitButtonPlaywright;

  constructor(page: Page, testId: string) {
    this.exitButtonPlaywright = new ExitButtonPlaywright(page, testId);
  }

  async click(): Promise<void> {
    try {
      await this.exitButtonPlaywright.click();
    } catch (error) {
      throw new DslError("Failed to click exit button", error);
    }
  }
}
