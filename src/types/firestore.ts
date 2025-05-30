import { Player } from "./player";

export type FirestoreData = {
  createdAt: number; // represents the timestamp of when the document was created
  status: string; // represents the current status of the game in-play | closing | ended
  hostIds: string[]; // represents the host IDs of the game
  players: Player[]; // represents the players in the game
};
