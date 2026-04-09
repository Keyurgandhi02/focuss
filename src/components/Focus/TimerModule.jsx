"use client";

import useAppStore from "@/store/useAppStore";
import { useTimer } from "@/hooks/useTimer";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { ModeSelector } from "./ModeSelector";
import { TimerCircle } from "./TimerCircle";
import { SessionControls } from "./SessionControls";
import { MotivationalMessage } from "./MotivationalMessage";

export function TimerModule() {
  const {
    isPlaying,
    sessionState,
    focusDuration,
    breakDuration,
    longBreakDuration,
    selectedMode,
    timeLeft,
    totalTime,
    notificationsEnabled,
    setSelectedMode,
    setTimeLeft,
    startSession,
    pauseSession,
    resumeSession,
    resetSession,
    completeSession,
    startBreak,
  } = useAppStore();

  // Custom hooks for logic extraction
  useTimer(
    isPlaying,
    timeLeft,
    sessionState,
    notificationsEnabled,
    setTimeLeft,
    completeSession,
    startBreak,
  );

  useKeyboardShortcuts(
    isPlaying,
    sessionState,
    startSession,
    pauseSession,
    resumeSession,
    resetSession,
  );

  // Calculate durations and display values
  const idleDuration =
    selectedMode === "focus"
      ? focusDuration
      : selectedMode === "shortBreak"
        ? breakDuration
        : longBreakDuration;

  const displayTime = sessionState === "idle" ? idleDuration * 60 : timeLeft;
  const progress =
    sessionState === "idle"
      ? 0
      : totalTime > 0
        ? ((totalTime - timeLeft) / totalTime) * 100
        : 0;

  const sessionLabel =
    sessionState === "work"
      ? "Work Mode"
      : sessionState === "break"
        ? "Break Time"
        : sessionState === "completed"
          ? "Session Complete"
          : "Ready to focus";

  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 md:gap-8">
      {/* Mode Selection */}
      <ModeSelector
        selectedMode={selectedMode}
        onModeChange={setSelectedMode}
      />

      {/* Timer Display Section */}
      <div className="relative w-full max-w-3xl">
        <div className="absolute inset-0 rounded-4xl bg-white/5 blur-3xl" />
        <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-xl">
          <div className="relative flex flex-col items-center justify-center gap-8">
            {/* Circular Progress Timer */}
            <TimerCircle
              displayTime={displayTime}
              progress={progress}
              timeLeft={timeLeft}
            />

            {/* Session Label */}
            <p className="text-sm uppercase tracking-[0.25em] text-white/60">
              {sessionLabel}
            </p>

            {/* Control Buttons */}
            <SessionControls
              sessionState={sessionState}
              isPlaying={isPlaying}
              selectedMode={selectedMode}
              onStart={startSession}
              onPause={pauseSession}
              onResume={resumeSession}
              onReset={resetSession}
            />
          </div>
        </div>
      </div>

      {/* Motivational Message */}
      <MotivationalMessage sessionState={sessionState} />
    </div>
  );
}
