import { Player } from "../../stores/usePlayerStore";

export type PlayerRowProps = {
  player: Player;
  index: number;
};

export enum SortType {
  ASC = "asc",
  DESC = "desc",
}
