import { Card, CardContent, Typography } from "@mui/material";
import { FC } from "react";
import ControlPanel from "../../../../layout/ControlPanel/ControlPanel";
import { usePlayerStore } from "../../../../stores/usePlayerStore";
import SummaryBox from "./SummaryBox";
import { getAllPayments } from "./utils/utils";

const PaymentSummary: FC = () => {
  const { payments, foodOrders } = usePlayerStore();

  const { foodPayments, gamePayments, netPayments } = getAllPayments(
    payments,
    foodOrders
  );

  return (
    <ControlPanel>
      <Card>
        <CardContent>
          <Typography variant="h6">Payment Instructions</Typography>
          <SummaryBox payments={netPayments} subtitle="Net payments" />

          <SummaryBox payments={gamePayments} subtitle="Game payments" />

          <SummaryBox payments={foodPayments} subtitle="Food payments" />
        </CardContent>
      </Card>
    </ControlPanel>
  );
};

export default PaymentSummary;
