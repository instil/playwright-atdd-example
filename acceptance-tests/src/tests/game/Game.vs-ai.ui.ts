import {
  given,
  setup,
  then,
  when,
  expect,
} from "@/playwright-alias/PlaywrightAlias";

// https://instil.atlassian.net/browse/TIC-5
given("a Player starts a Human vs AI game", () => {
  setup(async ({ ticTacToe }) => {
    await ticTacToe.home.humanVsAiButton.click();
  });

  when("they arrive at the game page", () => {
    then("the side selector is shown", async ({ ticTacToe }) => {
      expect(await ticTacToe.game.sideSelector.isVisible()).toBe(true);
    });
  });

  when("the player picks X and makes a move", () => {
    setup(async ({ ticTacToe }) => {
      await ticTacToe.game.sideSelector.pickX();
      await ticTacToe.game.board.playMovesAsHuman("X", "Top Left");
    });

    then("the AI responds with O in Center", async ({ ticTacToe }) => {
      expect(await ticTacToe.game.board.getCellMark("Center")).toBe("O");
    });
  });

  when("the player picks O and the AI goes first", () => {
    setup(async ({ ticTacToe }) => {
      await ticTacToe.game.sideSelector.pickO();
    });

    then("the AI places X in Top Left", async ({ ticTacToe }) => {
      expect(await ticTacToe.game.board.getCellMark("Top Left")).toBe("X");
    });
  });

  given("the player picks X and plays to a draw", () => {
    setup(async ({ ticTacToe }) => {
      await ticTacToe.game.sideSelector.pickX();
      // Human (X): Top Left, Top Center, Bottom Left, Middle Right, Bottom Right
      // AI (O) responds: Center, Top Right, Middle Left, Bottom Center
      // Final board: X X O / O O X / X O X → Draw
      await ticTacToe.game.board.playMovesAsHuman(
        "X",
        "Top Left",
        "Top Center",
        "Bottom Left",
        "Middle Right",
        "Bottom Right",
      );
    });

    when("the game ends", () => {
      then("a draw is announced", async ({ ticTacToe }) => {
        expect(await ticTacToe.game.gameOver.getMessage()).toContain("Draw");
      });
    });
  });

  given("the player picks X and fails to block the AI's winning threat", () => {
    setup(async ({ ticTacToe }) => {
      await ticTacToe.game.sideSelector.pickX();
      // Human (X): Top Left, Top Right, Middle Left (fails to block Bottom Center)
      // AI (O) responds: Center, Top Center, Bottom Center (wins down center column)
      await ticTacToe.game.board.playMovesAsHuman(
        "X",
        "Top Left",
        "Top Right",
        "Middle Left",
      );
    });

    when("the game ends", () => {
      then("the AI wins the game", async ({ ticTacToe }) => {
        expect(await ticTacToe.game.gameOver.getMessage()).toContain("O");
      });
    });
  });
});
