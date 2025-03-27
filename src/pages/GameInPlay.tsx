import { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Container, CircularProgress, Stack } from "@mui/material";
import { Player } from "../types/player";
import PlayerList from "../components/PlayerList";
import AddPlayerForm from "../components/AddPlayerForm";
import GameMenuDrawer from "../components/GameMenuDrawer";
import FishLevelUpOverlay from "../components/FishLevelUpOverlay";
import { getFishImage, getFishLevelUpMessage } from "../utils/fish";

const GameInPlay: FC = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();

  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [isHost, setIsHost] = useState(false);
  const [showFishLevelUp, setShowFishLevelUp] = useState(false);
  const [fishOverlayData, setFishOverlayData] = useState<{
    name: string;
    newTook: number;
  } | null>(null);

  useEffect(() => {
    if (!gameId) return;

    const unsub = onSnapshot(doc(db, "games", gameId), (snap) => {
      const data = snap.data();

      if (data) {
        setPlayers(data.players || []);

        const fish = data.fishLevelUp;
        const lastSeen = localStorage.getItem("lastFishLevelUp") || "0";

        if (fish && fish.timestamp > Number(lastSeen)) {
          localStorage.setItem("lastFishLevelUp", String(fish.timestamp));
          setFishOverlayData({ name: fish.name, newTook: fish.newTook });
          setShowFishLevelUp(true);

          setTimeout(() => {
            updateDoc(doc(db, "games", gameId!), {
              fishLevelUp: null,
            });
          }, 3100);
        }

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

      {fishOverlayData && (
        <FishLevelUpOverlay
          open={showFishLevelUp}
          playerName={fishOverlayData.name}
          fishImg={getFishImage(fishOverlayData.newTook)}
          message={getFishLevelUpMessage(
            fishOverlayData.name,
            fishOverlayData.newTook
          )}
          onClose={() => setShowFishLevelUp(false)}
        />
      )}
    </Container>
  );
};

export default GameInPlay;
