import { create } from "zustand";
import { persist } from "zustand/middleware";

const getToday = () => new Date().toISOString().split("T")[0];

export const useAnalyticsStore = create(
  persist(
    (set, get) => ({
      dailyStats: {
        date: getToday(),
        focusTime: 0,
        breakTime: 0,
        sessions: 0,
      },

      weeklyStats: [],
      heatmapStats: [],

      streak: {
        current: 0,
        best: 0,
        lastDate: null,
      },

      addSessionLog: (type, duration) =>
        set((state) => {
          const today = getToday();

          let stats =
            state.dailyStats.date === today
              ? { ...state.dailyStats }
              : { date: today, focusTime: 0, breakTime: 0, sessions: 0 };

          if (type === "work") {
            stats.focusTime += duration;
            stats.sessions += 1;
          } else {
            stats.breakTime += duration;
          }

          /* weekly */
          let weekly = [...state.weeklyStats];
          const index = weekly.findIndex((d) => d.date === today);

          if (index !== -1) {
            if (type === "work") weekly[index].focus += duration / 60;
          } else {
            weekly.push({
              date: today,
              day: new Date().toLocaleDateString("en-US", {
                weekday: "short",
              }),
              focus: type === "work" ? duration / 60 : 0,
            });
          }

          weekly = weekly.slice(-7);

          /* heatmap */
          let heatmap = [...state.heatmapStats];
          heatmap.push(type === "work" ? duration / 60 : 0);
          heatmap = heatmap.slice(-30);

          return {
            dailyStats: stats,
            weeklyStats: weekly,
            heatmapStats: heatmap,
          };
        }),

      updateStreak: () =>
        set((state) => {
          const today = getToday();
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yDate = yesterday.toISOString().split("T")[0];

          let streak = { ...state.streak };

          if (!streak.lastDate) {
            streak.current = 1;
            streak.best = 1;
          } else if (streak.lastDate === today) {
            return state;
          } else if (streak.lastDate === yDate) {
            streak.current += 1;
          } else {
            streak.current = 1;
          }

          streak.best = Math.max(streak.best, streak.current);
          streak.lastDate = today;

          return { streak };
        }),
    }),
    {
      name: "workmode-analytics",
    },
  ),
);
