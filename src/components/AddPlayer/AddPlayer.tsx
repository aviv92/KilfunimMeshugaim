// src/components/AddPlayer.tsx
import React from "react";
import { usePlayerStore, useSettingsStore } from "../../stores";
import styles from "./AddPlayer.module.css";

const AddPlayer: React.FC = () => {
  const { inputName, setInputName, addPlayers } = usePlayerStore();
  const { defaultRebuy } = useSettingsStore();

  const cleanAndSplitNames = (input: string): string[] => {
    let cleanedInput = input.replace(/,,+/g, ",").trim(); // Remove consecutive commas and trim
    if (cleanedInput.startsWith(",")) {
      cleanedInput = cleanedInput.substring(1);
    }
    if (cleanedInput.endsWith(",")) {
      cleanedInput = cleanedInput.slice(0, -1);
    }
    return cleanedInput
      .split(",")
      .map((name) => name.trim())
      .filter((name) => name !== "");
  };

  const handleAddPlayer = () => {
    if (inputName.trim()) {
      const playerNames = cleanAndSplitNames(inputName);
      addPlayers(playerNames, defaultRebuy); // initial owed amount is default rebuy
      setInputName(""); // Reset input in store
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Enter player name(s), use commas to separate"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
        className={styles.input}
      />
      <button className={styles.button} onClick={handleAddPlayer}>
        Add
      </button>
    </div>
  );
};

export default AddPlayer;
