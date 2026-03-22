import {
  given,
  setup,
  then,
  when,
  expect,
} from "@/playwright-alias/PlaywrightAlias";

// https://instil.atlassian.net/browse/TIC-0
given("a Player wants to go back to a previous screen", () => {
  when("a Player is on the game screen", () => {
    setup(async ({ ticTacToe }) => {
      await ticTacToe.home.humanVsHumanButton.click();
    });

    when("they click the back button", () => {
      setup(async ({ ticTacToe }) => {
        await ticTacToe.game.exitButton.click();
      });

      then("they are returned to the home screen", async ({ ticTacToe }) => {
        expect(await ticTacToe.home.humanVsHumanButton.isVisible()).toBe(true);
      });
    });
  });

  when("a Player is on the human vs ai game screen", () => {
    setup(async ({ ticTacToe }) => {
      await ticTacToe.home.humanVsAiButton.click();
    });

    when("they click the back button", () => {
      setup(async ({ ticTacToe }) => {
        await ticTacToe.game.exitButton.click();
      });

      then("they are returned to the home screen", async ({ ticTacToe }) => {
        expect(await ticTacToe.home.humanVsAiButton.isVisible()).toBe(true);
      });
    });
  });

  when("a Player is on the settings screen", () => {
    setup(async ({ ticTacToe }) => {
      await ticTacToe.home.clickSettingsLink();
    });

    when("they click the back button", () => {
      setup(async ({ ticTacToe }) => {
        await ticTacToe.settings.exitButton.click();
      });

      then("they are returned to the home screen", async ({ ticTacToe }) => {
        expect(await ticTacToe.home.humanVsHumanButton.isVisible()).toBe(true);
      });
    });
  });
});
