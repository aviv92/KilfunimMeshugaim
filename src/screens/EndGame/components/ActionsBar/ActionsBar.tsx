import { Button } from "@mui/material";
import { FC } from "react";
import ControlPanel from "../../../../layout/ControlPanel/ControlPanel";
import { calculatePayments } from "../../utils/utils";
import { usePlayerStore } from "../../../../stores";
import WhatsAppShareButton from "../WhatsAppShareButton/WhatsAppShareButton";

const ActionsBar: FC = () => {
  const { players, startGame, payments, setPayments } = usePlayerStore();
  const finalResults = players.map((player) => player.finalResult || 0);
  const isPaymentsCalculated = payments.length > 0;
  return (
    <ControlPanel>
      {isPaymentsCalculated && (
        <>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setPayments([])}
          >
            Back
          </Button>
          <WhatsAppShareButton />
          <Button variant="contained" color="primary" onClick={startGame}>
            New Game
          </Button>
        </>
      )}
      {!isPaymentsCalculated && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setPayments(calculatePayments(players, finalResults))}
        >
          Next
        </Button>
      )}
    </ControlPanel>
  );
};

export default ActionsBar;
