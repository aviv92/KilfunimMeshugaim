import { FC } from "react";
import TopBar from "./layout/TopBar";
import EndGame from "./screens/EndGame/EndGame";
import { usePlayerStore } from "./stores";
import Game from "./screens/Game/Game";

const App: FC = () => {
  const { isEndGame } = usePlayerStore();
  return (
    <>
      <TopBar />
      {!isEndGame ? <Game /> : <EndGame />}
    </>
  );
};

export default App;
