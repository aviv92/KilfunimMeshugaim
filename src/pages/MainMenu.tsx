import { FC } from "react";
import { Button, Container, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { getFirestoreDocRef } from "../utils/firestore";
import PageBackground from "./PageBackground";

const MainMenu: FC = () => {
  const navigate = useNavigate();

  const handleCreateGame = async () => {
    const newGameId = uuidv4();
    const gameRef = getFirestoreDocRef(newGameId);

    await setDoc(gameRef, {
      status: "in-play",
      players: [],
      createdAt: Date.now(),
    });

    navigate(`/game/${newGameId}/in-play`);
  };

  return (
    <PageBackground imageUrl="main.jpg">
      <Container
        maxWidth="sm"
        sx={{
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Stack spacing={4} alignItems="center">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FFD700",
              color: "#222",
              fontWeight: "bold",
              fontSize: "1.4rem",
              padding: "1rem 2.5rem",
              borderRadius: "50px",
              boxShadow: "0 6px 16px rgba(0,0,0,0.4)",
              textTransform: "none",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#FFB800",
                transform: "scale(1.05)",
              },
            }}
            onClick={handleCreateGame}
          >
            New Game
          </Button>
        </Stack>
      </Container>
    </PageBackground>
  );
};

export default MainMenu;
