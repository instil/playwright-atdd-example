import {
  given,
  setup,
  then,
  when,
  expect,
} from "@/playwright-alias/PlaywrightAlias";

// https://instil.atlassian.net/browse/TIC-6
given("a Player is on the game page", () => {
  setup(async ({ ticTacToe }) => {
    await ticTacToe.home.humanVsHumanButton.click();
  });

  when("they see the scoreboard", () => {
    then("the default name for X is Player 1", async ({ ticTacToe }) => {
      expect(await ticTacToe.game.scoreboard.x.getName()).toBe("Player 1");
    });

    then("the default name for O is Player 2", async ({ ticTacToe }) => {
      expect(await ticTacToe.game.scoreboard.o.getName()).toBe("Player 2");
    });
  });

  when("the player edits the X player name", () => {
    setup(async ({ ticTacToe }) => {
      await ticTacToe.game.scoreboard.x.editName("Alice");
    });

    then("the scoreboard shows the new name", async ({ ticTacToe }) => {
      expect(await ticTacToe.game.scoreboard.x.getName()).toBe("Alice");
    });
  });

  when("the player edits the O player name", () => {
    setup(async ({ ticTacToe }) => {
      await ticTacToe.game.scoreboard.o.editName("Bob");
    });

    then("the scoreboard shows the new O name", async ({ ticTacToe }) => {
      expect(await ticTacToe.game.scoreboard.o.getName()).toBe("Bob");
    });
  });
});
