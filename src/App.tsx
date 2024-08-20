import { FC } from "react";
import TopBar from "./layout/TopBar";
import PlayerTable from "./components/PlayerTable/PlayerTable";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import AddPlayer from "./components/AddPlayer/AddPlayer";
import EndGame from "./components/EndGame/EndGame";
import ReadOweListButton from "./components/ReadOweListButton/ReadOweListButton";

// import EndGame from "./components/EndGame/EndGame";
// import styles from "./App.module.css";
// import AddPlayer from "./components/AddPlayer/AddPlayer";
// import PokerTable from "./components/PokerTable/PokerTable";
// import ReadOweListButton from "./components/ReadOweListButton/ReadOweListButton";

// const App: React.FC = () => {
//   return (
//     <div className={styles.container}>
//       <div className={styles.tableContainer}>
//         <PokerTable />
//       </div>
//       <div className={styles.buttons}>
//         <AddPlayer />
//         <ReadOweListButton />
//         <EndGame />
//       </div>
//     </div>
//   );
// };

const App: FC = () => {
  return (
    <>
      <TopBar />
      <PlayerTable />
      <ControlPanel>
        <AddPlayer />
      </ControlPanel>
      <ControlPanel>
        <EndGame />
        <ReadOweListButton />
      </ControlPanel>
    </>
  );
};

export default App;
