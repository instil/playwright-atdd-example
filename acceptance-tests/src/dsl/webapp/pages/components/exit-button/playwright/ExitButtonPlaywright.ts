import type { Page } from "@playwright/test";

export class ExitButtonPlaywright {
  private readonly button;

  constructor(page: Page, testId: string) {
    this.button = page.getByTestId(testId);
  }

  async click(): Promise<void> {
    await this.button.click();
  }
}
