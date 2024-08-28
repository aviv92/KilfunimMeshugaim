import { FC, ReactNode } from "react";
import { Container } from "@mui/material";

type ControlPanelProps = {
  children: ReactNode;
};

const ControlPanel: FC<ControlPanelProps> = ({ children }) => {
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
