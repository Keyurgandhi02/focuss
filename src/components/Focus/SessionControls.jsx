"use client";

import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function SessionControls({
  sessionState,
  isPlaying,
  selectedMode,
  onStart,
  onPause,
  onResume,
  onReset,
}) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {sessionState === "idle" && (
        <Button onClick={onStart}>
          <Play className="inline mr-2" size={20} />
          Start {selectedMode === "focus" ? "Focus" : "Break"}
        </Button>
      )}

      {(sessionState === "work" || sessionState === "break") && (
        <>
          <Button
            variant="secondary"
            size="lg"
            onClick={isPlaying ? onPause : onResume}
          >
            {isPlaying ? (
              <>
                <Pause className="inline mr-2" size={20} />
                Pause
              </>
            ) : (
              <>
                <Play className="inline mr-2" size={20} />
                Resume
              </>
            )}
          </Button>
          <Button variant="outline" size="lg" onClick={onReset}>
            <RotateCcw className="inline mr-2" size={20} />
            Reset
          </Button>
        </>
      )}

      {sessionState === "completed" && (
        <Button variant="success" size="lg" onClick={onStart}>
          <Play className="inline mr-2" size={20} />
          Another Round
        </Button>
      )}
    </div>
  );
}
