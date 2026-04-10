"use client";

import { useTimer } from "@/hooks/useTimer";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { ModeSelector } from "./ModeSelector";
import { TimerCircle } from "./TimerCircle";
import { SessionControls } from "./SessionControls";
import { MotivationalMessage } from "./MotivationalMessage";
import { useTimerStore } from "@/store/useTimerStore";

export function TimerModule() {
  const {
    sessionState,
    selectedMode,
    timeLeft,
    totalTime,
    focusDuration,
    breakDuration,
    longBreakDuration,
    notificationsEnabled,
    setTimeLeft,
    startSession,
    pauseSession,
    resumeSession,
    resetSession,
    completeSession,
    startBreak,
  } = useTimerStore();

  const isRunning = sessionState === "work" || sessionState === "break";

  const idleDurationMap = {
    focus: focusDuration,
    shortBreak: breakDuration,
    longBreak: longBreakDuration,
  };

  const idleDuration = idleDurationMap[selectedMode];

  const displayTime = sessionState === "idle" ? idleDuration * 60 : timeLeft;

  const progress =
    sessionState === "idle"
      ? 0
      : totalTime > 0
        ? ((totalTime - timeLeft) / totalTime) * 100
        : 0;

  const sessionLabelMap = {
    work: "Work Mode",
    break: "Break Time",
    completed: "Session Complete",
    idle: "Ready to focus",
  };

  const sessionLabel = sessionLabelMap[sessionState] || "Ready";

  useTimer(
    isRunning,
    timeLeft,
    sessionState,
    notificationsEnabled,
    setTimeLeft,
    completeSession,
    startBreak,
  );

  useKeyboardShortcuts(
    isRunning,
    sessionState,
    startSession,
    pauseSession,
    resumeSession,
    resetSession,
  );

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(99,102,241,0.15),transparent_60%)]" />

      <div
        className={`absolute w-100 h-100 rounded-full transition-all duration-700 ${
          sessionState === "work" ? "bg-blue-500/10" : "bg-purple-500/10"
        } blur-2xl opacity-40`}
      />

      {/* MODE SELECTOR */}
      <div className="absolute top-15 left-1/2 -translate-x-1/2 z-20">
        <ModeSelector />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className="text-[80px] md:text-[110px] font-semibold text-white tracking-tight leading-none">
          {Math.floor(displayTime / 60)
            .toString()
            .padStart(2, "0")}
          :{(displayTime % 60).toString().padStart(2, "0")}
        </h1>

        <p className="mt-2 text-white/40 text-xs tracking-[0.35em] uppercase">
          {sessionLabel}
        </p>

        <div className="mt-10">
          <TimerCircle progress={progress} />
        </div>
      </div>

      <div className="absolute bottom-24 z-20">
        <SessionControls
          sessionState={sessionState}
          isPlaying={isRunning}
          selectedMode={selectedMode}
          onStart={startSession}
          onPause={pauseSession}
          onResume={resumeSession}
          onReset={resetSession}
        />
      </div>

      <div className="absolute bottom-8 text-white/30 text-sm z-20">
        <MotivationalMessage sessionState={sessionState} />
      </div>
    </div>
  );
}
