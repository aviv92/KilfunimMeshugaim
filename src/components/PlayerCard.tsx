import { FC, useState } from "react";
import {
  Card,
  Typography,
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { DEFAULT_CHIP_AMOUNT } from "../utils/constants";
import { getFishImage } from "../utils/fish";
import { Player } from "../types/player";

interface PlayerCardProps extends Player {
  gameId: string;
  isHost?: boolean;
}

const PlayerCard: FC<PlayerCardProps> = ({
  gameId,
  name,
  chips,
  took,
  leftEarly,
  isHost,
}) => {
  const [leaveOpen, setLeaveOpen] = useState(false);
  const [finalChips, setFinalChips] = useState("");

  const updatePlayerChips = async (delta: number) => {
    const gameRef = doc(db, "games", gameId);
    const docSnap = await getDoc(gameRef);
    const players: Player[] = docSnap.data()?.players ?? [];

    const updated = players.map((p: Player) => {
      if (p.name !== name) return p;
      const newTook = p.took + delta;
      if (newTook < DEFAULT_CHIP_AMOUNT) {
        alert("You can't take less than the initial amount!");
        return;
      }
      return { ...p, took: newTook };
    });

    await updateDoc(gameRef, { players: updated });
  };

  const handleLeave = async () => {
    const value = Number(finalChips);
    if (isNaN(value) || value < 0) return;

    const gameRef = doc(db, "games", gameId);
    const docSnap = await getDoc(gameRef);
    const players = docSnap.data()?.players ?? [];

    const updated = players.map((p: Player) =>
      p.name === name ? { ...p, chips: value, leftEarly: true } : p
    );

    await updateDoc(gameRef, { players: updated });
    setLeaveOpen(false);
    setFinalChips("");
  };

  const fishImage = getFishImage(took);

  return (
    <>
      <Card sx={{ display: "flex", alignItems: "center", padding: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body1">{took} took</Typography>
          {chips && (
            <Typography variant="caption" color="text.secondary">
              {chips} chips
            </Typography>
          )}
          {leftEarly && (
            <Typography variant="caption" color="text.secondary">
              (Left early)
            </Typography>
          )}
          {isHost && (
            <Stack direction="row" spacing={1} mt={1}>
              <IconButton
                onClick={() => updatePlayerChips(DEFAULT_CHIP_AMOUNT)}
                disabled={leftEarly}
              >
                <AddIcon />
              </IconButton>
              <IconButton
                onClick={() => updatePlayerChips(-DEFAULT_CHIP_AMOUNT)}
              >
                <RemoveIcon />
              </IconButton>
              <IconButton onClick={() => setLeaveOpen(true)}>
                <ExitToAppIcon />
              </IconButton>
            </Stack>
          )}
        </Box>
        <Box>
          <img
            src={fishImage}
            alt="Fish"
            style={{ height: 60, marginLeft: 16 }}
          />
        </Box>
      </Card>

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
    </>
  );
};

export default PlayerCard;
