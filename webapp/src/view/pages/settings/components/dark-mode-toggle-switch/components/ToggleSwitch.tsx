import type { FC } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

interface Props {
  checked: boolean;
  onChange: () => void;
  "data-testid"?: string;
}

export const ToggleSwitch: FC<Props> = ({
  checked,
  onChange,
  "data-testid": testId,
}) => (
  <button
    data-testid={testId}
    role="switch"
    aria-checked={checked}
    onClick={onChange}
    className="w-12 h-6 rounded-full border-2 border-foreground relative flex items-center cursor-pointer"
  >
    <span
      className={twMerge(
        clsx("w-4 h-4 rounded-full bg-foreground absolute transition-all", {
          "left-6": checked,
          "left-1": !checked,
        }),
      )}
    />
  </button>
);
