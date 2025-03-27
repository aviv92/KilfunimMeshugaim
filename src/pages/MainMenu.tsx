// src/pages/MainMenu.tsx
import { FC, useState } from "react";
import { Button, Stack, Typography, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const MainMenu: FC = () => {
  const [joinCode, setJoinCode] = useState("");
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

  const handleJoinGame = () => {
    if (joinCode.trim()) {
      navigate(`/game/${joinCode}/in-play`);
    }
  };

  return (
    <Stack spacing={4} alignItems="center" mt={10}>
      <Typography variant="h3">Poker Night</Typography>

      <Button variant="contained" onClick={handleCreateGame}>
        Create New Game
      </Button>

      <TextField
        label="Enter Game Code"
        value={joinCode}
        onChange={(e) => setJoinCode(e.target.value)}
      />
      <Button variant="outlined" onClick={handleJoinGame}>
        Join Game
      </Button>
    </Stack>
  );
};

export default MainMenu;
