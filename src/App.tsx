// src/App.tsx
import React from "react";

import EndGame from "./components/EndGame/EndGame";
import styles from "./App.module.css";
import AddPlayer from "./components/AddPlayer/AddPlayer";
import PokerTable from "./components/PokerTable/PokerTable";
import ReadOweListButton from "./components/ReadOweListButton/ReadOweListButton";

const App: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        <PokerTable />
      </div>
      <div className={styles.buttons}>
        <AddPlayer />
        <ReadOweListButton />
        <EndGame />
      </div>
    </div>
  );
};

export default App;
