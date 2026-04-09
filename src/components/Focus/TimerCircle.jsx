"use client";

import { TimerDisplay } from "./TimerDisplay";

export function TimerCircle({  progress, displayTime }) {
  return (
    <div className="relative w-64 h-64 md:w-90 md:h-90 mx-auto">
      <svg className="absolute inset-0 w-full h-full transform -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r="47%"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="8"
        />
        <circle
          cx="50%"
          cy="50%"
          r="47%"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="7"
          strokeDasharray={`${(progress / 100) * 300} 300`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 1s linear" }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <TimerDisplay timeLeft={displayTime} />
      </div>
    </div>
  );
}
