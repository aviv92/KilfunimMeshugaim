import { FC } from "react";

import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveIcon from "@mui/icons-material/Remove";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { IconButton } from "@mui/material";
import { DEFAULT_REBUY, usePlayerStore } from "../../../../stores";
import { PlayerRowProps } from "./utils/types";

const PlayerActions: FC<PlayerRowProps> = ({ player }) => {
  const { updateOwed, usedShowMe, quitPlayer } = usePlayerStore();

  const handleQuitPlayer = () => {
    const finalResult = prompt("Enter final amount");
    if (finalResult !== null) {
      quitPlayer(player.id, parseFloat(finalResult));
    }
  };
  return (
    <>
      <IconButton
        color="primary"
        onClick={() => updateOwed(player.id, DEFAULT_REBUY)}
        disabled={player.hasQuit}
      >
        <AddIcon />
      </IconButton>
      <IconButton
        color={player.showMe ? "secondary" : "default"}
        onClick={() => usedShowMe(player.id)}
        disabled={!player.showMe || player.hasQuit}
      >
        {player.showMe ? <VisibilityIcon /> : <VisibilityOffIcon />}
      </IconButton>
      <IconButton
        color="secondary"
        onClick={() => updateOwed(player.id, DEFAULT_REBUY * -1)}
        disabled={player.hasQuit || player.owed === DEFAULT_REBUY}
      >
        <RemoveIcon />
      </IconButton>
      <IconButton
        color="error"
        onClick={() => handleQuitPlayer()}
        disabled={player.hasQuit}
      >
        <ExitToAppIcon />
      </IconButton>
    </>
  );
};

export default PlayerActions;
