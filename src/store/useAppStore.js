import { create } from "zustand";

const getToday = () => new Date().toISOString().split("T")[0];

const useAppStore = create((set, get) => ({
  theme: "system",
  isFocusMode: false,
  setFocusMode: (val) => set({ isFocusMode: val }),
  showTaskInput: false,
  activeTaskId: null,
  isPlaying: false,
  sessionState: "idle", // idle | work | break | completed
  focusDuration: 25,
  breakDuration: 5,
  longBreakDuration: 15,
  selectedMode: "focus",
  timeLeft: 25 * 60,
  totalTime: 25 * 60,
  notificationsEnabled: true,
  soundEnabled: true,
  dailyStats: {
    date: getToday(),
    focusTime: 0,
    breakTime: 0,
    sessions: 0,
  },
  streak: {
    current: 0,
    best: 0,
    lastDate: null,
  },

  setIsPlaying: (val) => set({ isPlaying: val }),
  setSessionState: (val) => set({ sessionState: val }),

  setSelectedMode: (mode) =>
    set((state) => {
      const duration =
        mode === "focus"
          ? state.focusDuration
          : mode === "shortBreak"
            ? state.breakDuration
            : state.longBreakDuration;

      if (state.sessionState === "idle") {
        return {
          selectedMode: mode,
          timeLeft: duration * 60,
          totalTime: duration * 60,
        };
      }

      return { selectedMode: mode };
    }),

  setTimeLeft: (time) =>
    set((state) => ({
      timeLeft: typeof time === "function" ? time(state.timeLeft) : time,
    })),

  startSession: () =>
    set((state) => {
      const duration =
        state.selectedMode === "focus"
          ? state.focusDuration
          : state.selectedMode === "shortBreak"
            ? state.breakDuration
            : state.longBreakDuration;

      return {
        isPlaying: true,
        isFocusMode: true,
        sessionState: state.selectedMode === "focus" ? "work" : "break",
        timeLeft: duration * 60,
        totalTime: duration * 60,
      };
    }),

  pauseSession: () => set({ isPlaying: false }),

  resumeSession: () => set({ isPlaying: true }),

  resetSession: () =>
    set((state) => {
      const duration =
        state.selectedMode === "focus"
          ? state.focusDuration
          : state.selectedMode === "shortBreak"
            ? state.breakDuration
            : state.longBreakDuration;

      return {
        isPlaying: false,
        isFocusMode: false,
        sessionState: "idle",
        timeLeft: duration * 60,
        totalTime: duration * 60,
      };
    }),

  completeSession: () =>
    set((state) => {
      const duration = state.totalTime;

      get().addSessionLog(state.sessionState, duration);
      get().updateStreak();

      return {
        sessionState: "completed",
        isPlaying: false,
        isFocusMode: false,
      };
    }),

  startBreak: () =>
    set((state) => ({
      sessionState: "break",
      isPlaying: true,
      isFocusMode: true,
      timeLeft: state.breakDuration * 60,
      totalTime: state.breakDuration * 60,
    })),

  addSessionLog: (type, duration) =>
    set((state) => {
      const today = getToday();
      let stats = { ...state.dailyStats };

      // reset new day
      if (stats.date !== today) {
        stats = {
          date: today,
          focusTime: 0,
          breakTime: 0,
          sessions: 0,
        };
      }

      if (type === "work") {
        stats.focusTime += duration;
        stats.sessions += 1;
      }

      if (type === "break") {
        stats.breakTime += duration;
      }

      // save
      localStorage.setItem("workmode-stats", JSON.stringify(stats));

      return { dailyStats: stats };
    }),

  loadStats: () => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem("workmode-stats");
    if (saved) {
      set({ dailyStats: JSON.parse(saved) });
    }
  },

  resetStats: () => {
    const empty = {
      date: getToday(),
      focusTime: 0,
      breakTime: 0,
      sessions: 0,
    };

    localStorage.setItem("workmode-stats", JSON.stringify(empty));

    set({ dailyStats: empty });
  },

  loadSettingsFromLocalStorage: () => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem("workmode-settings");
    if (saved) set(JSON.parse(saved));
  },

  saveSettingsToLocalStorage: () =>
    set((state) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "workmode-settings",
          JSON.stringify({
            focusDuration: state.focusDuration,
            breakDuration: state.breakDuration,
            longBreakDuration: state.longBreakDuration,
            selectedMode: state.selectedMode,
            notificationsEnabled: state.notificationsEnabled,
            soundEnabled: state.soundEnabled,
          }),
        );
      }
      return state;
    }),
  streak: {
    current: 0,
    best: 0,
    lastDate: null,
  },

  updateStreak: () =>
    set((state) => {
      const today = new Date().toISOString().split("T")[0];
      let streak = { ...state.streak };

      if (!streak.lastDate) {
        streak.current = 1;
        streak.best = 1;
      } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yDate = yesterday.toISOString().split("T")[0];

        if (streak.lastDate === today) {
          return state; // already counted
        }

        if (streak.lastDate === yDate) {
          streak.current += 1;
        } else {
          streak.current = 1;
        }

        if (streak.current > streak.best) {
          streak.best = streak.current;
        }
      }

      streak.lastDate = today;

      localStorage.setItem("workmode-streak", JSON.stringify(streak));

      return { streak };
    }),

  loadStreak: () => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem("workmode-streak");
    if (saved) set({ streak: JSON.parse(saved) });
  },
}));

export default useAppStore;
