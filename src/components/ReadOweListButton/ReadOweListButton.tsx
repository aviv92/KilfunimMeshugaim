import React from "react";
import { speakOwedAmounts } from "../PokerTable/utils/helpers";
import { usePlayerStore } from "../../stores";
import styles from "./ReadOweListButton.module.css";

const ReadOweListButton: React.FC = () => {
  const { players } = usePlayerStore();
  return (
    <button
      onClick={() => speakOwedAmounts(players)}
      className={styles.speakButton}
    >
      Read list
    </button>
  );
};

export default ReadOweListButton;
