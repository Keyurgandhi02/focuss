"use client";

export function TimerDisplay({ timeLeft }) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-7xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
      <span>{String(minutes).padStart(2, "0")}</span>
      <span className="opacity-70 animate-pulse">:</span>
      <span>{String(seconds).padStart(2, "0")}</span>
    </div>
  );
}
