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

interface Props {
  isHost: boolean;
  gameId: string;
  onEndGame: () => void;
}

const GameMenuDrawer: FC<Props> = ({ isHost, onEndGame, gameId }) => {
  const [open, setOpen] = useState(false);

  const handleShare = () => {
    const link = `${window.location.origin}/KilfunimMeshugaim/#/game/${gameId}/in-play`;
    navigator.clipboard.writeText(link);
  };

  if (!isHost) return null;

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
        </MenuList>
      </Drawer>
    </>
  );
};

export default GameMenuDrawer;
