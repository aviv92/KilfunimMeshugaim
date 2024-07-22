import React, { FC } from "react";
import styles from "./Player.module.css";
import { Player, usePlayerStore } from "../../stores/usePlayerStore";
import PlayerActions from "./PlayerActions";

type PlayerProps = {
  player: Player;
  handleQuit: (index: number) => void;
  index: number;
  selectedPlayerId: number | null;
};

const PlayerInfo: FC<PlayerProps> = ({ selectedPlayerId, ...actionsProps }) => {
  const { player, index } = actionsProps;
  const { updateOwed, usedShowMe } = usePlayerStore();
  return (
    <div className={styles.playerInfo}>
      <span className={styles.amount}>
        {player.name} {player.owed}
      </span>
      {player.showMe && (
        <button
          className={styles.showBadge}
          onClick={(e) => {
            e.stopPropagation();
            usedShowMe(index);
          }}
        >
          S
        </button>
      )}
      <button
        className={styles.clickableBadge}
        onClick={(e) => {
          e.stopPropagation();
          updateOwed(index, 50);
        }}
        disabled={player.hasQuit}
      >
        +50
      </button>
      {player.hasQuit && (
        <span className={styles.finalResult}>{player.finalResult}</span>
      )}
      {selectedPlayerId === index && <PlayerActions {...actionsProps} />}
    </div>
  );
};

export default PlayerInfo;
