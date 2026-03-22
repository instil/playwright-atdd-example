import type { FC } from "react";
import { HOME_PAGE_TEST_ID } from "@/view/pages/home/constants/HomePageTestIds";

export const TicTacToeTitle: FC = () => (
  <h1
    data-testid={`${HOME_PAGE_TEST_ID}__title`}
    className="text-4xl font-bold tracking-tight"
  >
    <span className="text-blue-600">X</span>
    <span> Tic Tac Toe </span>
    <span className="text-rose-500">O</span>
  </h1>
);
