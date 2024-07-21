import { create } from "zustand";

interface SettingsState {
  defaultRebuy: number;
  setDefaultRebuy: (amount: number) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  defaultRebuy: 50,
  setDefaultRebuy: (amount) => set({ defaultRebuy: amount }),
}));
