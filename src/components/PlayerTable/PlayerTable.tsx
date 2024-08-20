import React from "react";
import { usePlayerStore, useSettingsStore } from "../../stores";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const PlayerTable: React.FC = () => {
  const { players, updateOwed, usedShowMe, quitPlayer } = usePlayerStore();
  const { defaultRebuy } = useSettingsStore();

  const handleAddAmount = (index: number, amount: number) => {
    updateOwed(index, amount);
  };

  const handleQuitPlayer = (index: number) => {
    const finalResult = prompt("Enter final amount");
    if (finalResult !== null) {
      quitPlayer(index, parseFloat(finalResult));
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left"></TableCell>
            <TableCell align="right">תוצאה סופית</TableCell>
            <TableCell align="right">מושקע</TableCell>
            <TableCell align="right">שחקן</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player, index) => (
            <TableRow key={player.name}>
              <TableCell align="left">
                <IconButton
                  color="error"
                  onClick={() => handleQuitPlayer(index)}
                  disabled={player.hasQuit}
                >
                  <ExitToAppIcon />
                </IconButton>
                <IconButton
                  color={player.showMe ? "secondary" : "default"}
                  onClick={() => usedShowMe(index)}
                  disabled={!player.showMe || player.hasQuit}
                >
                  {player.showMe ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
                <IconButton
                  color="primary"
                  onClick={() => handleAddAmount(index, defaultRebuy)}
                  disabled={player.hasQuit}
                >
                  <AddIcon />
                </IconButton>
              </TableCell>
              <TableCell align="right">
                {player.hasQuit ? player?.finalResult : "-"}
              </TableCell>
              <TableCell align="right">{player.owed}</TableCell>
              <TableCell align="right" component="th" scope="row">
                {player.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlayerTable;
