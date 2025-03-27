// src/components/PlayerList.tsx
import { FC } from "react";
import PlayerCard from "./PlayerCard";
import { Stack } from "@mui/material";
import { Player } from "../types/player";

interface PlayerListProps {
  players: Player[];
  gameId: string;
  isHost?: boolean;
}

const PlayerList: FC<PlayerListProps> = ({ players, gameId, isHost }) => (
  <Stack spacing={2}>
    {players.map((player) => (
      <PlayerCard
        key={player.name}
        gameId={gameId}
        {...player}
        isHost={isHost}
      />
    ))}
  </Stack>
);

export default PlayerList;
