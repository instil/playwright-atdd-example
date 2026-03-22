import { useState, type FC } from "react";
import { useGameStore } from "@/state/game-store/GameStore";
import type { Side } from "@shared/types/Side";
import { GAME_PAGE_TEST_ID } from "@/view/pages/game/constants/GamePageTestIds";
import { NameInput } from "@/view/pages/game/components/main-game-content/components/scoreboard/components/player-column/components/editable-name/components/NameInput";
import { NameButton } from "@/view/pages/game/components/main-game-content/components/scoreboard/components/player-column/components/editable-name/components/NameButton";

const SCOREBOARD_TEST_ID = `${GAME_PAGE_TEST_ID}__scoreboard`;

interface Props {
  side: Side;
}

export const EditableName: FC<Props> = ({ side }) => {
  const name = useGameStore((state) => state.playerNames[side]);
  const setPlayerName = useGameStore((state) => state.setPlayerName);
  const [isEditing, setIsEditing] = useState(false);

  const testIdPrefix = `${SCOREBOARD_TEST_ID}__${side.toLowerCase()}Name`;

  const handleBlur = (value: string): void => {
    setPlayerName(side, value.trim() || name);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <NameInput
        testId={`${testIdPrefix}Input`}
        defaultValue={name}
        onBlur={handleBlur}
      />
    );
  }

  return (
    <NameButton testId={testIdPrefix} onClick={() => setIsEditing(true)}>
      {name}
    </NameButton>
  );
};
