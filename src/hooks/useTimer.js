import { useEffect, useRef } from "react";

export function useTimer(
  isPlaying,
  timeLeft,
  sessionState,
  notificationsEnabled,
  setTimeLeft,
  completeSession,
  startBreak,
) {
  const intervalRef = useRef(null);
  const handledRef = useRef(false);

  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isPlaying]);

  useEffect(() => {
    if (timeLeft > 0) {
      handledRef.current = false; // reset when running
      return;
    }

    if (!isPlaying || handledRef.current) return;

    handledRef.current = true;

    const notify = (title, body) => {
      if (
        notificationsEnabled &&
        "Notification" in window &&
        Notification.permission === "granted"
      ) {
        new Notification(title, { body });
      }
    };

    if (sessionState === "work") {
      completeSession();

      notify("Focus complete 🎉", "Great job! Time for a break.");

      setTimeout(() => {
        startBreak();

        notify("Break started ☕", "Relax and recharge.");
      }, 1000);
    } else if (sessionState === "break") {
      completeSession();

      notify("Break over 🚀", "Ready for next focus session?");
    }
  }, [
    timeLeft,
    isPlaying,
    sessionState,
    notificationsEnabled,
    completeSession,
    startBreak,
  ]);
}
