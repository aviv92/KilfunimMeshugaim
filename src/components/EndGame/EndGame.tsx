import React from "react";
import { usePlayerStore } from "../../stores";
import styles from "./EndGame.module.css";

const EndGame: React.FC = () => {
  const { players, endGame } = usePlayerStore();

  const handleEndGame = () => {
    endGame();
    const totalOwed = players.reduce((sum, player) => sum + player.owed, 0);
    alert(`Total owed: ${totalOwed}`);
  };

  return (
    <button className={styles.button} onClick={handleEndGame}>
      End Game
    </button>
  );
};

export default EndGame;
