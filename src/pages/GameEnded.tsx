import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Container,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Box,
  Stack,
} from "@mui/material";
import { Player } from "../types/player";
import { calculateDebts, DebtTransaction } from "../utils/debt";
import DebtTable from "../components/DebtTable";
import DebtGraph from "../components/DebtGraph";
import { formatDebtsForShare } from "../utils/shareMessage";
import { useNavigate } from "react-router-dom";
import { getFirestoreData } from "../utils/firestore";
import { FirestoreData } from "../types/firestore";
import PageBackground from "./PageBackground";

const GameEnded: FC = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [, setPlayers] = useState<Player[]>([]);
  const [view, setView] = useState<"table" | "graphic">("table");
  const [debts, setDebts] = useState<DebtTransaction[]>([]);

  useEffect(() => {
    if (!gameId) return;
    const fetch = async () => {
      const data = await getFirestoreData<FirestoreData>(gameId);
      if (data?.players) {
        setPlayers(data.players);
        setDebts(calculateDebts(data.players));
      }
    };
    fetch();
  }, [gameId]);

  const handleShare = () => {
    const message = formatDebtsForShare(debts);
    const encoded = encodeURIComponent(message);
    const link = `https://wa.me/?text=${encoded}`;
    window.open(link, "_blank");
  };

  return (
    <PageBackground imageUrl="ended.jpg">
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Stack spacing={4} alignItems="center">
          <Typography variant="h4" mt={4}>
            Final Results – Pay up, losers 💸
          </Typography>

          <Box
            mt={3}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button variant="contained" onClick={handleShare}>
              Share on WhatsApp
            </Button>
            <Button variant="outlined" onClick={() => navigate("/")}>
              Back to Main Menu
            </Button>
          </Box>

          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={(_, newView) => newView && setView(newView)}
          >
            <ToggleButton value="table">Table View</ToggleButton>
            <ToggleButton value="graphic">Graphic View</ToggleButton>
          </ToggleButtonGroup>

          <Box mt={4}>
            {view === "table" ? (
              <DebtTable debts={debts} />
            ) : (
              <DebtGraph debts={debts} />
            )}
          </Box>
        </Stack>
      </Container>
    </PageBackground>
  );
};

export default GameEnded;
