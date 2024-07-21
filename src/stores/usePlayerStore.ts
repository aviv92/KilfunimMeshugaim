// src/store.ts
import { create } from "zustand";

export interface Player {
  name: string;
  owed: number;
  showMe: boolean;
  hasQuit: boolean; // New property to track quit status
  finalResult?: number; // New property to track the final result
}

interface StoreState {
  inputName: string; // New state for input field
  players: Player[];
  setInputName: (name: string) => void; // New action to set input name
  addPlayers: (names: string[], initialAmount: number) => void; // New action to handle multiple players
  updateOwed: (index: number, amount: number) => void;
  endGame: () => void;
  usedShowMe: (index: number) => void;
  quitPlayer: (index: number, finalResult: number) => void;
}

const initialGameState = {
  inputName: "",
  players: [],
};

export const usePlayerStore = create<StoreState>((set) => ({
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
        })),
      ],
    })),
  updateOwed: (index, amount) =>
    set((state) => {
      const newPlayers = state.players;
      newPlayers[index].owed += amount;
      return { players: newPlayers };
    }),
  usedShowMe: (index) =>
    set((state) => {
      const newPlayers = [...state.players];
      newPlayers[index].showMe = false;
      return { players: newPlayers };
    }),
  quitPlayer: (index, finalResult) =>
    set((state) => {
      const newPlayers = [...state.players];
      newPlayers[index].hasQuit = true;
      newPlayers[index].finalResult = finalResult;
      return { players: newPlayers };
    }),
  endGame: () => set({ ...initialGameState }),
}));
