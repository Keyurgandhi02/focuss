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

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, setTimeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && isPlaying) {
      if (sessionState === "work") {
        completeSession();

        if (notificationsEnabled) {
          if (
            "Notification" in window &&
            Notification.permission === "granted"
          ) {
            new Notification("Work session complete! Time for a break 🎉");
          }
        }

        setTimeout(() => startBreak(), 2000);
      } else if (sessionState === "break") {
        completeSession();

        if (notificationsEnabled) {
          if (
            "Notification" in window &&
            Notification.permission === "granted"
          ) {
            new Notification("Break is over! Ready for another round? 🚀");
          }
        }
      }
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
