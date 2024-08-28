import { Button } from "@mui/material";
import { FC } from "react";
import ControlPanel from "../../../../layout/ControlPanel/ControlPanel";
import { calculatePayments } from "../../utils/utils";
import { usePlayerStore } from "../../../../stores";
import WhatsAppShareButton from "../WhatsAppShareButton/WhatsAppShareButton";
import { isReadOnlyMode } from "../../../../utils/serializeState";

const ActionsBar: FC = () => {
  const { players, startGame, payments, setPayments } = usePlayerStore();
  const finalResults = players.map((player) => player.finalResult || 0);
  const isPaymentsCalculated = payments.length > 0;

  const readOnly = isReadOnlyMode();
  return (
    <ControlPanel>
      {isPaymentsCalculated && (
        <>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setPayments([])}
            disabled={readOnly}
          >
            Back
          </Button>
          <WhatsAppShareButton />
          <Button
            disabled={readOnly}
            variant="contained"
            color="primary"
            onClick={startGame}
          >
            New Game
          </Button>
        </>
      )}
      {!isPaymentsCalculated && (
        <Button
          disabled={readOnly}
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
