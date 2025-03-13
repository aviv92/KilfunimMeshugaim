import { db } from "../firebase";
import { doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";
import { Player, Payment, FoodOrder } from "../stores/usePlayerStore";

export type GameState = {
  players: Player[];
  payments: Payment[];
  foodOrders: FoodOrder[];
};

export const saveGameState = async (gameId: string, data: GameState) => {
  await setDoc(doc(db, "games", gameId), data);
};

export const getGameState = async (
  gameId: string
): Promise<GameState | null> => {
  const docRef = doc(db, "games", gameId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) return docSnap.data() as GameState;
  return null;
};

export const subscribeToGameState = (
  gameId: string,
  onUpdate: (state: GameState) => void
) => {
  return onSnapshot(doc(db, "games", gameId), (docSnap) => {
    if (docSnap.exists()) {
      onUpdate(docSnap.data() as GameState);
    }
  });
};
