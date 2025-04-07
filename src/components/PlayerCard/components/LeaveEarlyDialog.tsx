import { FC, useState } from "react";
import { updateDoc } from "firebase/firestore";
import { Player } from "../../../types/player";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { FirestoreData } from "../../../types/firestore";
import { getFirestoreDocRef, getFirestoreData } from "../../../utils/firestore";

type Props = {
  gameId: string;
  name: string;
  leaveOpen: boolean;
  setLeaveOpen: (open: boolean) => void;
};

const LeaveEarlyDialog: FC<Props> = ({
  gameId,
  name,
  leaveOpen,
  setLeaveOpen,
}) => {
  const [finalChips, setFinalChips] = useState("");

  const handleLeave = async () => {
    const value = Number(finalChips);
    if (isNaN(value) || value < 0) return;

    const gameRef = getFirestoreDocRef(gameId);
    const data = await getFirestoreData<FirestoreData>(gameId);

    const players = data?.players ?? [];

    const updated = players.map((p: Player) =>
      p.name === name ? { ...p, chips: value, leftEarly: true } : p
    );

    await updateDoc(gameRef, { players: updated });
    setLeaveOpen(false);
    setFinalChips("");
  };

  return (
    <Dialog open={leaveOpen} onClose={() => setLeaveOpen(false)}>
      <DialogTitle>Leaving Early?</DialogTitle>
      <DialogContent>
        <TextField
          label="Final Chips"
          type="number"
          fullWidth
          value={finalChips}
          onChange={(e) => setFinalChips(e.target.value)}
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setLeaveOpen(false)}>Cancel</Button>
        <Button onClick={handleLeave} variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LeaveEarlyDialog;
