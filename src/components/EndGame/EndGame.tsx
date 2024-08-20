import React from "react";
import { usePlayerStore } from "../../stores";
import { Button } from "@mui/material";

const EndGame: React.FC = () => {
  const { players, endGame } = usePlayerStore();

  const handleEndGame = () => {
    endGame();
    const totalOwed = players.reduce((sum, player) => sum + player.owed, 0);
    alert(`Total owed: ${totalOwed}`);
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleEndGame}>
      End Game
    </Button>
  );
};

export default EndGame;
