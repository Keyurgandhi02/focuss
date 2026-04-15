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
      const isInputFocused =
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        document.activeElement?.isContentEditable;

      // ❌ Ignore if typing
      if (isInputFocused) return;

      const isCmd = e.metaKey; // Mac ⌘
      const isCtrl = e.ctrlKey; // Windows Ctrl

      // ▶️ PLAY / PAUSE (Cmd/Ctrl + Space)
      if ((isCmd || isCtrl) && e.code === "Space") {
        e.preventDefault();

        if (isPlaying) {
          pauseSession();
        } else if (sessionState === "idle") {
          startSession();
        } else {
          resumeSession();
        }
      }

      // 🔄 RESET (Cmd/Ctrl + R)
      if ((isCmd || isCtrl) && e.code === "KeyR") {
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
