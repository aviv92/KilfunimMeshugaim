import { FC, useState } from "react";
import { usePlayerStore } from "../../stores";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from "@mui/material";
import PlayerRow from "./PlayerRow";
import { SortType } from "./types";

const PlayerTable: FC = () => {
  const { players } = usePlayerStore();
  const [sortDirection, setSortDirection] = useState<SortType>(SortType.ASC);

  const handleSortRequest = () => {
    setSortDirection((prev) =>
      prev === SortType.ASC ? SortType.DESC : SortType.ASC
    );
  };

  const sortedPlayers = [...players].sort((a, b) => {
    return sortDirection === SortType.ASC ? a.owed - b.owed : b.owed - a.owed;
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Player name</TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={true}
                direction={sortDirection}
                onClick={handleSortRequest}
              >
                Owes
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">Final</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedPlayers.map((player, index) => (
            <PlayerRow key={player.name} player={player} index={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlayerTable;
