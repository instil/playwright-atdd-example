import { given, then, when, expect } from "@/playwright-alias/PlaywrightAlias";

// https://instil.atlassian.net/browse/TIC-0
given("a Player wants to go to Tic Tac Toe", () => {
  when("they go to Tic Tac Toe", () => {
    then("the title should be visible", async ({ ticTacToe }) => {
      expect(await ticTacToe.home.getTitle()).toContain("Tic Tac Toe");
    });
  });
});
