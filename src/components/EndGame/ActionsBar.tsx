import { Button } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import ControlPanel from "../ControlPanel/ControlPanel";
import { calculatePayments } from "./utils/utils";
import { usePlayerStore } from "../../stores";
import { Payment } from "./utils/types";

type Props = {
  setPayments: Dispatch<SetStateAction<Payment[]>>;
  finalResults: number[];
  isPaymentsCalculated: boolean;
};

const ActionsBar: FC<Props> = ({
  finalResults,
  isPaymentsCalculated,
  setPayments,
}) => {
  const { players, startGame } = usePlayerStore();
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
          variant="contained"
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
