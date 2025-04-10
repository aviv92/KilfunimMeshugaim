import { FC, useState } from "react";
import {
  Card,
  Typography,
  IconButton,
  Stack,
  CardContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { updateDoc } from "firebase/firestore";
import { DEFAULT_CHIP_AMOUNT } from "../../utils/constants";
import { getFishImage } from "../../utils/fish";
import { Player } from "../../types/player";
import { getFirestoreData, getFirestoreDocRef } from "../../utils/firestore";
import { FirestoreData } from "../../types/firestore";

import LeaveEarlyDialog from "./components/LeaveEarlyDialog";
import AtmDialog from "./components/AtmDialog";

interface PlayerCardProps extends Player {
  gameId: string;
  isHost?: boolean;
}

const PlayerCard: FC<PlayerCardProps> = ({
  gameId,
  name,
  chips,
  took,
  leftEarly,
  isHost,
}) => {
  const [leaveOpen, setLeaveOpen] = useState(false);
  const [atmOpen, setAtmOpen] = useState(false);

  const updatePlayerChips = async (delta: number) => {
    const gameRef = getFirestoreDocRef(gameId);
    const data = await getFirestoreData<FirestoreData>(gameId);
    const players: Player[] = data?.players ?? [];
    let newTook = 0;

    const updated = players.map((p: Player) => {
      if (p.name !== name) return p;

      newTook = p.took + delta;
      if (newTook < DEFAULT_CHIP_AMOUNT) {
        alert("You can't take less than the initial amount!");
        return;
      }

      return { ...p, took: newTook };
    });

    await updateDoc(gameRef, {
      players: updated,
      fishLevelUp: {
        name,
        newTook,
        timestamp: Date.now(),
      },
    });
  };

  return (
    <>
      <Card>
        <CardContent>
          <Stack spacing={2} alignItems="center">
            {/* Player Name */}
            <Stack direction="row" spacing={2} justifyContent="center">
              <Typography variant="h6" fontWeight="bold">
                {name} {chips ? chips - took : took}
              </Typography>
            </Stack>

            {/* Took & Chips */}
            {/* <Stack direction="row" spacing={2} justifyContent="center">
              <Typography variant="body2">🎲 Took: {took}</Typography>
              {chips && (
                <Typography variant="body2">💰 Final: {chips}</Typography>
              )}
            </Stack> */}

            {/* Fish Image */}
            <img src={getFishImage(took)} alt="fish" style={{ height: 60 }} />

            {/* Action Buttons */}
            {isHost && (
              <Stack direction="row" spacing={1} justifyContent="center">
                <IconButton
                  onClick={() => setAtmOpen(true)}
                  disabled={leftEarly}
                >
                  <AddIcon />
                </IconButton>
                <IconButton
                  onClick={() => updatePlayerChips(-DEFAULT_CHIP_AMOUNT)}
                  disabled={leftEarly}
                >
                  <RemoveIcon />
                </IconButton>
                <IconButton
                  onClick={() => setLeaveOpen(true)}
                  disabled={leftEarly}
                >
                  <ExitToAppIcon />
                </IconButton>
              </Stack>
            )}
          </Stack>
        </CardContent>
      </Card>

      <LeaveEarlyDialog
        gameId={gameId}
        name={name}
        leaveOpen={leaveOpen}
        setLeaveOpen={setLeaveOpen}
      />

      <AtmDialog
        atmOpen={atmOpen}
        setAtmOpen={setAtmOpen}
        updatePlayerChips={updatePlayerChips}
      />
    </>
  );
};

export default PlayerCard;
