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
    <div
      className={`${styles.player} ${styles[`fish${index + 1}`]} ${
        isDisabled ? "quitPlayer" : ""
      }`}
      style={{
        left: playerPositions[index].left,
        top: playerPositions[index].top,
      }}
      onClick={isDisabled ? () => {} : onClick}
    >
      {children}
    </div>
  );
};

export default Player;
