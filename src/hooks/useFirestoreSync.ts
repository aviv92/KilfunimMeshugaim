import { useEffect, useRef } from "react";
import { usePlayerStore } from "../stores";
import {
  subscribeToGameState,
  saveGameState,
  getGameState,
} from "../services/firestoreService";
import { GameState } from "../services/firestoreService";

export const useFirestoreSync = (
  gameId: string,
  isReadOnly: boolean = false
) => {
  const state = usePlayerStore();
  const { setFullState, players, payments, foodOrders } = state;

  const previousStateRef = useRef<string>(""); // serialized state cache
  const isInitializedRef = useRef(false); // guard for initial sync

  // First: Load initial state from Firestore
  useEffect(() => {
    const init = async () => {
      const remote = await getGameState(gameId);
      if (remote) {
        setFullState(remote);
      }
      isInitializedRef.current = true;
    };
    init();
  }, [gameId, setFullState]);

  // Second: Subscribe to remote Firestore updates
  useEffect(() => {
    const unsub = subscribeToGameState(gameId, (remoteState) => {
      console.log("[Firestore Sync] Received update:", remoteState);
      setFullState(remoteState);
    });
    return () => unsub();
  }, [gameId, setFullState]);

  // Third: Push Zustand changes to Firestore
  useEffect(() => {
    if (isReadOnly || !isInitializedRef.current) return;

    const newSerializedState = JSON.stringify({
      players,
      payments,
      foodOrders,
    });
    if (previousStateRef.current !== newSerializedState) {
      previousStateRef.current = newSerializedState;
      const newState: GameState = { players, payments, foodOrders };
      console.log("[Firestore Sync] Saving state to Firestore:", newState);
      saveGameState(gameId, newState);
    }
  }, [players, payments, foodOrders, isReadOnly, gameId]);
};
