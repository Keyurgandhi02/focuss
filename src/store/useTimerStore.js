import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAnalyticsStore } from "./useAnalyticsStore";
import { sendNotification } from "../../utils/notifications";

const getDuration = (state, mode) => {
  if (mode === "focus") return state.focusDuration;
  if (mode === "shortBreak") return state.breakDuration;
  return state.longBreakDuration;
};

export const useTimerStore = create(
  persist(
    (set, get) => ({
      isPlaying: false,
      sessionState: "idle",
      selectedMode: "focus",

      focusDuration: 25,
      breakDuration: 5,
      longBreakDuration: 15,

      timeLeft: 25 * 60,
      totalTime: 25 * 60,

      notificationsEnabled: true,
      soundEnabled: true,
      soundMode: "off",

      /* ACTIONS */

      setSelectedMode: (mode) =>
        set((state) => {
          if (state.sessionState !== "idle") return { selectedMode: mode };

          const duration = getDuration(state, mode) * 60;

          return {
            selectedMode: mode,
            timeLeft: duration,
            totalTime: duration,
          };
        }),

      startSession: () =>
        set((state) => {
          const duration = getDuration(state, state.selectedMode) * 60;

          return {
            isPlaying: true,
            sessionState: state.selectedMode === "focus" ? "work" : "break",
            timeLeft: duration,
            totalTime: duration,
          };
        }),

      pauseSession: () => {
        set({ isPlaying: false, sessionState: "paused" });
      },
      resumeSession: () =>
        set((state) => {
          return {
            isPlaying: true,
            sessionState: state.selectedMode === "focus" ? "work" : "break",
          };
        }),

      resetSession: () => {
        set((state) => {
          const duration = getDuration(state, state.selectedMode) * 60;

          return {
            isPlaying: false,
            sessionState: "idle",
            timeLeft: duration,
            totalTime: duration,
          };
        });
      },

      setFocusDuration: (duration) =>
        set((state) => {
          const clamped = Math.max(15, Math.min(180, duration));

          return {
            focusDuration: clamped,
            ...(state.sessionState === "idle" && state.selectedMode === "focus"
              ? {
                  timeLeft: clamped * 60,
                  totalTime: clamped * 60,
                }
              : {}),
          };
        }),

      setBreakDuration: (duration) =>
        set({ breakDuration: Math.max(5, duration) }),

      setLongBreakDuration: (duration) =>
        set({ longBreakDuration: Math.max(10, duration) }),

      setNotificationsEnabled: (enabled) =>
        set({ notificationsEnabled: enabled }),

      setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),

      setTimeLeft: (time) =>
        set((state) => ({
          timeLeft: typeof time === "function" ? time(state.timeLeft) : time,
        })),

      completeSession: () => {
        const state = get();
        const duration = state.totalTime;

        useAnalyticsStore
          .getState()
          .addSessionLog(state.sessionState, duration);

        useAnalyticsStore.getState().updateStreak();

        if (state.notificationsEnabled) {
          sendNotification(
            "Session Complete 🎉",
            state.sessionState === "work"
              ? "Great job! Time for a break."
              : "Break over! Ready to focus?",
          );
        }

        set({
          sessionState: "completed",
          isPlaying: false,
        });
      },

      startBreak: () =>
        set((state) => {
          const duration = state.breakDuration * 60;

          return {
            sessionState: "break",
            isPlaying: true,
            timeLeft: duration,
            totalTime: duration,
          };
        }),

      setSoundMode: (mode) => set({ soundMode: mode }),
    }),

    {
      name: "workmode-timer", // 🔥 localStorage key
    },
  ),
);
