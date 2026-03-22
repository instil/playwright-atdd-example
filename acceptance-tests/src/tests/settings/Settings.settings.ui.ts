import {
  given,
  setup,
  then,
  when,
  expect,
} from "@/playwright-alias/PlaywrightAlias";

// https://instil.atlassian.net/browse/TIC-7
given("a Player navigates to the Settings page", () => {
  setup(async ({ ticTacToe }) => {
    await ticTacToe.home.clickSettingsLink();
  });

  then("the settings page is visible", async ({ ticTacToe }) => {
    expect(await ticTacToe.settings.isVisible()).toBe(true);
  });

  when("they toggle dark mode on", () => {
    setup(async ({ ticTacToe }) => {
      await ticTacToe.settings.darkModeToggle.click();
    });

    then("the toggle shows as checked", async ({ ticTacToe }) => {
      expect(await ticTacToe.settings.darkModeToggle.isChecked()).toBe(true);
    });

    then("dark mode is enabled", async ({ ticTacToe }) => {
      expect(await ticTacToe.settings.isDarkModeEnabled()).toBe(true);
    });

    when("they navigate back to the home page", () => {
      setup(async ({ ticTacToe }) => {
        await ticTacToe.settings.exitButton.click();
      });

      then("dark mode is applied to the home page", async ({ ticTacToe }) => {
        expect(await ticTacToe.home.isDarkModeEnabled()).toBe(true);
      });
    });

    when("they navigate to the game board", () => {
      setup(async ({ ticTacToe }) => {
        await ticTacToe.settings.exitButton.click();
        await ticTacToe.home.humanVsHumanButton.click();
      });

      then("dark mode is applied to the game board", async ({ ticTacToe }) => {
        expect(await ticTacToe.game.isDarkModeEnabled()).toBe(true);
      });
    });
  });

  when("they click the back button", () => {
    setup(async ({ ticTacToe }) => {
      await ticTacToe.settings.exitButton.click();
    });

    then("the home page is visible", async ({ ticTacToe }) => {
      expect(await ticTacToe.home.humanVsHumanButton.isVisible()).toBe(true);
    });
  });

  when("they toggle dark mode off after enabling it", () => {
    setup(async ({ ticTacToe }) => {
      await ticTacToe.settings.darkModeToggle.click();
      await ticTacToe.settings.darkModeToggle.click();
    });

    then("the toggle shows as unchecked", async ({ ticTacToe }) => {
      expect(await ticTacToe.settings.darkModeToggle.isChecked()).toBe(false);
    });

    then("dark mode is disabled", async ({ ticTacToe }) => {
      expect(await ticTacToe.settings.isDarkModeEnabled()).toBe(false);
    });

    when("they navigate back to the home page", () => {
      setup(async ({ ticTacToe }) => {
        await ticTacToe.settings.exitButton.click();
      });

      then(
        "dark mode is not applied to the home page",
        async ({ ticTacToe }) => {
          expect(await ticTacToe.home.isDarkModeEnabled()).toBe(false);
        },
      );
    });

    when("they navigate to the game board", () => {
      setup(async ({ ticTacToe }) => {
        await ticTacToe.settings.exitButton.click();
        await ticTacToe.home.humanVsHumanButton.click();
      });

      then(
        "dark mode is not applied to the game board",
        async ({ ticTacToe }) => {
          expect(await ticTacToe.game.isDarkModeEnabled()).toBe(false);
        },
      );
    });
  });
});
