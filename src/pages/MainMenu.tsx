// src/pages/MainMenu.tsx
import { FC } from "react";
import { Button, Stack, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { getFirestoreDocRef } from "../utils/firestore";

const MainMenu: FC = () => {
  const navigate = useNavigate();

  const handleCreateGame = async () => {
    const newGameId = uuidv4();
    const gameRef = getFirestoreDocRef(newGameId);

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

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Stack spacing={4} alignItems="center" mt={10}>
        <Typography variant="h4" fontWeight="bold">
          🐟 Kilfunim Meshugaim
        </Typography>

        <Button variant="contained" onClick={handleCreateGame}>
          Create New Game
        </Button>
      </Stack>
    </Container>
  );
};

export default MainMenu;
