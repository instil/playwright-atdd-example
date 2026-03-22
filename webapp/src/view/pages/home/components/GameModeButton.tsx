import type { FC } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

interface Props {
  testId: string;
  colorClass: string;
  onClick: () => void;
  children: React.ReactNode;
}

export const GameModeButton: FC<Props> = ({
  testId,
  colorClass,
  onClick,
  children,
}) => (
  <button
    data-testid={testId}
    className={twMerge(
      clsx("px-6 py-3 text-white rounded-lg text-lg font-semibold", colorClass),
    )}
    onClick={onClick}
  >
    {children}
  </button>
);
