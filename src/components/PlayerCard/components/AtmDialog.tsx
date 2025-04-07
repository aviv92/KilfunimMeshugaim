import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { FC, useState } from "react";

type Props = {
  atmOpen: boolean;
  setAtmOpen: (open: boolean) => void;
  updatePlayerChips: (delta: number) => Promise<void>;
};

const AtmDialog: FC<Props> = ({ atmOpen, setAtmOpen, updatePlayerChips }) => {
  const [atmTake, setAtmTake] = useState("");

  const handleAtm = async () => {
    const value = Number(atmTake);
    if (isNaN(value) || value <= 0) return;

    await updatePlayerChips(value);
    setAtmOpen(false);
    setAtmTake("");
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
          onChange={(e) => setAtmTake(e.target.value)}
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setAtmOpen(false)}>Cancel</Button>
        <Button onClick={handleAtm} variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AtmDialog;
