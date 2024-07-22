import React from "react";
import { Position } from "../PokerTable/utils/helpers";
import styles from "./Player.module.css";

type PlayerProps = {
  index: number;
  onClick: () => void;
  playerPositions: Position[];
  isDisabled?: boolean;
} & React.PropsWithChildren;

const Player: React.FC<PlayerProps> = ({
  children,
  index,
  onClick,
  playerPositions,
  isDisabled = false,
}) => {
  return (
    <button
      key={index}
      className={`${styles.player} ${styles[`fish${index + 1}`]} ${
        isDisabled ? "quitPlayer" : ""
      }`}
      style={{
        left: playerPositions[index].left,
        top: playerPositions[index].top,
      }}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Player;
