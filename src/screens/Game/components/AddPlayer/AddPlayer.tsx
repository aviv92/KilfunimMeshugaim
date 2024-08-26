import React from "react";
import { usePlayerStore, useSettingsStore } from "../../../../stores";
import { TextField, Button, Box } from "@mui/material";
import { cleanAndSplitNames } from "./utils/utils";

const AddPlayer: React.FC = () => {
  const { inputName, setInputName, addPlayers } = usePlayerStore();
  const { defaultRebuy } = useSettingsStore();

  const handleAddPlayer = () => {
    if (inputName.trim()) {
      const playerNames = cleanAndSplitNames(inputName);
      addPlayers(playerNames, defaultRebuy);
      setInputName("");
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
