import type { Page } from "@playwright/test";

export class TicTacToePlaywright {
  constructor(private readonly page: Page) {}

  async goTo(): Promise<void> {
    await this.page.goto(process.env.BASE_URL ?? "http://localhost:5173");
  }
}
