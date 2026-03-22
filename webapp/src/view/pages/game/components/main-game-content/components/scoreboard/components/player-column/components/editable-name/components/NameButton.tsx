import type { FC } from "react";

interface Props {
  testId: string;
  onClick: () => void;
  children: string;
}

export const NameButton: FC<Props> = ({ testId, onClick, children }) => (
  <button
    data-testid={testId}
    onClick={onClick}
    className="font-semibold hover:underline cursor-pointer"
  >
    {children}
  </button>
);
