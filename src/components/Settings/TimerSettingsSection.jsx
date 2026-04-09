"use client";

import { Input } from "@/components/ui/Input";
import { DurationQuickSelect } from "@/components/Settings/DurationQuickSelect";

export function TimerSettingsSection({
  focusDuration,
  breakDuration,
  onFocusDurationChange,
  onDurationSelect,
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Timer Settings</h2>
      <p className="text-white/60 text-sm mb-6">
        Select a default focus duration.
      </p>

      <div className="mb-4">
        <DurationQuickSelect
          focusDuration={focusDuration}
          onDurationSelect={onDurationSelect}
        />
      </div>

      <p className="text-white/40 text-sm mt-2">
        Break time is calculated automatically based on your focus duration.
      </p>
    </div>
  );
}
