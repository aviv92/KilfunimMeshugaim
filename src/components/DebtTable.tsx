import { FC } from "react";
import { DebtTransaction } from "../utils/debt";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

interface Props {
  debts: DebtTransaction[];
}

const DebtTable: FC<Props> = ({ debts }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>From</TableCell>
          <TableCell>To</TableCell>
          <TableCell align="right">Amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {debts.map((d, i) => (
          <TableRow key={i}>
            <TableCell>{d.from}</TableCell>
            <TableCell>{d.to}</TableCell>
            <TableCell align="right">{d.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DebtTable;
