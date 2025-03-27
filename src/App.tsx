import { FC } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import GameClosing from "./pages/GameClosing";
import GameEnded from "./pages/GameEnded";
import GameInPlay from "./pages/GameInPlay";
import MainMenu from "./pages/MainMenu";

const App: FC = () => {
  if (!localStorage.getItem("guestId")) {
    localStorage.setItem("guestId", crypto.randomUUID());
  }
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="" element={<MainMenu />} />
          <Route path="/game/:gameId/in-play" element={<GameInPlay />} />
          <Route path="/game/:gameId/closing" element={<GameClosing />} />
          <Route path="/game/:gameId/ended" element={<GameEnded />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
