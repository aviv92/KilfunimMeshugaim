// src/hooks/useFirestoreSync.ts
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

  // 🔁 Listen to remote updates
  useEffect(() => {
    const unsubscribe = subscribeToGameState(
      gameId,
      (remoteState: GameState) => {
        setFullState(remoteState);
      }
    );
    return () => unsubscribe();
  }, [gameId, setFullState]);

  // 🔁 Sync local Zustand to Firestore on any state change
  useEffect(() => {
    if (isReadOnly) return;

    const unsub = usePlayerStore.subscribe((currentState) => {
      const { players, payments, foodOrders } = currentState;
      saveGameState(gameId, { players, payments, foodOrders });
    });

    return () => unsub();
  }, [gameId, isReadOnly]);
};
