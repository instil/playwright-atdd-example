import type { FC } from "react";

interface Props {
  testId: string;
  defaultValue: string;
  onBlur: (value: string) => void;
}

export const NameInput: FC<Props> = ({ testId, defaultValue, onBlur }) => (
  <input
    data-testid={testId}
    defaultValue={defaultValue}
    autoFocus
    className="font-semibold border-b border-foreground bg-transparent text-center w-24 outline-none"
    onBlur={(event) => onBlur(event.target.value)}
    onKeyDown={(event) => {
      if (event.key === "Enter" || event.key === "Tab") {
        onBlur(event.currentTarget.value);
      }
    }}
  />
);
