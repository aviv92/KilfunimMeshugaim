import { TableRow, TableCell, Stack, Box, Tooltip } from "@mui/material";
import { FC } from "react";
import { PlayerRowProps } from "./utils/types";
import PlayerActions from "./PlayerActions";
import { getFishImage } from "./utils/fish-mapper";

const PlayerRow: FC<PlayerRowProps> = ({ player, index }) => {
  return (
    <TableRow key={player.id}>
      <TableCell>
        <Stack direction="row" gap={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <Tooltip title={`${player.name} Owes: ${player.owed}`}>
              <img
                src={getFishImage(player.owed)}
                alt="fish"
                width={32}
                height={32}
                style={{ objectFit: "contain" }}
              />
            </Tooltip>
          </Box>
          <div style={{ display: "flex", alignItems: "center" }}>
            {player.name}
          </div>
        </Stack>
      </TableCell>
      <TableCell>{player.owed}</TableCell>
      <TableCell>{player.hasQuit ? player.finalResult : "-"}</TableCell>
      <TableCell>
        <PlayerActions player={player} index={index} />
      </TableCell>
    </TableRow>
  );
};

export default PlayerRow;
