import { Play, Pause, RotateCcw } from "lucide-react";

export function SessionControls({
  sessionState,
  selectedMode,
  onStart,
  onPause,
  onResume,
  onReset,
}) {
  const isRunning = sessionState === "work" || sessionState === "break";
  const isPaused = sessionState === "paused";

  return (
    <div className="flex items-center gap-6">
      {/* 🔥 MAIN BUTTON */}
      <button
        onClick={
          sessionState === "idle" ? onStart : isRunning ? onPause : onResume
        }
        className="w-16 h-16 rounded-full 
        bg-white text-black cursor-pointer
        flex items-center justify-center
        shadow-[0_10px_30px_rgba(0,0,0,0.5)]
        hover:scale-110 active:scale-95 transition-all duration-200"
      >
        {sessionState === "idle" || isPaused ? <Play /> : <Pause />}
      </button>

      {/* 🔹 RESET */}
      {(sessionState === "work" || sessionState === "break") && (
        <button
          onClick={onReset}
          className="w-12 h-12 rounded-full 
          bg-white/10 border border-white/10 text-white
          flex items-center justify-center
          hover:bg-white/20 transition cursor-pointer"
        >
          <RotateCcw size={18} />
        </button>
      )}
    </div>
  );
}
