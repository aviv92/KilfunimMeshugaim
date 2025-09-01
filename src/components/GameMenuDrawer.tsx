import {
  Drawer,
  IconButton,
  MenuList,
  MenuItem,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShareIcon from "@mui/icons-material/Share";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import { updateFirestoreData } from "../utils/firestore";

interface Props {
  gameId: string;
}

const GameMenuDrawer: FC<Props> = ({ gameId }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleShare = () => {
    const link = `${window.location.origin}/KilfunimMeshugaim/#/game/${gameId}/in-play`;
    navigator.clipboard.writeText(link);
  };

  const onEndGame = async () => {
    await updateFirestoreData(gameId, { status: "closing" });
  };
  return (
    <>
      <IconButton
        onClick={() => setOpen((prev) => !prev)}
        sx={{
          position: "fixed",
          top: 16,
          right: 16,
          backgroundColor: "white",
          border: "1px solid #ccc",
          boxShadow: 2,
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <MenuList sx={{ width: 250 }}>
          <Typography variant="h6" p={2}>
            Game Menu
          </Typography>

          <MenuItem onClick={handleShare}>
            <ShareIcon fontSize="small" sx={{ mr: 1 }} />
            Share Game
          </MenuItem>
          <MenuItem onClick={onEndGame}>
            <PowerSettingsNewIcon fontSize="small" sx={{ mr: 1 }} />
            End Game
          </MenuItem>
          <MenuItem onClick={() => navigate("/")}>
            <MenuIcon fontSize="small" sx={{ mr: 1 }} />
            Back to Main Menu
          </MenuItem>
        </MenuList>
      </Drawer>
    </>
  );
};

export default GameMenuDrawer;
