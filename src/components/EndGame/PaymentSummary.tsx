import {
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import ControlPanel from "../ControlPanel/ControlPanel";
import { Payment } from "./utils/types";

const PaymentSummary: FC<{ payments: Payment[] }> = ({ payments }) => (
  <ControlPanel>
    <Card>
      <CardContent>
        <Typography variant="h6">Payment Instructions</Typography>
        <List>
          {payments.map((payment, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText
                  primary={`${payment.from} should pay ${payment.to}`}
                  secondary={`Amount: ${payment.amount} shekels`}
                />
              </ListItem>
              {index < payments.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  </ControlPanel>
);

export default PaymentSummary;
