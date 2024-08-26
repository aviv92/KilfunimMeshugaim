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
import ControlPanel from "../../../../layout/ControlPanel/ControlPanel";
import { usePlayerStore } from "../../../../stores/usePlayerStore";

const PaymentSummary: FC = () => {
  const { payments } = usePlayerStore();
  return (
    <ControlPanel>
      <Card>
        <CardContent>
          <Typography variant="h6">Payment Instructions</Typography>
          <List>
            {payments.map((payment, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText
                    primary={`${payment.from} ==> ${payment.to} | ${payment.amount}`}
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
};

export default PaymentSummary;
