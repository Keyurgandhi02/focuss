import { CalendarDays } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";

export function Heatmap({ data }) {
  const days = Array.from({ length: 30 });

  const getColor = (value) => {
    if (value > 180) return "bg-green-500";
    if (value > 120) return "bg-green-400";
    if (value > 60) return "bg-green-300";
    if (value > 0) return "bg-green-200";
    return "bg-white/10";
  };

  const hasData = data && data.length > 0 && data.some((v) => v > 0);

  if (!hasData) {
    return (
      <EmptyState
        icon={CalendarDays}
        title="No activity yet"
        subtitle="Your focus sessions will appear here"
      />
    );
  }

  return (
    <div className="grid grid-cols-10 gap-2">
      {days.map((_, i) => {
        const value = data[i] || 0;

        return (
          <div
            key={i}
            className={`w-4 h-4 rounded-sm ${getColor(value)} hover:scale-125 transition`}
            title={`${value} min`}
          />
        );
      })}
    </div>
  );
}
