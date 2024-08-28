import { FC } from "react";
import { usePlayerStore, DEFAULT_REBUY } from "../../../../stores";
import { TextField, Button, Box } from "@mui/material";
import { cleanAndSplitNames } from "./utils/utils";

const AddPlayer: FC = () => {
  const { inputName, setInputName, addPlayers } = usePlayerStore();

  const handleAddPlayer = () => {
    if (inputName.trim()) {
      const playerNames = cleanAndSplitNames(inputName);
      addPlayers(playerNames, DEFAULT_REBUY);
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
