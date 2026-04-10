"use client";

import { useAnalyticsStore } from "@/store/useAnalyticsStore";
import { Card } from "@/components/ui/Card";
import { RingChart } from "@/components/Dashboard/RingChart";
import Insights from "@/components/Dashboard/Insights";
import StreaksCard from "@/components/Dashboard/StreaksCard";
import { WeeklyChart } from "@/components/Dashboard/WeeklyChart";
import { Heatmap } from "@/components/Dashboard/Heatmap";
import { ProductivityTips } from "@/components/Settings/ProductivityTips";

export default function Dashboard() {
  const { dailyStats, streak, weeklyStats, heatmapStats } = useAnalyticsStore();

  const hasData = dailyStats.sessions > 0;

  const focusHours = (dailyStats.focusTime / 3600).toFixed(1);
  const breakHours = (dailyStats.breakTime / 3600).toFixed(1);

  const productivity =
    dailyStats.focusTime > 0
      ? Math.round(
          (dailyStats.focusTime /
            (dailyStats.focusTime + dailyStats.breakTime)) *
            100,
        )
      : 0;

  const breakRatio = 100 - productivity;

  return (
    <div className="w-full px-6 md:px-10 py-10 space-y-12">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
          Dashboard
        </h1>
        <p className="text-white/40 text-sm">
          {hasData ? "Your daily performance" : "Start a session to see stats"}
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Focus", value: `${focusHours}h`, color: "text-blue-400" },
          { label: "Break", value: `${breakHours}h`, color: "text-purple-400" },
          {
            label: "Sessions",
            value: dailyStats.sessions,
            color: "text-green-400",
          },
        ].map((item, i) => (
          <Card
            key={i}
            className="p-6 text-center border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition"
          >
            <p className="text-white/40 text-sm mb-2">{item.label}</p>
            <p className={`text-4xl font-semibold ${item.color}`}>
              {hasData ? item.value : "--"}
            </p>
          </Card>
        ))}
      </div>

      {/* RINGS + STREAK */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        <Card className="p-10 flex items-center justify-center border border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="flex gap-12">
            <RingChart value={productivity} color="#3b82f6" label="Focus" />
            <RingChart value={breakRatio} color="#a855f7" label="Break" />
          </div>
        </Card>

        <Card className="p-6 border border-white/10 bg-white/5 backdrop-blur-xl">
          <StreaksCard streak={streak} />
        </Card>
      </div>

      {/* INSIGHTS */}
      <Card className="p-6 border border-white/10 bg-white/5 backdrop-blur-xl">
        <Insights stats={dailyStats} productivity={productivity} />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border border-white/10 bg-white/5 backdrop-blur-xl">
          <h3 className="text-white mb-4 text-sm tracking-wide">
            Weekly Focus
          </h3>
          <WeeklyChart data={weeklyStats} />
        </Card>

        <Card className="p-6 border border-white/10 bg-white/5 backdrop-blur-xl">
          <h3 className="text-white mb-4 text-sm tracking-wide">
            Activity Heatmap
          </h3>
          <Heatmap data={heatmapStats} />
        </Card>
      </div>

      <Card className="p-6 border border-white/10 bg-white/5 backdrop-blur-xl">
        <ProductivityTips />
      </Card>
    </div>
  );
}
