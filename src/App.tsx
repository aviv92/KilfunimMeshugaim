import { FC, useEffect } from "react";
import TopBar from "./layout/TopBar";
import EndGame from "./screens/EndGame/EndGame";
import { usePlayerStore } from "./stores";
import Game from "./screens/Game/Game";
import { deserializeState } from "./utils/serializeState";

const App: FC = () => {
  const { isEndGame } = usePlayerStore();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serializedState = params.get("data");

    if (serializedState) {
      deserializeState(serializedState);
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
