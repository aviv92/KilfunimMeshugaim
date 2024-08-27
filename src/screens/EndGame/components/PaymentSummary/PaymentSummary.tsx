import {
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import React, { FC } from "react";
import ControlPanel from "../../../../layout/ControlPanel/ControlPanel";
import { usePlayerStore } from "../../../../stores/usePlayerStore";

const PaymentSummary: FC = () => {
  const { payments, foodOrders } = usePlayerStore();

  // First list: Game Payments
  const gamePayments = [...payments];

  // Second list: Food Order Payments
  const foodPayments = foodOrders.flatMap((order) => {
    const tipPerPerson = order.tip / (order.participants.length + 1); // participants + payer
    return order.participants.map((participant) => ({
      from: participant,
      to: order.payer,
      amount: order.foodCosts[participant] + tipPerPerson,
    }));
  });

  // Third list: Combined Payments
  const combinedPayments: Record<string, Record<string, number>> = {};

  // Process game payments
  gamePayments.forEach((payment) => {
    if (!combinedPayments[payment.from]) combinedPayments[payment.from] = {};
    if (!combinedPayments[payment.to]) combinedPayments[payment.to] = {};
    combinedPayments[payment.from][payment.to] =
      (combinedPayments[payment.from][payment.to] || 0) + payment.amount;
  });

  // Process food payments
  foodPayments.forEach((payment) => {
    if (!combinedPayments[payment.from]) combinedPayments[payment.from] = {};
    if (!combinedPayments[payment.to]) combinedPayments[payment.to] = {};
    combinedPayments[payment.from][payment.to] =
      (combinedPayments[payment.from][payment.to] || 0) + payment.amount;
  });

  // Calculate net payments
  const netPayments: { from: string; to: string; amount: number }[] = [];
  Object.keys(combinedPayments).forEach((payer) => {
    Object.keys(combinedPayments[payer]).forEach((payee) => {
      const payerOwes = combinedPayments[payer][payee] || 0;
      const payeeOwes = combinedPayments[payee][payer] || 0;
      const netAmount = payerOwes - payeeOwes;
      if (netAmount > 0) {
        netPayments.push({ from: payer, to: payee, amount: netAmount });
      }
    });
  });

  return (
    <ControlPanel>
      <Card>
        <CardContent>
          <Typography variant="h6">Payment Instructions</Typography>
          {/* Combined Payments */}
          {netPayments.length > 0 && (
            <Box mb={4}>
              <Typography variant="subtitle1">Net Payments</Typography>
              <Divider />
              <List>
                {netPayments.map((payment, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={`${payment.from} should pay ${payment.to}`}
                        secondary={`Amount: ${payment.amount} shekels`}
                      />
                    </ListItem>
                    {index < netPayments.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Box>
          )}

          {/* Game Payments */}
          {gamePayments.length > 0 && (
            <Box mb={4}>
              <Typography variant="subtitle1">Game Payments</Typography>
              <Divider />
              <List>
                {gamePayments.map((payment, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={`${payment.from} should pay ${payment.to}`}
                        secondary={`Amount: ${payment.amount} shekels`}
                      />
                    </ListItem>
                    {index < gamePayments.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Box>
          )}

          {/* Food Order Payments */}
          {foodPayments.length > 0 && (
            <Box mb={4}>
              <Typography variant="subtitle1">Food Order Payments</Typography>
              <Divider />
              <List>
                {foodPayments.map((payment, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={`${payment.from} should pay ${payment.to}`}
                        secondary={`Amount: ${payment.amount} shekels`}
                      />
                    </ListItem>
                    {index < foodPayments.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Box>
          )}
        </CardContent>
      </Card>
    </ControlPanel>
  );
};

export default PaymentSummary;
