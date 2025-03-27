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
  onRequestHost: () => void;
  hostRequests?: string[];
  onApproveHost?: (id: string) => void;
}

const GameMenuDrawer: FC<Props> = ({
  isHost,
  onEndGame,
  onRequestHost,
  gameId,
  hostRequests,
  onApproveHost,
}) => {
  const [open, setOpen] = useState(false);

  const handleShare = () => {
    const link = `${window.location.origin}/#/game/${gameId}/in-play`;
    navigator.clipboard.writeText(link);
    alert("Game link copied to clipboard!");
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

          {isHost ? (
            <>
              <MenuItem onClick={handleShare}>
                <ShareIcon fontSize="small" sx={{ mr: 1 }} />
                Share Game
              </MenuItem>
              <MenuItem onClick={onEndGame}>
                <PowerSettingsNewIcon fontSize="small" sx={{ mr: 1 }} />
                End Game
              </MenuItem>
            </>
          ) : (
            <MenuItem onClick={onRequestHost}>Request Host Access</MenuItem>
          )}
          {isHost && (hostRequests || [])?.length > 0 && (
            <>
              <Typography variant="subtitle2" sx={{ px: 2, pt: 1 }}>
                Host Requests
              </Typography>
              {(hostRequests || []).map((id) => (
                <MenuItem key={id} onClick={() => onApproveHost?.(id)}>
                  Approve Host: {id.slice(0, 6)}...
                </MenuItem>
              ))}
            </>
          )}
        </MenuList>
      </Drawer>
    </>
  );
};

export default GameMenuDrawer;
