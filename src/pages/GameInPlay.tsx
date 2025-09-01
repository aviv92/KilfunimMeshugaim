import { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { onSnapshot } from "firebase/firestore";
import { Container, CircularProgress, Stack } from "@mui/material";
import { Player } from "../types/player";
import PlayerList from "../components/PlayerList";
import AddPlayerForm from "../components/AddPlayerForm";
import GameMenuDrawer from "../components/GameMenuDrawer";
import FishLevelUpOverlay from "../components/FishLevelUpOverlay";
import { getFishImage, getFishLevelUpMessage } from "../utils/fish";
import { getFirestoreDocRef, updateFirestoreData } from "../utils/firestore";
import PageBackground from "./PageBackground";

const GameInPlay: FC = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();

  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFishLevelUp, setShowFishLevelUp] = useState(false);
  const [fishOverlayData, setFishOverlayData] = useState<{
    name: string;
    newTook: number;
  } | null>(null);

  useEffect(() => {
    if (!gameId) return;
    const docRef = getFirestoreDocRef(gameId);

    const unsub = onSnapshot(docRef, (snap) => {
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
            updateFirestoreData(gameId, {
              fishLevelUp: null,
            });
          }, 3100);
        }

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
    <PageBackground imageUrl="in-play.jpg">
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Stack spacing={4} alignItems="center">
          <GameMenuDrawer gameId={gameId!} />

          <AddPlayerForm
            gameId={gameId!}
            existingPlayers={players.map((p) => p.name)}
          />

          <PlayerList players={players} gameId={gameId!} />
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
    </PageBackground>
  );
};

export default GameInPlay;
