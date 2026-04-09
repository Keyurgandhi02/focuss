"use client";

import useAppStore from "@/store/useAppStore";
import { Card } from "@/components/ui/Card";
import { RingChart } from "@/components/Dashboard/RingChart";
import Insights from "@/components/Dashboard/Insights";
import StreaksCard from "@/components/Dashboard/StreaksCard";

export default function Dashboard() {
  const { dailyStats, resetStats, streak } = useAppStore();

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

  const downloadData = () => {
    const blob = new Blob([JSON.stringify(dailyStats, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "workmode-stats.json";
    a.click();
  };

  return (
    <div className="w-full px-6 md:px-10 py-10 space-y-10">
      <div className="flex justify-between items-center">
        <p className="text-white/60 text-sm">Productivity Overview</p>

        {/* <div className="flex gap-3">
          <button
            onClick={downloadData}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white text-sm transition"
          >
            Download
          </button>

          <button
            onClick={resetStats}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-full text-white text-sm transition"
          >
            Reset
          </button>
        </div> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 text-center backdrop-blur-xl  border-white/10">
          <p className="text-white/50">Focus</p>
          <p className="text-4xl text-blue-400">{focusHours}h</p>
        </Card>

        <Card className="p-6 text-center backdrop-blur-xl border border-white/10">
          <p className="text-white/50">Break</p>
          <p className="text-4xl text-purple-400">{breakHours}h</p>
        </Card>

        <Card className="p-6 text-center backdrop-blur-xl border border-white/10">
          <p className="text-white/50">Sessions</p>
          <p className="text-4xl text-green-400">{dailyStats.sessions}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        <Card className="p-8 flex items-center justify-center backdrop-blur-xl border border-white/10">
          <div className="flex gap-10">
            <RingChart value={productivity} color="#3b82f6" label="Focus" />
            <RingChart value={breakRatio} color="#a855f7" label="Break" />
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-xl border border-white/10">
          <StreaksCard streak={streak} />
        </Card>
      </div>

      <Card className="p-6 backdrop-blur-xl border border-white/10">
        <Insights stats={dailyStats} productivity={productivity} />
      </Card>
    </div>
  );
}
