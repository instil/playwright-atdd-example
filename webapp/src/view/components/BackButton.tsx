import type { FC } from "react";
import { useNavigate } from "react-router";

interface Props {
  testId: string;
}

export const BackButton: FC<Props> = ({ testId }) => {
  const navigate = useNavigate();

  return (
    <button
      data-testid={testId}
      className="absolute top-4 left-4 px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 border border-neutral-300 rounded-lg hover:border-neutral-400 cursor-pointer"
      onClick={() => void navigate("/")}
    >
      ← Back
    </button>
  );
};
