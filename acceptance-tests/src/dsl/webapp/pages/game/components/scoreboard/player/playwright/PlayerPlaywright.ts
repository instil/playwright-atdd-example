import type { Locator, Page } from "@playwright/test";

export class PlayerPlaywright {
  private readonly nameDisplay: Locator;
  private readonly nameInput: Locator;
  private readonly score: Locator;

  constructor(page: Page, player: "x" | "o") {
    this.nameDisplay = page.getByTestId(`gamePage__scoreboard__${player}Name`);
    this.nameInput = page.getByTestId(
      `gamePage__scoreboard__${player}NameInput`,
    );
    this.score = page.getByTestId(`gamePage__scoreboard__${player}Score`);
  }

  async getName(): Promise<string> {
    return (await this.nameDisplay.textContent()) ?? "";
  }

  async getScore(): Promise<number> {
    const text = (await this.score.textContent()) ?? "0";
    return parseInt(text, 10);
  }

  async clickNameToEdit(): Promise<void> {
    await this.nameDisplay.click();
  }

  async typeName(name: string): Promise<void> {
    await this.nameInput.clear();
    await this.nameInput.type(name);
    await this.nameInput.blur();
  }
}
