import { FC, useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getDatabase, ref, get, remove } from "firebase/database";

type AdminPanelProps = {
  gameId: string;
  open: boolean;
  onClose: () => void;
};

const AdminPanel: FC<AdminPanelProps> = ({ gameId, open, onClose }) => {
  const [readonlyUsers, setReadonlyUsers] = useState<string[]>([]);
  const db = getDatabase();

  const fetchReadonlyUsers = useCallback(async () => {
    const snap = await get(ref(db, `games/${gameId}/readonlyUsers`));
    if (snap.exists()) {
      setReadonlyUsers(Object.keys(snap.val()));
    } else {
      setReadonlyUsers([]);
    }
  }, [db, gameId]);

  const handlePromote = async (deviceId: string) => {
    await remove(ref(db, `games/${gameId}/readonlyUsers/${deviceId}`));
    fetchReadonlyUsers(); // refresh list
  };

  useEffect(() => {
    if (open) fetchReadonlyUsers();
  }, [fetchReadonlyUsers, open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Readonly Users for Game: {gameId}</DialogTitle>
      <DialogContent dividers>
        <List>
          {readonlyUsers.length === 0 ? (
            <ListItem>No readonly users</ListItem>
          ) : (
            readonlyUsers.map((deviceId) => (
              <ListItem
                key={deviceId}
                secondaryAction={
                  <IconButton
                    edge="end"
                    onClick={() => handlePromote(deviceId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={deviceId} />
              </ListItem>
            ))
          )}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminPanel;
