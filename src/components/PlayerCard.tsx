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
  CardContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { DEFAULT_CHIP_AMOUNT } from "../utils/constants";
import { getFishImage, getFishLevelUpMessage } from "../utils/fish";
import { Player } from "../types/player";
import FishLevelUpOverlay from "./FishLevelUpOverlay";

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
  const [showFishLevelUp, setShowFishLevelUp] = useState(false);
  const [fishMessage, setFishMessage] = useState("");

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

      if (delta > 0) {
        const newFish = getFishImage(newTook);
        const currentFish = getFishImage(p.took);
        if (newFish !== currentFish) {
          setFishMessage(getFishLevelUpMessage(name, newTook));
          setShowFishLevelUp(true);
        }
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

  return (
    <>
      <Card>
        <CardContent>
          <Stack spacing={2} alignItems="center">
            {/* Player Name */}
            <Stack direction="row" spacing={2} justifyContent="center">
              <Typography variant="h6" fontWeight="bold">
                {name}
              </Typography>
            </Stack>

            {/* Took & Chips */}
            <Stack direction="row" spacing={2} justifyContent="center">
              <Typography variant="body2">🎲 Took: {took}</Typography>
              {chips && (
                <Typography variant="body2">💰 Final: {chips}</Typography>
              )}
            </Stack>

            {/* Fish Image */}
            <img src={getFishImage(took)} alt="fish" style={{ height: 60 }} />

            {/* Action Buttons */}
            {isHost && (
              <Stack direction="row" spacing={1} justifyContent="center">
                <IconButton
                  onClick={() => updatePlayerChips(DEFAULT_CHIP_AMOUNT)}
                  disabled={leftEarly}
                >
                  <AddIcon />
                </IconButton>
                <IconButton
                  onClick={() => updatePlayerChips(-DEFAULT_CHIP_AMOUNT)}
                  disabled={leftEarly}
                >
                  <RemoveIcon />
                </IconButton>
                <IconButton
                  onClick={() => setLeaveOpen(true)}
                  disabled={leftEarly}
                >
                  <ExitToAppIcon />
                </IconButton>
              </Stack>
            )}
          </Stack>
        </CardContent>
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

      <FishLevelUpOverlay
        open={showFishLevelUp}
        playerName={name}
        fishImg={getFishImage(took)}
        onClose={() => setShowFishLevelUp(false)}
        message={fishMessage}
      />
    </>
  );
};

export default PlayerCard;
