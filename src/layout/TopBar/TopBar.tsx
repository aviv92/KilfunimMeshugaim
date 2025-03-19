import { FC, MouseEvent, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Menu, MenuItem } from "@mui/material";
import { shareGame } from "./utils/shareGame";
import { usePlayerStore } from "../../stores/usePlayerStore";
import AdminPanel from "../AdminPanel/AdminPanel";
import { v4 as uuidv4 } from "uuid";

const ButtonAppBar: FC = () => {
  const { isReadOnly, startGame } = usePlayerStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [adminOpen, setAdminOpen] = useState(false);

  const handleCreateNewGame = () => {
    const newGameId = uuidv4().slice(0, 8);
    startGame();
    window.location.replace(`/KilfunimMeshugaim/?gameId=${newGameId}`);
  };

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Close</MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                shareGame(false);
              }}
              disabled={isReadOnly}
            >
              Share game
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                shareGame();
              }}
            >
              Share game (read only)
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                handleCreateNewGame();
              }}
            >
              🎲 Create New Game
            </MenuItem>
            {!isReadOnly && (
              <MenuItem
                onClick={() => {
                  handleClose();
                  setAdminOpen(true);
                }}
              >
                Admin Panel
              </MenuItem>
            )}
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            קלפונים משוגעים
          </Typography>
        </Toolbar>
      </AppBar>
      <AdminPanel
        gameId={
          new URLSearchParams(window.location.search).get("gameId") || "default"
        }
        open={adminOpen}
        onClose={() => setAdminOpen(false)}
      />
    </Box>
  );
};

export default ButtonAppBar;
