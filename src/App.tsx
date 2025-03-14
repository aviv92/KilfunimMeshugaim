import { FC, useEffect, useState } from "react";
import TopBar from "./layout/TopBar/TopBar";
import EndGame from "./screens/EndGame/EndGame";
import { usePlayerStore } from "./stores";
import Game from "./screens/Game/Game";
import { v4 as uuidv4 } from "uuid";
import { useRealtimeSync } from "./firebase/hooks/useRealtimeDBSync";
import { getDatabase, ref, set, get } from "firebase/database";

// ✅ Device ID per client
const getDeviceId = (): string => {
  let id = localStorage.getItem("deviceId");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("deviceId", id);
  }
  return id;
};

const App: FC = () => {
  const { isEndGame, setIsReadOnly, isReadOnly } = usePlayerStore();
  const [isReady, setIsReady] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const gameId = urlParams.get("gameId") || "default";
  const readonlyParam = urlParams.get("readonly") === "true";

  const deviceId = getDeviceId();
  const db = getDatabase();

  useEffect(() => {
    const checkAndSetReadonly = async () => {
      let isReadOnly = false;

      // ✅ If joined with readonly param, mark device in DB
      if (readonlyParam) {
        await set(ref(db, `games/${gameId}/readonlyUsers/${deviceId}`), true);
        isReadOnly = true;
      } else {
        // ✅ Otherwise, check if this device was marked previously
        const snap = await get(
          ref(db, `games/${gameId}/readonlyUsers/${deviceId}`)
        );
        isReadOnly = snap.exists();
      }

      setIsReadOnly(isReadOnly);
      setIsReady(true);
    };

    checkAndSetReadonly();
  }, [readonlyParam, gameId, deviceId, setIsReadOnly, db]);

  useRealtimeSync(gameId, isReadOnly);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.get("gameId")) {
      const newId = uuidv4().slice(0, 8); // short & readable
      params.set("gameId", newId);
      window.location.search = params.toString(); // reloads with gameId
    }
  }, []);

  // ✅ Avoid rendering anything until readonly state is initialized
  if (!isReady) return null;

  return (
    <>
      <TopBar />
      {!isEndGame ? <Game /> : <EndGame />}
    </>
  );
};

export default App;
