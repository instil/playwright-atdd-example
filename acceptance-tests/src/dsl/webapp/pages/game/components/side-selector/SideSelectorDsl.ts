import { DslError } from "@/dsl/errors/DslError";
import { SideSelectorPlaywright } from "@/dsl/webapp/pages/game/components/side-selector/playwright/SideSelectorPlaywright";
import type { Page } from "@playwright/test";

export class SideSelectorDsl {
  private readonly sideSelectorPlaywright: SideSelectorPlaywright;

  constructor(page: Page) {
    this.sideSelectorPlaywright = new SideSelectorPlaywright(page);
  }

  async isVisible(): Promise<boolean> {
    try {
      return await this.sideSelectorPlaywright.isVisible();
    } catch (error) {
      throw new DslError("Failed to check side selector visibility", error);
    }
  }

  async pickX(): Promise<void> {
    try {
      await this.sideSelectorPlaywright.clickPickX();
    } catch (error) {
      throw new DslError("Failed to pick X side", error);
    }
  }

  async pickO(): Promise<void> {
    try {
      await this.sideSelectorPlaywright.clickPickO();
    } catch (error) {
      throw new DslError("Failed to pick O side", error);
    }
  }
}
