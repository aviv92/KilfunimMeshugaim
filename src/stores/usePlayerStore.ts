// src/store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Player {
  name: string;
  owed: number;
  showMe: boolean;
  hasQuit: boolean;
  finalResult?: number;
}

interface StoreState {
  inputName: string;
  players: Player[];
  setInputName: (name: string) => void;
  addPlayers: (names: string[], initialAmount: number) => void;
  updateOwed: (index: number, amount: number) => void;
  endGame: () => void;
  usedShowMe: (index: number) => void;
  quitPlayer: (index: number, finalResult: number) => void;
}

const initialGameState = {
  inputName: "",
  players: [],
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
    }),
    { name: "player-storage" }
  )
);