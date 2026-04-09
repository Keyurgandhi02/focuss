"use client";

export function TimerDisplay({ timeLeft }) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-9xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight">
      <span className="block">
        {String(minutes).padStart(2, "0")}
        <span className="text-7xl md:text-6xl lg:text-7xl opacity-70">:</span>
        {String(seconds).padStart(2, "0")}
      </span>
    </div>
  );
}
