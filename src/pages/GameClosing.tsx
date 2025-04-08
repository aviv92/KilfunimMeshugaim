import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { onSnapshot } from "firebase/firestore";
import {
  Container,
  Typography,
  TextField,
  Stack,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Player } from "../types/player";
import { getFirestoreDocRef, updateFirestoreData } from "../utils/firestore";
import PageBackground from "./PageBackground";

const GameClosing: FC = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>([]);
  const [finalChipsMap, setFinalChipsMap] = useState<Record<string, string>>(
    {}
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const totalTaken = players.reduce((sum, p) => sum + p.took, 0);
  const totalFinal = Object.values(finalChipsMap).reduce(
    (sum, val) => sum + (Number(val) || 0),
    0
  );
  const remainingBalance = totalTaken - totalFinal;

  useEffect(() => {
    if (!gameId) return;

    const gameRef = getFirestoreDocRef(gameId);
    const unsub = onSnapshot(gameRef, (snap) => {
      const data = snap.data();
      if (!data) return;

      if (data.status !== "closing") {
        navigate(`/game/${gameId}/${data.status}`);
      }

      setPlayers(data.players || []);

      const map: Record<string, string> = {};
      data.players.forEach((p: Player) => {
        map[p.name] = String(p.chips ?? "");
      });
      setFinalChipsMap(map);
      setLoading(false);
    });

    return () => unsub();
  }, [gameId, navigate]);

  const handleChange = (name: string, value: string) => {
    setFinalChipsMap((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const updated = players.map((p) => {
      const final = Number(finalChipsMap[p.name]);
      return { ...p, chips: final };
    });

    const totalFinal = updated.reduce(
      (acc, p) => acc + (Number(p.chips) || 0),
      0
    );

    if (totalFinal !== totalTaken) {
      setError(
        `Total chips must equal ${remainingBalance}, but got ${totalFinal}`
      );
      return;
    }

    await updateFirestoreData(gameId!, {
      players: updated,
      status: "ended",
    });

    navigate(`/game/${gameId}/ended`);
  };

  if (loading) return <CircularProgress />;

  return (
    <PageBackground imageUrl="game-closing.jpg">
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Stack spacing={4} alignItems="center">
          <Typography variant="h4" mt={4}>
            Final Chip Count
          </Typography>

          {players.map((p) => (
            <TextField
              key={p.name}
              label={p.name}
              type="number"
              value={finalChipsMap[p.name] || ""}
              onChange={(e) => handleChange(p.name, e.target.value)}
            />
          ))}

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Typography mt={2}>
            Balance remaining: {remainingBalance} chips
          </Typography>

          <Button variant="contained" sx={{ mt: 3 }} onClick={handleSubmit}>
            Finish & Show Results
          </Button>
        </Stack>
      </Container>
    </PageBackground>
  );
};

export default GameClosing;
