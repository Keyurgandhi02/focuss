"use client";

import { memo, useMemo, useEffect, useRef, useState } from "react";
import { useTimerStore } from "@/store/useTimerStore";
import { useTimer } from "@/hooks/useTimer";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";

import { ModeSelector } from "./ModeSelector";
import { TimerCircle } from "./TimerCircle";
import { SessionControls } from "./SessionControls";
import { MotivationalMessage } from "./MotivationalMessage";
import { TimerDisplay } from "./TimerDisplay";
import { playSound, stopSound } from "../../../utils/soundPlayer";
import { SoundSelectorWrapper } from "../Settings/SoundSelectorWrapper";

export const TimerModule = memo(function TimerModule() {
  const sessionState = useTimerStore((s) => s.sessionState);
  const selectedMode = useTimerStore((s) => s.selectedMode);
  const timeLeft = useTimerStore((s) => s.timeLeft);
  const totalTime = useTimerStore((s) => s.totalTime);
  const isPlaying = useTimerStore((s) => s.isPlaying);
  const soundMode = useTimerStore((s) => s.soundMode);

  const focusDuration = useTimerStore((s) => s.focusDuration);
  const breakDuration = useTimerStore((s) => s.breakDuration);
  const longBreakDuration = useTimerStore((s) => s.longBreakDuration);

  const notificationsEnabled = useTimerStore((s) => s.notificationsEnabled);

  const startSession = useTimerStore((s) => s.startSession);
  const pauseSession = useTimerStore((s) => s.pauseSession);
  const resumeSession = useTimerStore((s) => s.resumeSession);
  const resetSession = useTimerStore((s) => s.resetSession);
  const completeSession = useTimerStore((s) => s.completeSession);
  const startBreak = useTimerStore((s) => s.startBreak);
  const setTimeLeft = useTimerStore((s) => s.setTimeLeft);

  const setSoundMode = useTimerStore((s) => s.setSoundMode);
  const soundEnabled = useTimerStore((s) => s.soundEnabled);

  const isRunning = sessionState === "work" || sessionState === "break";

  const [justSaved, setJustSaved] = useState(false);
  const timeoutRef = useRef(null);

  /* COMPUTED */
  const { displayTime, progress, sessionLabel } = useMemo(() => {
    const idleMap = {
      focus: focusDuration,
      shortBreak: breakDuration,
      longBreak: longBreakDuration,
    };

    const idleDuration = idleMap[selectedMode];

    return {
      displayTime: sessionState === "idle" ? idleDuration * 60 : timeLeft,
      progress:
        sessionState === "idle"
          ? 0
          : ((totalTime - timeLeft) / totalTime) * 100,
      sessionLabel:
        sessionState === "work"
          ? "Work Mode"
          : sessionState === "break"
            ? "Break Time"
            : sessionState === "completed"
              ? "Completed"
              : "Ready",
    };
  }, [
    sessionState,
    selectedMode,
    timeLeft,
    totalTime,
    focusDuration,
    breakDuration,
    longBreakDuration,
  ]);

  /* TIMER */
  useTimer(
    isRunning,
    timeLeft,
    sessionState,
    notificationsEnabled,
    setTimeLeft,
    completeSession,
    startBreak,
  );

  /* SHORTCUTS */
  useKeyboardShortcuts(
    isRunning,
    sessionState,
    startSession,
    pauseSession,
    resumeSession,
    resetSession,
  );

  const triggerAutoSave = () => {
    setJustSaved(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setJustSaved(false);
    }, 1500);
  };

  /* SOUND (FINAL FIX) */
  useEffect(() => {
    if (!isPlaying || soundMode === "off") {
      stopSound();
      return;
    }

    playSound(soundMode);
  }, [isPlaying, soundMode]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between py-10">
      {/* 🔵 TOP CONTROLS */}
      <div className="flex flex-col items-center gap-3 z-10">
        <ModeSelector />
        {soundEnabled && (
          <SoundSelectorWrapper
            soundMode={soundMode}
            setSoundMode={setSoundMode}
            triggerAutoSave={triggerAutoSave}
          />
        )}

        {justSaved && <div className="text-green-400 text-xs">✓ Saved</div>}
      </div>

      {/* 🔥 CENTER (MAIN FOCUS) */}
      <div className="flex flex-col items-center justify-center flex-1">
        <TimerDisplay displayTime={displayTime} sessionLabel={sessionLabel} />

        <div className="mt-8">
          <TimerCircle progress={progress} />
        </div>
      </div>

      {/* 🔻 BOTTOM */}
      <div className="flex flex-col items-center gap-4 mb-4">
        <SessionControls
          sessionState={sessionState}
          isPlaying={isRunning}
          onStart={startSession}
          onPause={pauseSession}
          onResume={resumeSession}
          onReset={resetSession}
        />

        <MotivationalMessage sessionState={sessionState} />
      </div>

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_40%,rgba(99,102,241,0.15),transparent_60%)]" />
    </div>
  );
});
