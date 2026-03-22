import { DslError } from "@/dsl/errors/DslError";
import { ExitButtonPlaywright } from "@/dsl/webapp/pages/components/exit-button/playwright/ExitButtonPlaywright";
import type { Locator } from "@playwright/test";

export class ExitButtonDsl {
  private readonly exitButtonPlaywright: ExitButtonPlaywright;

  constructor(button: Locator) {
    this.exitButtonPlaywright = new ExitButtonPlaywright(button);
  }

  async click(): Promise<void> {
    try {
      await this.exitButtonPlaywright.click();
    } catch (error) {
      throw new DslError("Failed to click exit button", error);
    }
  }
}
