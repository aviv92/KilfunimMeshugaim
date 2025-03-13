import { FC, useEffect } from "react";
import TopBar from "./layout/TopBar/TopBar";
import EndGame from "./screens/EndGame/EndGame";
import { usePlayerStore } from "./stores";
import Game from "./screens/Game/Game";
import { useFirestoreSync } from "./hooks/useFirestoreSync";
import { v4 as uuidv4 } from "uuid";

const App: FC = () => {
  const { isEndGame } = usePlayerStore();

  const urlParams = new URLSearchParams(window.location.search);
  const gameId = urlParams.get("gameId") || "default";
  const isReadOnly = urlParams.get("readonly") === "true";

  useFirestoreSync(gameId, isReadOnly);

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
