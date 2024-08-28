import { FC } from "react";
import BalancesTable from "./components/BalancesTable/BalancesTable";
import PaymentSummary from "./components/PaymentSummary/PaymentSummary";
import ActionsBar from "./components/ActionsBar/ActionsBar";
import { usePlayerStore } from "../../stores/usePlayerStore";

const EndGame: FC = () => {
  const { payments } = usePlayerStore();

  return (
    <div style={{ marginTop: "20px" }}>
      {payments?.length > 0 ? <PaymentSummary /> : <BalancesTable />}
      <ActionsBar />
    </div>
  );
};

export default EndGame;
