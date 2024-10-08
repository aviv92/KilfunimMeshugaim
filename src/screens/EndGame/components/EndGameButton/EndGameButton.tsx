import { FC } from "react";
import { usePlayerStore } from "../../../../stores";
import { Button } from "@mui/material";

const EndGameButton: FC = () => {
  const { endGame } = usePlayerStore();

  return (
    <Button variant="contained" color="error" onClick={endGame}>
      End Game
    </Button>
  );
};

export default EndGameButton;
