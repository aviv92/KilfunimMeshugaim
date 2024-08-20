import React from "react";
import { usePlayerStore } from "../../stores";
import { Button } from "@mui/material";
import { speakOwedAmounts } from "./utils";

const ReadOweListButton: React.FC = () => {
  const { players } = usePlayerStore();

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => speakOwedAmounts(players)}
    >
      Read List
    </Button>
  );
};

export default ReadOweListButton;
