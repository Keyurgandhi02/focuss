import { LineChart as LineChartIcon } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";

export default function Insights({ stats, productivity }) {
  const hasData = stats.sessions > 0;

  if (!hasData) {
    return (
      <EmptyState
        icon={LineChartIcon}
        title="No insights yet"
        subtitle="Complete a focus session to unlock insights"
      />
    );
  }

  const avgSession = Math.round(stats.focusTime / stats.sessions / 60);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <p className="text-white/50 text-sm">Productivity</p>

        <div className="flex items-end gap-2 mt-2">
          <h2 className="text-4xl font-bold text-green-400">{productivity}%</h2>
          <span className="text-white/40 text-sm mb-1">today</span>
        </div>

        {/* progress bar */}
        <div className="mt-4 h-2 w-full rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-green-400 rounded-full transition-all duration-700"
            style={{ width: `${productivity}%` }}
          />
        </div>
      </div>

      {/* Avg Session */}
      <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <p className="text-white/50 text-sm">Avg Session</p>

        <h2 className="text-3xl text-blue-400 mt-2 font-semibold">
          {avgSession}m
        </h2>

        <p className="text-white/40 text-xs mt-1">
          You're building consistency
        </p>
      </div>

      {/* Focus Ratio */}
      <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <p className="text-white/50 text-sm">Focus Ratio</p>

        <h2 className="text-3xl text-purple-400 mt-2 font-semibold">
          {productivity}%
        </h2>

        <p className="text-white/40 text-xs mt-1">Stay in the zone</p>
      </div>
    </div>
  );
}
