// src/components/PokerTable.tsx
import React, { useState, useEffect } from "react";
import { usePlayerStore } from "../../stores"; // Adjust the path according to your store's location
import styles from "./PokerTable.module.css";
import { calculatePositions, speakOwedAmounts } from "./utils/helpers";
import Player from "../Player/Player";

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
      <div className={styles.tableTitle}>קלפונים משוגעים</div>
      <div className={styles.controls}>
        <button
          onClick={() => speakOwedAmounts(players)}
          className={styles.speakButton}
        >
          Speak Owed Amounts
        </button>
      </div>
      {players.map((player, index) => (
        <div
          key={index}
          className={`${styles.player} ${styles[`fish${index + 1}`]} ${
            player.hasQuit ? styles.quitPlayer : ""
          }`}
          style={{
            left: player.hasQuit ? "auto" : playerPositions[index].left,
            top: player.hasQuit ? "auto" : playerPositions[index].top,
            right: player.hasQuit ? "20px" : "auto",
          }}
          onClick={() => {
            index !== selectedPlayerId
              ? setSelectedPlayerId(index)
              : setSelectedPlayerId(null);
          }}
        >
          <Player
            player={player}
            handleQuit={handleQuit}
            index={index}
            selectedPlayerId={selectedPlayerId}
          />
        </div>
      ))}

      {quittingPlayerId !== null && (
        <div className={styles.quitModal}>
          <div className={styles.modalContent}>
            <h2>Enter Final Amount</h2>
            <input
              type="number"
              value={finalAmount}
              onChange={(e) => setFinalAmount(Number(e.target.value))}
              className={styles.finalAmountInput}
            />
            <button
              onClick={handleQuitConfirm}
              className={styles.confirmButton}
            >
              Confirm
            </button>
            <button
              onClick={() => setQuittingPlayerId(null)}
              className={styles.cancelButton}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokerTable;
