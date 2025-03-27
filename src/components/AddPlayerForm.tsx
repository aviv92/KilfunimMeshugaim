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
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { allPlayerNames, DEFAULT_CHIP_AMOUNT } from "../utils/constants";

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
    const gameRef = doc(db, "games", gameId);
    const docSnap = await getDoc(gameRef);
    const existingData = docSnap.data();
    const currentPlayers = existingData?.players || [];

    const newPlayers = selected.map((name) => ({
      name,
      took: DEFAULT_CHIP_AMOUNT,
    }));

    await updateDoc(gameRef, {
      players: [...currentPlayers, ...newPlayers],
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
