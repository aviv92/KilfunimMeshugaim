import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
} from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import { usePlayerStore } from "../../stores";

type Props = {
  finalResults: number[];
  setFinalResults: Dispatch<SetStateAction<number[]>>;
};

const BalancesTable: FC<Props> = ({ finalResults, setFinalResults }) => {
  const { players } = usePlayerStore();

  const handleFinalResultChange = (index: number, value: number) => {
    const newFinalResults = [...finalResults];
    newFinalResults[index] = value;
    setFinalResults(newFinalResults);
  };

  const calculateTotalBalance = () =>
    players
      .map((player, index) => ({
        name: player.name,
        balance: finalResults[index] - player.owed,
      }))
      .reduce((sum, player) => sum + player.balance, 0);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Player Name</TableCell>
            <TableCell align="right">Owed</TableCell>
            <TableCell align="right">Final Result</TableCell>
            <TableCell align="right">Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player, index) => (
            <TableRow key={player.name}>
              <TableCell component="th" scope="row">
                {player.name}
              </TableCell>
              <TableCell align="right">{player.owed}</TableCell>
              <TableCell align="right">
                <TextField
                  type="number"
                  value={finalResults[index]}
                  onChange={(e) =>
                    handleFinalResultChange(index, parseFloat(e.target.value))
                  }
                  variant="outlined"
                  size="small"
                />
              </TableCell>
              <TableCell align="right">
                {finalResults[index] - player.owed}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={3} align="right">
              <strong>Total Balance</strong>
            </TableCell>
            <TableCell align="right">
              <strong>{calculateTotalBalance()}</strong>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BalancesTable;
