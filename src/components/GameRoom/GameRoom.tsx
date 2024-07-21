import React from "react";
import AddPlayer from "../AddPlayer/AddPlayer";
import PokerTable from "../PokerTable/PokerTable";

const GameRoom: React.FC = () => {
  return (
    <div>
      <AddPlayer />
      <PokerTable />
    </div>
  );
};

export default GameRoom;
