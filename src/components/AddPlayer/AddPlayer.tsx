import React from "react";
import { usePlayerStore, useSettingsStore } from "../../stores";
import { TextField, Button, Box } from "@mui/material";

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
    <Box display="flex" gap="10px">
      <TextField
        label="Enter player name(s)"
        variant="outlined"
        fullWidth
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
        placeholder="Use commas to separate names"
      />
      <Button variant="contained" color="primary" onClick={handleAddPlayer}>
        Add
      </Button>
    </Box>
  );
};

export default AddPlayer;
