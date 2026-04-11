"use client";

import { memo } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

export const SessionControls = memo(function SessionControls({
  sessionState,
  isPlaying,
  onStart,
  onPause,
  onResume,
  onReset,
}) {
  const isActive =
    sessionState === "work" ||
    sessionState === "break" ||
    sessionState === "paused";

  const handleClick = () => {
    if (sessionState === "idle") onStart();
    else if (isPlaying) onPause();
    else onResume();
  };

  return (
    <div className="relative flex items-center justify-center h-20 w-44">
      <button
        onClick={handleClick}
        className={`
          absolute z-20
          w-20 h-20 rounded-full 
          flex items-center justify-center
          cursor-pointer
          bg-white text-black
         
          transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          hover:scale-110 active:scale-95
          ${isActive ? "-translate-x-8" : "translate-x-0"}
        `}
      >
        {sessionState === "idle" || !isPlaying ? (
          <Play size={26} />
        ) : (
          <Pause size={26} />
        )}
      </button>

      <button
        onClick={onReset}
        className={`
          absolute z-10
          w-14 h-14 rounded-full ml-3
          flex items-center justify-center
          cursor-pointer
          backdrop-blur-xl
          bg-white/5 border border-white/10
          text-white/80
          shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_10px_30px_rgba(0,0,0,0.5)]
          transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          hover:bg-white/10 hover:scale-105 active:scale-95
          ${
            isActive
              ? "translate-x-10 opacity-100 scale-100 pointer-events-auto"
              : "translate-x-20 opacity-0 scale-75 pointer-events-none"
          }
        `}
      >
        <RotateCcw size={18} />
      </button>

      <div className="absolute w-28 h-28 rounded-full bg-white/5 blur-2xl opacity-20 pointer-events-none" />
    </div>
  );
});
