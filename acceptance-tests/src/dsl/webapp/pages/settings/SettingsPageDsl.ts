import { DslError } from "@/dsl/errors/DslError";
import { ExitButtonDsl } from "@/dsl/webapp/pages/components/exit-button/ExitButtonDsl";
import { PageDsl } from "@/dsl/webapp/pages/shared/PageDsl";
import { DarkModeToggleButtonDsl } from "@/dsl/webapp/pages/settings/components/dark-mode-toggle-button/DarkModeToggleButtonDsl";
import { SettingsPagePlaywright } from "@/dsl/webapp/pages/settings/playwright/SettingsPagePlaywright";
import type { Page } from "@playwright/test";

export class SettingsPageDsl extends PageDsl {
  private readonly settingsPagePlaywright: SettingsPagePlaywright;

  readonly darkModeToggle: DarkModeToggleButtonDsl;
  readonly exitButton: ExitButtonDsl;

  constructor(page: Page) {
    super(page);

    this.settingsPagePlaywright = new SettingsPagePlaywright(page);

    this.darkModeToggle = new DarkModeToggleButtonDsl(page);
    this.exitButton = new ExitButtonDsl(page, "settingsPage__backButton");
  }

  async isVisible(): Promise<boolean> {
    try {
      return await this.settingsPagePlaywright.isVisible();
    } catch (error) {
      throw new DslError("Failed to check settings page visibility", error);
    }
  }
}
