import React from "react";
import BalancesTable from "./components/BalancesTable/BalancesTable";
import PaymentSummary from "./components/PaymentSummary/PaymentSummary";
import ActionsBar from "./components/ActionsBar/ActionsBar";
import { usePlayerStore } from "../../stores/usePlayerStore";

const EndGame: React.FC = () => {
  const { payments } = usePlayerStore();

  return (
    <div style={{ marginTop: "20px" }}>
      {payments?.length > 0 ? <PaymentSummary /> : <BalancesTable />}
      <ActionsBar />
    </div>
  );
};

export default EndGame;
