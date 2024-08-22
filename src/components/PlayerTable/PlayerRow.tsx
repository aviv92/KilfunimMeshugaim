import { TableRow, TableCell, Avatar, Stack } from "@mui/material";
import { FC } from "react";
import { PlayerRowProps } from "./types";
import PlayerActions from "./PlayerActions";
import { fishMapper } from "./fish-mapper";

const PlayerRow: FC<PlayerRowProps> = ({ player, index }) => {
  return (
    <TableRow key={player.name}>
      <TableCell>
        <Stack direction="row" gap={2}>
          <Avatar
            alt="Random fish"
            src={`public/assets/${fishMapper[index]}.png`}
          />{" "}
          <div style={{ display: "flex", alignItems: "center" }}>
            {player.name}
          </div>
        </Stack>
      </TableCell>
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
