import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { FC, useState } from "react";
import { DEFAULT_CHIP_AMOUNT } from "../../../utils/constants";

type Props = {
  atmOpen: boolean;
  setAtmOpen: (open: boolean) => void;
  updatePlayerChips: (delta: number) => Promise<void>;
};

const AtmDialog: FC<Props> = ({ atmOpen, setAtmOpen, updatePlayerChips }) => {
  const [atmTake, setAtmTake] = useState(DEFAULT_CHIP_AMOUNT);

  const handleAtm = async () => {
    const value = Number(atmTake);
    if (isNaN(value) || value <= 0) return;

    await updatePlayerChips(value);
    setAtmOpen(false);
    setAtmTake(DEFAULT_CHIP_AMOUNT);
  };

  return (
    <Dialog open={atmOpen} onClose={() => setAtmOpen(false)}>
      <DialogTitle>Need ATM?</DialogTitle>
      <DialogContent>
        <TextField
          label="Get another rebuy"
          type="number"
          fullWidth
          value={atmTake}
          onChange={(e) => setAtmTake(Number(e.target.value))}
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => setAtmTake(DEFAULT_CHIP_AMOUNT)}
        >
          {DEFAULT_CHIP_AMOUNT}
        </Button>
        <Button
          variant="outlined"
          onClick={() => setAtmTake(DEFAULT_CHIP_AMOUNT * 2)}
        >
          {DEFAULT_CHIP_AMOUNT * 2}
        </Button>
        <Button
          variant="outlined"
          onClick={() => setAtmTake(DEFAULT_CHIP_AMOUNT * 3)}
        >
          {DEFAULT_CHIP_AMOUNT * 3}
        </Button>
        <Button
          variant="outlined"
          onClick={() => setAtmTake(DEFAULT_CHIP_AMOUNT * 4)}
        >
          {DEFAULT_CHIP_AMOUNT * 4}
        </Button>
      </DialogActions>
      <DialogActions>
        <Button variant="outlined" onClick={() => setAtmOpen(false)}>
          Cancel
        </Button>
        <Button onClick={handleAtm} variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AtmDialog;
