import { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Container, CircularProgress, Stack } from "@mui/material";
import { Player } from "../types/player";
import PlayerList from "../components/PlayerList";
import AddPlayerForm from "../components/AddPlayerForm";
import GameMenuDrawer from "../components/GameMenuDrawer";

const GameInPlay: FC = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();

  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    if (!gameId) return;

    const unsub = onSnapshot(doc(db, "games", gameId), (snap) => {
      const data = snap.data();

      if (data) {
        setPlayers(data.players || []);

        const localHostId = localStorage.getItem("hostId");
        setIsHost(data.hostId === localHostId);

        if (data.status !== "in-play") {
          navigate(`/game/${gameId}/${data.status}`);
        }
      }

      setLoading(false);
    });

    return () => unsub();
  }, [gameId, navigate]);

  if (loading) return <CircularProgress />;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Stack spacing={4} alignItems="center">
        <GameMenuDrawer
          isHost={isHost}
          gameId={gameId!}
          onEndGame={async () => {
            await updateDoc(doc(db, "games", gameId!), { status: "closing" });
          }}
        />

        {/* Add Player Form only if host */}
        {isHost && (
          <AddPlayerForm
            gameId={gameId!}
            existingPlayers={players.map((p) => p.name)}
          />
        )}

        <PlayerList players={players} gameId={gameId!} isHost={isHost} />
      </Stack>
    </Container>
  );
};

export default GameInPlay;
