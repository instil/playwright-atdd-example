import {
  given,
  setup,
  then,
  when,
  expect,
} from "@/playwright-alias/PlaywrightAlias";

// https://instil.atlassian.net/browse/TIC-3
given("a Player is playing a Human vs Human game", () => {
  setup(async ({ ticTacToe }) => {
    await ticTacToe.home.humanVsHumanButton.click();
  });

  when("Player X wins by filling the top row", () => {
    setup(async ({ ticTacToe }) => {
      await ticTacToe.game.board.playMoves(
        "Top Left",
        "Middle Left",
        "Top Center",
        "Center",
        "Top Right",
      );
    });

    then("the game over banner is visible", async ({ ticTacToe }) => {
      expect(await ticTacToe.game.gameOver.isVisible()).toBe(true);
    });

    then("the message announces X as the winner", async ({ ticTacToe }) => {
      expect(await ticTacToe.game.gameOver.getMessage()).toContain("X");
    });
  });

  when("all cells are filled with no winner", () => {
    setup(async ({ ticTacToe }) => {
      await ticTacToe.game.board.playMoves(
        "Top Left",
        "Top Center",
        "Top Right",
        "Center",
        "Middle Left",
        "Middle Right",
        "Bottom Center",
        "Bottom Left",
        "Bottom Right",
      );
    });

    then("a draw is announced", async ({ ticTacToe }) => {
      expect(await ticTacToe.game.gameOver.getMessage()).toContain("Draw");
    });
  });

  when("the game is over and Play Again is clicked", () => {
    setup(async ({ ticTacToe }) => {
      await ticTacToe.game.board.playMoves(
        "Top Left",
        "Middle Left",
        "Top Center",
        "Center",
        "Top Right",
      );
      await ticTacToe.game.gameOver.clickPlayAgain();
    });

    then("the board resets and shows empty cells", async ({ ticTacToe }) => {
      expect(await ticTacToe.game.board.getCellMark("Top Left")).toBe("");
    });

    then("the game over banner is gone", async ({ ticTacToe }) => {
      expect(await ticTacToe.game.gameOver.isVisible()).toBe(false);
    });
  });
});
