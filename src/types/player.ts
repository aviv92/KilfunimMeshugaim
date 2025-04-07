export type Player = {
  name: string;
  chips: number; // Final chips at end of game
  took: number; // Total chips the player took during the game
  leftEarly?: boolean;
};
