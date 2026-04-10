import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTodoStore = create(
  persist(
    (set, get) => ({
      tasks: [],

      addTask: (text) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: Date.now(),
              text,
              done: false,
            },
          ],
        })),

      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, done: !t.done } : t,
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),

      clearCompleted: () =>
        set((state) => ({
          tasks: state.tasks.filter((t) => !t.done),
        })),

      resetTasks: () => set({ tasks: [] }),
    }),
    {
      name: "workmode-tasks", // localStorage key
    },
  ),
);
