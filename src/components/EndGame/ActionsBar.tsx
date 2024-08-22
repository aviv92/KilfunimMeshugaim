import { Button } from "@mui/material";
import { FC } from "react";
import ControlPanel from "../ControlPanel/ControlPanel";
import { calculatePayments } from "./utils/utils";
import { usePlayerStore } from "../../stores";

const ActionsBar: FC = () => {
  const { players, startGame, payments, setPayments } = usePlayerStore();
  const finalResults = players.map((player) => player.finalResult || 0);
  const isPaymentsCalculated = payments.length > 0;
  return (
    <ControlPanel>
      {!isPaymentsCalculated && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setPayments(calculatePayments(players, finalResults))}
        >
          Calculate Balances
        </Button>
      )}
      {isPaymentsCalculated && (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setPayments([])}
        >
          Reset payments
        </Button>
      )}
      {isPaymentsCalculated && (
        <Button variant="contained" color="primary" onClick={startGame}>
          Start New Game
        </Button>
      )}
    </ControlPanel>
  );
};

export default ActionsBar;
