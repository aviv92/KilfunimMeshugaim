import { TableRow, TableCell } from "@mui/material";
import { FC } from "react";
import { PlayerRowProps } from "./types";
import PlayerActions from "./PlayerActions";

const PlayerRow: FC<PlayerRowProps> = ({ player, index }) => {
  return (
    <TableRow key={player.name}>
      <TableCell>{player.name}</TableCell>
      <TableCell align="right">{player.owed}</TableCell>
      <TableCell align="right">
        {player.hasQuit ? player.finalResult : "-"}
      </TableCell>
      <TableCell align="right">
        <PlayerActions player={player} index={index} />
      </TableCell>
    </TableRow>
  );
};

export default PlayerRow;
