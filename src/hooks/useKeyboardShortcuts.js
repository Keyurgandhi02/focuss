"use client";

import { useEffect } from "react";

export function useKeyboardShortcuts(
  isPlaying,
  sessionState,
  startSession,
  pauseSession,
  resumeSession,
  resetSession,
) {
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (isPlaying) {
          pauseSession();
        } else if (sessionState === "idle") {
          startSession();
        } else {
          resumeSession();
        }
      }

      if (e.code === "KeyR") {
        e.preventDefault();
        resetSession();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [
    isPlaying,
    sessionState,
    startSession,
    pauseSession,
    resumeSession,
    resetSession,
  ]);
}
