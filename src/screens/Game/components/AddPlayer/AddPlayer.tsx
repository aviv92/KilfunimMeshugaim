import { FC, useState } from "react";
import { usePlayerStore, DEFAULT_REBUY } from "../../../../stores";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { predefinedPlayers } from "./utils/constants";

const AddPlayer: FC = () => {
  const { addPlayers, players, isReadOnly } = usePlayerStore();
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

  const alreadyAdded = players.map((p) => p.name);

  const availablePlayers = predefinedPlayers.filter(
    (name) => !alreadyAdded.includes(name)
  );

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setSelectedPlayers(typeof value === "string" ? value.split(",") : value);
  };

  const handleAddPlayer = () => {
    if (selectedPlayers.length > 0) {
      addPlayers(selectedPlayers, DEFAULT_REBUY);
      setSelectedPlayers([]);
    }
  };

  if (isReadOnly) return null;

  return (
    <Box display="flex" gap="10px" width="100%">
      <FormControl fullWidth>
        <InputLabel id="player-select-label">Select Players</InputLabel>
        <Select
          multiple
          labelId="player-select-label"
          value={selectedPlayers}
          onChange={handleChange}
          input={<OutlinedInput label="Select Players" />}
          renderValue={(selected) => selected.join(", ")}
        >
          {availablePlayers.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddPlayer}
        disabled={selectedPlayers.length === 0}
      >
        Add
      </Button>
    </Box>
  );
};

export default AddPlayer;
