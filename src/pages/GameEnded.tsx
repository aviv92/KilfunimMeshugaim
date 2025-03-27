import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  Container,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Box,
} from "@mui/material";
import { Player } from "../types/player";
import { calculateDebts, DebtTransaction } from "../utils/debt";
import DebtTable from "../components/DebtTable";
import DebtGraph from "../components/DebtGraph";
import { formatDebtsForShare } from "../utils/shareMessage";
import { useNavigate } from "react-router-dom";

const GameEnded: FC = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [, setPlayers] = useState<Player[]>([]);
  const [view, setView] = useState<"table" | "graphic">("table");
  const [debts, setDebts] = useState<DebtTransaction[]>([]);

  useEffect(() => {
    if (!gameId) return;
    const fetch = async () => {
      const docSnap = await getDoc(doc(db, "games", gameId));
      const data = docSnap.data();
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
    <Container>
      <Typography variant="h4" mt={4}>
        Final Results
      </Typography>

      <Box
        mt={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(_, newView) => newView && setView(newView)}
        >
          <ToggleButton value="table">Table View</ToggleButton>
          <ToggleButton value="graphic">Graphic View</ToggleButton>
        </ToggleButtonGroup>

        <Button variant="contained" onClick={handleShare}>
          Share on WhatsApp
        </Button>
        <Button variant="outlined" onClick={() => navigate("/")}>
          Back to Main Menu
        </Button>
      </Box>

      <Box mt={4}>
        {view === "table" ? (
          <DebtTable debts={debts} />
        ) : (
          <DebtGraph debts={debts} />
        )}
      </Box>
    </Container>
  );
};

export default GameEnded;
