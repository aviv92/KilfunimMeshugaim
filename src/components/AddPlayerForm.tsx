// src/components/AddPlayerForm.tsx
import { FC, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { allPlayerNames, DEFAULT_CHIP_AMOUNT } from "../utils/constants";
import { getFirestoreData, updateFirestoreData } from "../utils/firestore";
import { FirestoreData } from "../types/firestore";

interface Props {
  gameId: string;
  existingPlayers: string[];
}

const AddPlayerForm: FC<Props> = ({ gameId, existingPlayers }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const availableNames = allPlayerNames.filter(
    (name) => !existingPlayers.includes(name)
  );

  const handleChange = (event: SelectChangeEvent<typeof selected>) => {
    const value = event.target.value;
    setSelected(typeof value === "string" ? value.split(",") : value);
  };

  const handleAdd = async () => {
    const existingData = await getFirestoreData<FirestoreData>(gameId);
    const currentPlayers = existingData?.players || [];

    const newPlayers = selected.map((name) => ({
      name,
      took: DEFAULT_CHIP_AMOUNT,
    }));

    await updateFirestoreData(gameId, {
      players: [...currentPlayers, ...newPlayers],
      fishLevelUp: {
        name: selected.join(", "),
        newTook: DEFAULT_CHIP_AMOUNT,
        timestamp: Date.now(),
      },
    });

    setSelected([]);
  };

  return (
    <Stack spacing={2} direction="row" alignItems="center" mt={4}>
      <FormControl sx={{ minWidth: 240 }}>
        <InputLabel id="player-select-label">Select Players</InputLabel>
        <Select
          labelId="player-select-label"
          multiple
          value={selected}
          onChange={handleChange}
          input={<OutlinedInput label="Select Players" />}
          renderValue={(selected) => selected.join(", ")}
        >
          {availableNames.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        onClick={handleAdd}
        disabled={selected.length === 0}
      >
        Add
      </Button>
    </Stack>
  );
};

export default AddPlayerForm;
