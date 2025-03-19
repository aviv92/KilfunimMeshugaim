import { FC } from "react";
import ControlPanel from "../../layout/ControlPanel/ControlPanel";
import PlayerTable from "./components/PlayerTable/PlayerTable";
import AddPlayer from "./components/AddPlayer/AddPlayer";
import { usePlayerStore } from "../../stores";
import EndGame from "../EndGame/components/EndGameButton/EndGameButton";
import FoodOrder from "./components/FoodOrder/FoodOrder";

const Game: FC = () => {
  const { players, isReadOnly } = usePlayerStore();

  if (isReadOnly) {
    return <PlayerTable />;
  }

  return (
    <>
      <PlayerTable />
      <ControlPanel>
        <AddPlayer />
        {players?.length > 0 && (
          <>
            <FoodOrder />
            <EndGame />
          </>
        )}
      </ControlPanel>
    </>
  );
};

export default Game;
