import { create } from "zustand";

const useAppStore = create((set) => ({
  // Theme state
  theme: "system",
  isFocusMode: false,
  setFocusMode: (val) => set({ isFocusMode: val }),

  // Timer state
  isPlaying: false,
  sessionState: "idle", // 'idle', 'work', 'break', 'completed'
  focusDuration: 25, // minutes
  breakDuration: 5, // short break minutes
  longBreakDuration: 15, // long break minutes
  selectedMode: "focus",
  timeLeft: 25 * 60, // seconds
  totalTime: 25 * 60, // seconds for progress

  // Settings state
  notificationsEnabled: true,
  soundEnabled: true,

  // UI state
  showTaskInput: false,
  activeTaskId: null,

  // Actions
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setSessionState: (state) => set({ sessionState: state }),
  setSelectedMode: (mode) =>
    set((state) => {
      const duration =
        mode === "focus"
          ? state.focusDuration
          : mode === "shortBreak"
            ? state.breakDuration
            : state.longBreakDuration;
      const seconds = duration * 60;

      if (state.sessionState === "idle") {
        return {
          selectedMode: mode,
          timeLeft: seconds,
          totalTime: seconds,
        };
      }

      return { selectedMode: mode };
    }),
  setFocusDuration: (duration) => {
    const clamped = Math.max(15, Math.min(180, duration));
    set((state) => ({
      focusDuration: clamped,
      timeLeft:
        state.sessionState === "idle" && state.selectedMode === "focus"
          ? clamped * 60
          : state.timeLeft,
      totalTime:
        state.sessionState === "idle" && state.selectedMode === "focus"
          ? clamped * 60
          : state.totalTime,
    }));
  },
  setBreakDuration: (duration) => set({ breakDuration: Math.max(5, duration) }),
  setLongBreakDuration: (duration) =>
    set({ longBreakDuration: Math.max(10, duration) }),
  setTimeLeft: (time) =>
    set((state) => ({
      timeLeft: typeof time === "function" ? time(state.timeLeft) : time,
    })),
  setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
  setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
  setShowTaskInput: (show) => set({ showTaskInput: show }),
  setActiveTaskId: (id) => set({ activeTaskId: id }),

  // Timer logic
  startSession: () =>
    set((state) => {
      const duration =
        state.selectedMode === "focus"
          ? state.focusDuration
          : state.selectedMode === "shortBreak"
            ? state.breakDuration
            : state.longBreakDuration;
      const sessionState = state.selectedMode === "focus" ? "work" : "break";

      return {
        isPlaying: true,
        isFocusMode: true,
        sessionState,
        timeLeft: duration * 60,
        totalTime: duration * 60,
      };
    }),
  pauseSession: () =>
    set((state) => ({
      isPlaying: false,
      isFocusMode: true,
    })),
  resumeSession: () => set({ isPlaying: true, isFocusMode: true }),
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
        sessionState: "idle",
        timeLeft: duration * 60,
        totalTime: duration * 60,
        isFocusMode: false,
      };
    }),
  completeSession: () =>
    set({ sessionState: "completed", isPlaying: false, isFocusMode: false }),
  startBreak: () =>
    set((state) => ({
      sessionState: "break",
      timeLeft: state.breakDuration * 60,
      totalTime: state.breakDuration * 60,
      isPlaying: true,
      isFocusMode: true,
    })),

  // Local storage persistence
  loadSettingsFromLocalStorage: () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("workmode-settings");
      if (saved) {
        const settings = JSON.parse(saved);
        set(settings);
      }
    }
  },
  saveSettingsToLocalStorage: () =>
    set((state) => {
      if (typeof window !== "undefined") {
        const settingsToSave = {
          focusDuration: state.focusDuration,
          breakDuration: state.breakDuration,
          longBreakDuration: state.longBreakDuration,
          selectedMode: state.selectedMode,
          notificationsEnabled: state.notificationsEnabled,
          soundEnabled: state.soundEnabled,
        };
        localStorage.setItem(
          "workmode-settings",
          JSON.stringify(settingsToSave),
        );
      }
      return state;
    }),
}));

export default useAppStore;
