"use client";

import { Button } from "@/components/ui/Button";

const MODE_OPTIONS = [
  { id: "focus", label: "Focus" },
  { id: "shortBreak", label: "Short Break" },
  { id: "longBreak", label: "Long Break" },
];

export function ModeSelector({ selectedMode, onModeChange }) {
  return (
    <div className="w-full max-w-4xl text-center">
      <p className="text-sm uppercase tracking-[0.32em] text-white/50 mb-4">
        What do you want to focus on?
      </p>
      <h1 className="text-2xl md:text-4xl lg:text-5xl max-w-2xl mx-auto font-semibold text-white leading-tight">
        Choose a timer mode and sink into your next session.
      </h1>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {MODE_OPTIONS.map((mode) => (
          <Button
            key={mode.id}
            variant={selectedMode === mode.id ? "primary" : "secondary"}
            size="md"
            className="rounded-full px-6 py-3"
            onClick={() => onModeChange(mode.id)}
          >
            {mode.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
