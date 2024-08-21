import { FC } from "react";

import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveIcon from "@mui/icons-material/Remove";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { IconButton } from "@mui/material";
import { usePlayerStore, useSettingsStore } from "../../stores";
import { PlayerRowProps } from "./types";

const PlayerActions: FC<PlayerRowProps> = ({ index, player }) => {
  const { updateOwed, usedShowMe, quitPlayer } = usePlayerStore();
  const { defaultRebuy } = useSettingsStore();

  const handleQuitPlayer = (index: number) => {
    const finalResult = prompt("Enter final amount");
    if (finalResult !== null) {
      quitPlayer(index, parseFloat(finalResult));
    }
  };
  return (
    <>
      <IconButton
        color="primary"
        onClick={() => updateOwed(index, defaultRebuy)}
        disabled={player.hasQuit}
      >
        <AddIcon />
      </IconButton>
      <IconButton
        color={player.showMe ? "secondary" : "default"}
        onClick={() => usedShowMe(index)}
        disabled={!player.showMe || player.hasQuit}
      >
        {player.showMe ? <VisibilityIcon /> : <VisibilityOffIcon />}
      </IconButton>
      <IconButton
        color="secondary"
        onClick={() => updateOwed(index, defaultRebuy * -1)}
        disabled={player.hasQuit || player.owed === defaultRebuy}
      >
        <RemoveIcon />
      </IconButton>
      <IconButton
        color="error"
        onClick={() => handleQuitPlayer(index)}
        disabled={player.hasQuit}
      >
        <ExitToAppIcon />
      </IconButton>
    </>
  );
};

export default PlayerActions;
