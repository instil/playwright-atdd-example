import type { Locator } from "@playwright/test";

export class ExitButtonPlaywright {
  constructor(private readonly button: Locator) {}

  async click(): Promise<void> {
    await this.button.click();
  }
}
