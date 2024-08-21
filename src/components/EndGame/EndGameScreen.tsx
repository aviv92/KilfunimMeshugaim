import React, { useState } from "react";
import { usePlayerStore } from "../../stores";
import BalancesTable from "./BalancesTable";
import { Payment } from "./utils/types";
import PaymentSummary from "./PaymentSummary";
import ActionsBar from "./ActionsBar";

const EndGameScreen: React.FC = () => {
  const { players } = usePlayerStore();
  const [finalResults, setFinalResults] = useState(
    players.map((player) => player.finalResult || 0)
  );
  const [payments, setPayments] = useState<Payment[]>([]);

  return (
    <div style={{ marginTop: "20px" }}>
      {payments?.length > 0 ? (
        <PaymentSummary payments={payments} />
      ) : (
        <BalancesTable
          finalResults={finalResults}
          setFinalResults={setFinalResults}
        />
      )}

      <ActionsBar
        finalResults={finalResults}
        isPaymentsCalculated={payments?.length > 0}
        setPayments={setPayments}
      />
    </div>
  );
};

export default EndGameScreen;
