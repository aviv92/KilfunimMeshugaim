// src/components/PlayerList.tsx
import { FC } from "react";
import PlayerCard from "./PlayerCard";
import { Grid } from "@mui/material";
import { Player } from "../types/player";

interface PlayerListProps {
  players: Player[];
  gameId: string;
  isHost?: boolean;
}

const PlayerList: FC<PlayerListProps> = ({ players, gameId, isHost }) => (
  <Grid container spacing={2}>
    {players.map((player) => (
      <Grid item xs={12} sm={6} md={4} key={player.name}>
        <PlayerCard
          key={player.name}
          gameId={gameId}
          {...player}
          isHost={isHost}
        />
      </Grid>
    ))}
  </Grid>
);

export default PlayerList;
