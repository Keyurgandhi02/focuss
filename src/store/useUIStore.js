import { create } from "zustand";

export const useUIStore = create((set) => ({
  theme: "system",
  showTaskInput: false,
  activeTaskId: null,
}));
