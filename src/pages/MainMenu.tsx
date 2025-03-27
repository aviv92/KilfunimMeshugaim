// src/pages/MainMenu.tsx
import { FC, useState } from "react";
import {
  Button,
  Stack,
  Typography,
  TextField,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const MainMenu: FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [gameIdInput, setGameIdInput] = useState("");
  const navigate = useNavigate();

  const handleCreateGame = async () => {
    const newGameId = uuidv4();
    const gameRef = doc(db, "games", newGameId);

    const hostId = crypto.randomUUID();
    localStorage.setItem("hostId", hostId);

    await setDoc(gameRef, {
      status: "in-play",
      players: [],
      createdAt: Date.now(),
      hostId,
    });

    navigate(`/game/${newGameId}/in-play`);
  };

  const handleJoin = () => {
    if (gameIdInput.trim()) {
      navigate(`/game/${gameIdInput.trim()}/in-play`);
      setDialogOpen(false);
      setGameIdInput("");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Stack spacing={4} alignItems="center" mt={10}>
        <Typography variant="h4" fontWeight="bold">
          🐟 Kilfunim Meshugaim
        </Typography>

        <Button variant="contained" onClick={handleCreateGame}>
          Create New Game
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setDialogOpen(true)}
        >
          Join Game
        </Button>
      </Stack>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Join Game</DialogTitle>
        <DialogContent>
          <TextField
            label="Game ID"
            fullWidth
            value={gameIdInput}
            onChange={(e) => setGameIdInput(e.target.value)}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleJoin}>
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MainMenu;
