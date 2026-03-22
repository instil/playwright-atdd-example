import { DslError } from "@/dsl/errors/DslError";
import { GameBoardPlaywright } from "@/dsl/webapp/pages/game/components/game-board/playwright/GameBoardPlaywright";
import type { BoardCell } from "@/dsl/webapp/pages/game/components/game-board/types/BoardCell";
import { cellIndex } from "@/dsl/webapp/pages/game/components/game-board/types/BoardCell";
import type { Side } from "@shared/types/Side";
import type { Page } from "@playwright/test";

export class GameBoardDsl {
  private readonly gameBoardPlaywright: GameBoardPlaywright;

  constructor(page: Page) {
    this.gameBoardPlaywright = new GameBoardPlaywright(page);
  }

  async getCellMark(cell: BoardCell): Promise<string> {
    try {
      return await this.gameBoardPlaywright.getCellMark(cellIndex[cell]);
    } catch (error) {
      throw new DslError(`Failed to get mark for cell ${cell}`, error);
    }
  }

  async playMoves(...cells: BoardCell[]): Promise<void> {
    for (const cell of cells) {
      try {
        await this.gameBoardPlaywright.clickCell(cellIndex[cell]);
      } catch (error) {
        throw new DslError(`Failed to click cell ${cell}`, error);
      }
    }
  }

  async playMovesAsHuman(
    humanSide: Side,
    ...cells: BoardCell[]
  ): Promise<void> {
    for (const cell of cells) {
      try {
        await this.gameBoardPlaywright.clickCell(cellIndex[cell]);
        await this.gameBoardPlaywright.waitForAiResponse(
          humanSide,
          cellIndex[cell],
        );
      } catch (error) {
        throw new DslError(
          `Failed to play move as human on cell ${cell}`,
          error,
        );
      }
    }
  }

  async isCellDisabled(cell: BoardCell): Promise<boolean> {
    try {
      return await this.gameBoardPlaywright.isCellDisabled(cellIndex[cell]);
    } catch (error) {
      throw new DslError(`Failed to check if cell ${cell} is disabled`, error);
    }
  }

  async getCurrentPlayerText(): Promise<string> {
    try {
      return await this.gameBoardPlaywright.getCurrentPlayerText();
    } catch (error) {
      throw new DslError("Failed to get current player text", error);
    }
  }

  async isBoardVisible(): Promise<boolean> {
    try {
      return await this.gameBoardPlaywright.isBoardVisible();
    } catch (error) {
      throw new DslError("Failed to check board visibility", error);
    }
  }

  async getCellCount(): Promise<number> {
    try {
      return await this.gameBoardPlaywright.getCellCount();
    } catch (error) {
      throw new DslError("Failed to get cell count", error);
    }
  }
}
