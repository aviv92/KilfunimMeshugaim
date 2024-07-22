// src/components/PokerTable.tsx
import React, { useState, useEffect } from "react";
import { usePlayerStore } from "../../stores"; // Adjust the path according to your store's location
import styles from "./PokerTable.module.css";
import { calculatePositions } from "./utils/helpers";
import PlayerInfo from "../Player/PlayerInfo";
import Player from "../Player/Player";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";

const PokerTable: React.FC = () => {
  const { players, quitPlayer } = usePlayerStore();
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const [quittingPlayerId, setQuittingPlayerId] = useState<number | null>(null);
  const [finalAmount, setFinalAmount] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const playerPositions = calculatePositions(players.length, isMobile);

  const handleQuit = (index: number) => {
    setQuittingPlayerId(index);
  };

  const handleQuitConfirm = () => {
    if (quittingPlayerId !== null) {
      quitPlayer(quittingPlayerId, finalAmount);
      setQuittingPlayerId(null);
      setFinalAmount(0);
    }
  };

  return (
    <div className={styles.table}>
      <div className={styles.tableTitle}>קילפונים משוגעים</div>
      {players.map((player, index) => (
        <Player
          index={index}
          playerPositions={playerPositions}
          onClick={
            index !== selectedPlayerId
              ? () => setSelectedPlayerId(index)
              : () => setSelectedPlayerId(null)
          }
          isDisabled={player.hasQuit}
        >
          <PlayerInfo
            player={player}
            handleQuit={handleQuit}
            index={index}
            selectedPlayerId={selectedPlayerId}
          />
        </Player>
      ))}

      {quittingPlayerId !== null && (
        <ConfirmDialog
          content={
            <input
              type="number"
              min={0}
              value={finalAmount}
              onChange={(e) => setFinalAmount(Number(e.target.value))}
              className={styles.finalAmountInput}
            />
          }
          title="Enter Final Amount"
          onCancel={() => setQuittingPlayerId(null)}
          onConfirm={handleQuitConfirm}
        />
      )}
    </div>
  );
};

export default PokerTable;
