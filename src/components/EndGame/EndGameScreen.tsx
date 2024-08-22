import React from "react";
import BalancesTable from "./BalancesTable";
import PaymentSummary from "./PaymentSummary";
import ActionsBar from "./ActionsBar";
import { usePlayerStore } from "../../stores/usePlayerStore";

const EndGameScreen: React.FC = () => {
  const { payments } = usePlayerStore();

  return (
    <div style={{ marginTop: "20px" }}>
      {payments?.length > 0 ? <PaymentSummary /> : <BalancesTable />}
      <ActionsBar />
    </div>
  );
};

export default EndGameScreen;
