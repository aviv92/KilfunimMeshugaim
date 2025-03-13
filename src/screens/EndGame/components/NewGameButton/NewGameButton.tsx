import { FC } from "react";
import { Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { usePlayerStore } from "../../../../stores/usePlayerStore";

const NewGameButton: FC = () => {
  const startGame = usePlayerStore((s) => s.startGame);

  const handleCreateNewGame = () => {
    const newGameId = uuidv4().slice(0, 8);
    startGame();
    window.location.href = `${window.location.origin}/?gameId=${newGameId}`;
  };

  return (
    <Button variant="outlined" color="primary" onClick={handleCreateNewGame}>
      🎲 Create New Game
    </Button>
  );
};

export default NewGameButton;
