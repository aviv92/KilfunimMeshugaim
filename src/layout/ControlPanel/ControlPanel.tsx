import React from "react";
import { Container } from "@mui/material";

interface ControlPanelProps {
  children: React.ReactNode;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ children }) => {
  return (
    <Container
      maxWidth="md"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      {children}
    </Container>
  );
};

export default ControlPanel;
