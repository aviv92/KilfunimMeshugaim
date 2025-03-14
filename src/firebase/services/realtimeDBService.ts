import { db } from "../../firebase";
import { ref, set, get, onValue } from "firebase/database";
import { Player, Payment, FoodOrder } from "../../stores/usePlayerStore";

export type GameState = {
  players: Player[];
  payments: Payment[];
  foodOrders: FoodOrder[];
};

export const saveGameState = async (gameId: string, data: GameState) => {
  await set(ref(db, `games/${gameId}`), data);
};

export const getGameState = async (
  gameId: string
): Promise<GameState | null> => {
  const snapshot = await get(ref(db, `games/${gameId}`));
  if (snapshot.exists()) {
    return snapshot.val();
  }
  return null;
};

export const subscribeToGameState = (
  gameId: string,
  onUpdate: (state: GameState) => void
) => {
  const gameRef = ref(db, `games/${gameId}`);
  const unsubscribe = onValue(gameRef, (snapshot) => {
    const data = snapshot.val();
    if (data) onUpdate(data);
  });

  return unsubscribe;
};
