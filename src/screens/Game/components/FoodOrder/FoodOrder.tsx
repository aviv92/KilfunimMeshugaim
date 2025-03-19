import { useState, useEffect, FC } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  Typography,
  Divider,
  FormHelperText,
} from "@mui/material";
import { usePlayerStore, FoodOrder } from "../../../../stores/usePlayerStore";

const FoodOrderModal: FC = () => {
  const { players, addFoodOrder, foodOrders } = usePlayerStore();
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState<boolean[]>([]);

  const initialOrderState: FoodOrder = {
    payer: "",
    participants: [],
    foodCosts: {},
    tip: 0,
  };

  const [currentOrders, setCurrentOrders] = useState<FoodOrder[]>(foodOrders);

  useEffect(() => {
    setCurrentOrders(foodOrders);
    setShowForm(new Array(foodOrders.length).fill(false));
  }, [foodOrders]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentOrders(foodOrders);
    setShowForm(new Array(foodOrders.length).fill(false));
  };

  const handleAddForm = () => {
    setCurrentOrders([...currentOrders, initialOrderState]);
    setShowForm([...showForm, true]);
  };

  const handleSaveOrder = (index: number) => {
    addFoodOrder(currentOrders[index]);
    setShowForm((prev) => {
      const updatedShowForm = [...prev];
      updatedShowForm[index] = false;
      return updatedShowForm;
    });
  };

  const handleChange = (
    index: number,
    field: keyof FoodOrder,
    value: unknown
  ) => {
    setCurrentOrders((prev) => {
      const updatedOrders = [...prev];
      updatedOrders[index] = {
        ...updatedOrders[index],
        [field]: value,
      };
      return updatedOrders;
    });
  };

  const calculateParticipantShare = (order: FoodOrder, participant: string) => {
    const foodCost = order.foodCosts?.[participant] || 0;
    const tipShare = order?.tip / (order.participants.length + 1);
    return foodCost + tipShare;
  };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Food Orders
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Track Food Orders</DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddForm}
            >
              Add Order
            </Button>
          </Box>
          {currentOrders.map((order, index) => (
            <Box key={index} mb={2}>
              {showForm[index] ? (
                <Box>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Payer</InputLabel>
                    <Select
                      value={order.payer}
                      onChange={(e) =>
                        handleChange(index, "payer", e.target.value as string)
                      }
                    >
                      {players.map((player) => (
                        <MenuItem key={player.name} value={player.name}>
                          {player.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth margin="normal">
                    <InputLabel>Participants</InputLabel>
                    <Select
                      multiple
                      value={order.participants}
                      onChange={(e) =>
                        handleChange(
                          index,
                          "participants",
                          e.target.value as string[]
                        )
                      }
                      renderValue={(selected) => selected.join(", ")}
                    >
                      {players.map((player) => (
                        <MenuItem key={player.name} value={player.name}>
                          {player.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText id="my-helper-text">
                      No need to select the payer.
                    </FormHelperText>
                  </FormControl>

                  {order.participants.map((participant) => (
                    <TextField
                      key={participant}
                      label={`Amount for ${participant}`}
                      type="number"
                      fullWidth
                      margin="normal"
                      value={order.foodCosts[participant] || 0}
                      onChange={(e) =>
                        handleChange(index, "foodCosts", {
                          ...order.foodCosts,
                          [participant]: Number(e.target.value),
                        })
                      }
                    />
                  ))}

                  <TextField
                    label="Tip Amount"
                    type="number"
                    fullWidth
                    margin="normal"
                    value={order.tip}
                    onChange={(e) =>
                      handleChange(index, "tip", Number(e.target.value))
                    }
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSaveOrder(index)}
                    style={{ marginTop: "20px" }}
                  >
                    Save Order
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Typography variant="h6">
                    Order {index + 1}: {order.payer} paid
                  </Typography>
                  <Typography>
                    Participants:
                    {order.participants.map((participant) => (
                      <div key={participant}>
                        {participant}:{" "}
                        {calculateParticipantShare(order, participant)}
                      </div>
                    ))}
                  </Typography>
                </Box>
              )}
              <Divider style={{ margin: "20px 0" }} />
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FoodOrderModal;
