import { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";
import { Container, Typography, CircularProgress } from "@mui/material";
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
  const [hostRequests, setHostRequests] = useState<string[]>([]);

  useEffect(() => {
    if (!gameId) return;

    const unsub = onSnapshot(doc(db, "games", gameId), (snap) => {
      const data = snap.data();

      if (data) {
        setPlayers(data.players || []);

        const localHostId = localStorage.getItem("hostId");
        setIsHost(data.hostId === localHostId);

        if (data.hostRequests) {
          setHostRequests(data.hostRequests);
        }

        if (data.status !== "in-play") {
          navigate(`/game/${gameId}/${data.status}`);
        }
      }

      setLoading(false);
    });

    return () => unsub();
  }, [gameId, navigate]);

  const guestId = localStorage.getItem("guestId")!;
  const handleRequestHost = async () => {
    const gameRef = doc(db, "games", gameId!);
    await updateDoc(gameRef, {
      hostRequests: arrayUnion(guestId),
    });
    alert("Request sent to host!");
  };

  const handleApproveHost = async (id: string) => {
    const gameRef = doc(db, "games", gameId!);
    await updateDoc(gameRef, {
      hostId: id,
      hostRequests: [], // or remove just the approved one
    });
    alert("New host assigned!");
  };
  if (loading) return <CircularProgress />;

  return (
    <Container>
      <Typography variant="h4" mt={4}>
        Game: {gameId}
      </Typography>

      <GameMenuDrawer
        isHost={isHost}
        gameId={gameId!}
        onEndGame={async () => {
          await updateDoc(doc(db, "games", gameId!), { status: "closing" });
        }}
        onRequestHost={handleRequestHost}
        hostRequests={hostRequests}
        onApproveHost={handleApproveHost}
      />

      {/* Add Player Form only if host */}
      {isHost && (
        <AddPlayerForm
          gameId={gameId!}
          existingPlayers={players.map((p) => p.name)}
        />
      )}

      <PlayerList players={players} gameId={gameId!} isHost={isHost} />
    </Container>
  );
};

export default GameInPlay;
