import {
  given,
  setup,
  then,
  when,
  expect,
} from "@/playwright-alias/PlaywrightAlias";

// https://instil.atlassian.net/browse/TIC-2
given("a Player is playing a game", () => {
  setup(async ({ ticTacToe }) => {
    await ticTacToe.home.humanVsHumanButton.click();
  });

  when("they see the game board", () => {
    then("the board has 9 cells", async ({ ticTacToe }) => {
      expect(await ticTacToe.game.board.getCellCount()).toBe(9);
    });

    then(
      "the current player indicator shows X is first",
      async ({ ticTacToe }) => {
        expect(await ticTacToe.game.board.getCurrentPlayerText()).toContain(
          "X",
        );
      },
    );
  });

  when("Player X clicks a cell", () => {
    setup(async ({ ticTacToe }) => {
      await ticTacToe.game.board.playMoves("Center");
    });

    then("the cell shows X", async ({ ticTacToe }) => {
      expect(await ticTacToe.game.board.getCellMark("Center")).toBe("X");
    });

    then("the current player switches to O", async ({ ticTacToe }) => {
      expect(await ticTacToe.game.board.getCurrentPlayerText()).toContain("O");
    });
  });

  when("a cell is already taken", () => {
    setup(async ({ ticTacToe }) => {
      await ticTacToe.game.board.playMoves("Top Left");
    });

    then("it cannot be clicked again", async ({ ticTacToe }) => {
      expect(await ticTacToe.game.board.isCellDisabled("Top Left")).toBe(true);
    });
  });
});
