import { Button } from "@/components/ui/Button";

const QUICK_SELECT_DURATIONS = [15, 45, 60, 75];

export function DurationQuickSelect({ focusDuration, onDurationSelect }) {
  return (
    <div className="flex flex-wrap gap-3">
      {QUICK_SELECT_DURATIONS.map((duration) => (
        <Button
          key={duration}
          variant={focusDuration === duration ? "primary" : "secondary"}
          size="md"
          className="rounded-full px-6 py-3"
          onClick={() => onDurationSelect(duration)}
        >
          {duration} min
        </Button>
      ))}
    </div>
  );
}
