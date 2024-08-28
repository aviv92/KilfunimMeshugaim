import { FC } from "react";
import { usePlayerStore } from "../../../../stores";
import { Button } from "@mui/material";
import { isReadOnlyMode } from "../../../../utils/serializeState";

const EndGameButton: FC = () => {
  const { endGame } = usePlayerStore();

  return (
    <Button
      disabled={isReadOnlyMode()}
      variant="contained"
      color="error"
      onClick={endGame}
    >
      End Game
    </Button>
  );
};

export default EndGameButton;
