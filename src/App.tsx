import { FC, useEffect } from "react";
import TopBar from "./layout/TopBar/TopBar";
import EndGame from "./screens/EndGame/EndGame";
import { usePlayerStore } from "./stores";
import Game from "./screens/Game/Game";
import { v4 as uuidv4 } from "uuid";
import { useRealtimeSync } from "./firebase/hooks/useRealtimeDBSync";

const App: FC = () => {
  const { isEndGame, setIsReadOnly } = usePlayerStore();

  const urlParams = new URLSearchParams(window.location.search);
  const gameId = urlParams.get("gameId") || "default";
  const readonlyParam = urlParams.get("readonly") === "true";

  const readonlyLocked =
    sessionStorage.getItem("readonly-protected") === "true";
  const isReadOnly = readonlyParam || readonlyLocked;

  useEffect(() => {
    if (readonlyParam) {
      sessionStorage.setItem("readonly-protected", "true");
    }
  }, [readonlyParam]);

  useEffect(() => {
    setIsReadOnly(isReadOnly);
  }, [setIsReadOnly, isReadOnly]);

  useRealtimeSync(gameId, isReadOnly);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.get("gameId")) {
      const newId = uuidv4().slice(0, 8); // short & readable
      params.set("gameId", newId);
      window.location.search = params.toString(); // reloads with gameId
    }
  }, []);

  return (
    <>
      <TopBar />
      {!isEndGame ? <Game /> : <EndGame />}
    </>
  );
};

export default App;
