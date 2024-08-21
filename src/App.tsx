import { FC } from "react";
import TopBar from "./layout/TopBar";
import PlayerTable from "./components/PlayerTable/PlayerTable";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import AddPlayer from "./components/AddPlayer/AddPlayer";
import EndGame from "./components/EndGame/EndGame";
import ReadOweListButton from "./components/ReadOweListButton/ReadOweListButton";
import EndGameScreen from "./components/EndGame/EndGameScreen";
import { usePlayerStore } from "./stores";

const App: FC = () => {
  const { isEndGame, players } = usePlayerStore();
  return (
    <>
      <TopBar />
      {!isEndGame ? (
        <>
          <PlayerTable />
          <ControlPanel>
            <AddPlayer />
          </ControlPanel>
          {players?.length > 0 && (
            <ControlPanel>
              <EndGame />
              <ReadOweListButton />
            </ControlPanel>
          )}
        </>
      ) : (
        <EndGameScreen />
      )}
    </>
  );
};

export default App;
