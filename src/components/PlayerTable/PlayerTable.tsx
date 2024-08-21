import { FC } from "react";
import { usePlayerStore } from "../../stores";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import PlayerRow from "./PlayerRow";

const PlayerTable: FC = () => {
  const { players } = usePlayerStore();

  return (
    <TableContainer component={Paper}>
      <Table size="small" sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Player name</TableCell>
            <TableCell align="right">Owe</TableCell>
            <TableCell align="right">Final</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player, index) => (
            <PlayerRow player={player} index={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlayerTable;
