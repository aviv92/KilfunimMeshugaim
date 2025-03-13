import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Player = {
  name: string;
  owed: number;
  showMe: boolean;
  hasQuit: boolean;
  finalResult?: number;
  id: string;
};

export type Payment = {
  from: string;
  to: string;
  amount: number;
};

export type FoodOrder = {
  payer: string;
  participants: string[];
  foodCosts: { [key: string]: number };
  tip: number;
};

type StoreState = {
  inputName: string;
  players: Player[];
  isEndGame: boolean;
  setInputName: (name: string) => void;
  addPlayers: (names: string[], initialAmount: number) => void;
  updateOwed: (id: string, amount: number) => void;
  startGame: () => void;
  endGame: () => void;
  usedShowMe: (id: string) => void;
  quitPlayer: (id: string, finalResult: number) => void;
  payments: Payment[];
  setPayments: (newPayments: Payment[]) => void;
  foodOrders: FoodOrder[];
  addFoodOrder: (order: FoodOrder) => void;
  setFullState: (state: Partial<StoreState>) => void;
};

const initialGameState = {
  inputName: "",
  players: [],
  isEndGame: false,
  payments: [],
  foodOrders: [],
};

export const DEFAULT_REBUY = 50;

export const generateId = () => {
  return crypto.randomUUID();
};

export const usePlayerStore = create<StoreState>()(
  persist(
    (set) => ({
      ...initialGameState,
      setInputName: (name) => set({ inputName: name }),
      addPlayers: (names, initialAmount) =>
        set((state) => ({
          players: [
            ...state.players,
            ...names.map((name) => ({
              name,
              owed: initialAmount,
              showMe: true,
              hasQuit: false,
              id: generateId(),
            })),
          ],
        })),
      updateOwed: (id, amount) =>
        set((state) => {
          const newPlayers = state.players.map((player) => {
            if (player.id !== id) return player;
            return { ...player, owed: player.owed + amount };
          });

          return { players: newPlayers };
        }),
      usedShowMe: (id) =>
        set((state) => {
          const newPlayers = state.players.map((player) => {
            if (player.id !== id) return player;
            return { ...player, showMe: false };
          });

          return { players: newPlayers };
        }),
      quitPlayer: (id, finalResult) =>
        set((state) => {
          const newPlayers = state.players.map((player) => {
            if (player.id !== id) return player;
            return { ...player, hasQuit: true, finalResult };
          });

          return { players: newPlayers };
        }),
      setPayments: (newPayments) => set({ payments: newPayments }),
      endGame: () => set({ isEndGame: true }),
      startGame: () => set({ ...initialGameState, isEndGame: false }),
      addFoodOrder: (order) =>
        set((state) => ({
          ...state,
          foodOrders: [...state.foodOrders, order],
        })),
      setFullState: (newState) => set((prev) => ({ ...prev, ...newState })),
    }),
    { name: "player-storage" }
  )
);
