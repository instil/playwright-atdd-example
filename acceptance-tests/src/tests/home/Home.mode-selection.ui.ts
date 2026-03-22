import {
  given,
  setup,
  then,
  when,
  expect,
} from "@/playwright-alias/PlaywrightAlias";

// https://instil.atlassian.net/browse/TIC-1
given("a Player wants to start a game", () => {
  when("they see the home page", () => {
    then("the Human vs Human button is visible", async ({ ticTacToe }) => {
      expect(await ticTacToe.home.humanVsHumanButton.isVisible()).toBe(true);
    });

    then("the Human vs AI button is visible", async ({ ticTacToe }) => {
      expect(await ticTacToe.home.humanVsAiButton.isVisible()).toBe(true);
    });
  });

  when("they select Human vs Human", () => {
    setup(async ({ ticTacToe }) => {
      await ticTacToe.home.humanVsHumanButton.click();
    });

    then("they are taken to the game page", async ({ ticTacToe }) => {
      expect(await ticTacToe.game.isVisible()).toBe(true);
    });
  });

  when("they select Human vs AI", () => {
    setup(async ({ ticTacToe }) => {
      await ticTacToe.home.humanVsAiButton.click();
    });

    then("they are taken to the game page", async ({ ticTacToe }) => {
      expect(await ticTacToe.game.isVisible()).toBe(true);
    });
  });
});
