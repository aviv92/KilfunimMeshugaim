// src/App.tsx
import React from "react";

import EndGame from "./components/EndGame/EndGame";
import styles from "./App.module.css";
import AddPlayer from "./components/AddPlayer/AddPlayer";
import PokerTable from "./components/PokerTable/PokerTable";

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
        <PokerTable />
      </div>
      <div className={styles.buttons}>
        <AddPlayer />
        <EndGame />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return <Home />;
};

export default App;
