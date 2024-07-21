import { FC } from "react";
import styles from "../PokerTable/PokerTable.module.css";
import { usePlayerStore } from "../../stores";
import { Player } from "../../stores/usePlayerStore";

type PlayerActionsProps = {
  handleQuit: (index: number) => void;
  index: number;
  player: Player;
};

const PlayerActions: FC<PlayerActionsProps> = ({
  handleQuit,
  index,
  player,
}) => {
  const { updateOwed } = usePlayerStore();
  return (
    <>
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
      {!player.hasQuit && (
        <button className={styles.quitButton} onClick={() => handleQuit(index)}>
          Quit
        </button>
      )}
    </>
  );
};

export default PlayerActions;
