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
import { FC } from "react";
import { usePlayerStore } from "../../../../stores";

const BalancesTable: FC = () => {
  const { players, quitPlayer } = usePlayerStore();
  const finalResults = players.map((player) => player.finalResult || 0);

  const handleFinalResultChange = (id: string, value: number) => {
    quitPlayer(id, value);
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
      <Table size="small">
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
            <TableRow key={player.id}>
              <TableCell component="th" scope="row">
                {player.name}
              </TableCell>
              <TableCell align="right">{player.owed}</TableCell>
              <TableCell align="right">
                <TextField
                  type="number"
                  value={finalResults[index]}
                  onChange={(e) =>
                    handleFinalResultChange(
                      player.id,
                      parseFloat(e.target.value)
                    )
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
