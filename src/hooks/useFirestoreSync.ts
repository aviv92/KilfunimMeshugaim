import { useEffect } from "react";
import { usePlayerStore } from "../stores";
import {
  subscribeToGameState,
  saveGameState,
} from "../services/firestoreService";
import { GameState } from "../services/firestoreService";

export const useFirestoreSync = (
  gameId: string,
  isReadOnly: boolean = false
) => {
  const state = usePlayerStore();
  const { setFullState } = state;

  // 🔁 Listen for Firestore changes → update Zustand
  useEffect(() => {
    const unsubscribe = subscribeToGameState(
      gameId,
      (remoteState: GameState) => {
        console.log("[Firestore Sync] Received update:", remoteState);
        setFullState(remoteState);
      }
    );

    return () => unsubscribe();
  }, [gameId]);

  // 🔁 Sync Zustand → Firestore on state change
  useEffect(() => {
    if (isReadOnly) return;

    const unsub = usePlayerStore.subscribe((state) => {
      const { players, payments, foodOrders } = state;
      const stateToSync: GameState = { players, payments, foodOrders };
      console.log("[Firestore Sync] Saving state:", stateToSync);
      saveGameState(gameId, stateToSync);
    });

    return () => unsub();
  }, [gameId, isReadOnly]);
};
