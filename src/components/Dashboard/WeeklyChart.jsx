import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import EmptyState from "@/components/ui/EmptyState";
import { LineChartIcon } from "lucide-react";

export function WeeklyChart({ data }) {
  const hasData = data && data.length > 0 && data.some((d) => d.focus > 0);

  if (!hasData) {
    return (
      <EmptyState
        icon={LineChartIcon}
        title="No weekly data"
        subtitle="Start focusing to build your weekly trend"
      />
    );
  }

  return (
    <div className="w-full h-62.5">
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis
            dataKey="day"
            stroke="#aaa"
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            contentStyle={{
              background: "#111",
              border: "none",
              borderRadius: "10px",
            }}
          />

          <Line
            type="monotone"
            dataKey="focus"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
