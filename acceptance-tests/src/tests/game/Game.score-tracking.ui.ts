import {
  given,
  setup,
  then,
  when,
  expect,
} from "@/playwright-alias/PlaywrightAlias";

// https://instil.atlassian.net/browse/TIC-4
given("a Player has just won a round of Human vs Human", () => {
  setup(async ({ ticTacToe }) => {
    await ticTacToe.home.humanVsHumanButton.click();
    await ticTacToe.game.board.playMoves(
      "Top Left",
      "Middle Left",
      "Top Center",
      "Center",
      "Top Right",
    );
  });

  when("the game over screen is shown", () => {
    then("the X score increments to 1", async ({ ticTacToe }) => {
      expect(await ticTacToe.game.scoreboard.x.getScore()).toBe(1);
    });

    then("the O score remains 0", async ({ ticTacToe }) => {
      expect(await ticTacToe.game.scoreboard.o.getScore()).toBe(0);
    });
  });

  when("Play Again is clicked to start the next round", () => {
    setup(async ({ ticTacToe }) => {
      await ticTacToe.game.gameOver.clickPlayAgain();
    });

    then("sides are swapped and O goes first", async ({ ticTacToe }) => {
      expect(await ticTacToe.game.board.getCurrentPlayerText()).toContain("O");
    });

    then("the score is preserved", async ({ ticTacToe }) => {
      expect(await ticTacToe.game.scoreboard.x.getScore()).toBe(1);
    });
  });
});
