import { useEffect, useRef } from "react";
import { usePlayerStore } from "../../stores";
import {
  subscribeToGameState,
  saveGameState,
  getGameState,
  GameState,
} from "../services/realtimeDBService";

export const useRealtimeSync = (
  gameId: string,
  isReadOnly: boolean = false
) => {
  const state = usePlayerStore();
  const { setFullState, players, payments, foodOrders } = state;

  const previousStateRef = useRef<string>("");
  const isInitializedRef = useRef(false);

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

  useEffect(() => {
    const unsub = subscribeToGameState(gameId, (remoteState) => {
      console.log("[Realtime Sync] Received update:", remoteState);
      setFullState(remoteState);
    });
    return () => unsub();
  }, [gameId, setFullState]);

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
      console.log("[Realtime Sync] Saving state:", newState);
      saveGameState(gameId, newState);
    }
  }, [players, payments, foodOrders, isReadOnly, gameId]);
};
