// src/components/PokerTable.tsx
import React, { useState } from "react";
import { usePlayerStore } from "../../stores"; // Adjust the path according to your store's location
import styles from "./PokerTable.module.css";
import { calculatePositions } from "./utils/helpers";

const PokerTable: React.FC = () => {
  const { players, updateOwed, usedShowMe, quitPlayer } = usePlayerStore();
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);
  const [quittingPlayerId, setQuittingPlayerId] = useState<number | null>(null);
  const [finalAmount, setFinalAmount] = useState<number>(0);

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

  // In your React component's render method or functional component body
  const playerPositions = calculatePositions(players.length);
  return (
    <div className={styles.table}>
      <div className={styles.tableTitle}>Aviv's Aquarium</div>
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
          <div className={styles.playerInfo}>
            <br />
            <span className={styles.amount}>
              {player.name} {player.owed}
            </span>
            {player.showMe && <span className={styles.showBadge}>Show</span>}
            {player.hasQuit && (
              <span className={styles.finalResult}>{player.finalResult}</span>
            )}
            {selectedPlayerId === index && (
              <>
                <button
                  className={styles.rebuyButton}
                  onClick={() => updateOwed(index, 50)}
                >
                  50 תן לי
                </button>
                <button
                  className={styles.rebuyButton}
                  onClick={() => updateOwed(index, 100)}
                >
                  תן לי 100
                </button>
                <button
                  className={styles.rebuyButton}
                  onClick={() => updateOwed(index, 200)}
                >
                  תן לי 200
                </button>

                {player.showMe && !player.hasQuit && (
                  <button
                    className={styles.showButton}
                    onClick={() => usedShowMe(index)}
                  >
                    Show me
                  </button>
                )}
                {!player.hasQuit && (
                  <button
                    className={styles.quitButton}
                    onClick={() => handleQuit(index)}
                  >
                    אני הולך כמו מלשין גדול
                  </button>
                )}
              </>
            )}
          </div>
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
