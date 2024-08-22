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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Player name</TableCell>
            <TableCell>Owes</TableCell>
            <TableCell>Final</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player, index) => (
            <PlayerRow key={player.id} player={player} index={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlayerTable;
