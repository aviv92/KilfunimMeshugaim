import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { FC, Fragment } from "react";
import { Payment } from "../../../../stores";

type SummaryBoxProps = {
  payments: Payment[];
  subtitle: string;
};
const SummaryBox: FC<SummaryBoxProps> = ({ payments, subtitle }) => {
  if (payments.length === 0) return null;

  return (
    <Box mb={4}>
      <Typography variant="subtitle1">{subtitle}</Typography>
      <Divider />
      <List>
        {payments.map((payment, index) => (
          <Fragment key={`${payment.from}-${payment.to}`}>
            <ListItem>
              <ListItemText
                primary={`${payment.from} ===> ${payment.to} | ${payment.amount}`}
              />
            </ListItem>
            {index < payments.length - 1 && <Divider />}
          </Fragment>
        ))}
      </List>
    </Box>
  );
};

export default SummaryBox;
