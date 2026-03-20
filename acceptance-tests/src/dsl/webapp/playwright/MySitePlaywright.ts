import type { Page } from "@playwright/test";

export class MySitePlaywright {
  constructor(private readonly page: Page) {}

  async goTo(): Promise<void> {
    await this.page.goto("http://localhost:5173");
  }
}
