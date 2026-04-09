"use client";

import { Card } from "@/components/ui/Card";
import { FloatingActionButton } from "@/components/Dashboard/FloatingActionButton";

export default function Dashboard() {
  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Dashboard
          </h1>
          <p className="text-xl text-white/60">
            Welcome to your productivity hub
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Today's Focus", value: "0h", icon: "🎯" },
            { label: "Sessions", value: "0", icon: "✅" },
            { label: "Total Time", value: "0h", icon: "⏱️" },
          ].map((stat, i) => (
            <Card key={i} className="p-6">
              <div className="text-3xl mb-3">{stat.icon}</div>
              <p className="text-white/60 text-sm mb-2">{stat.label}</p>
              <p className="text-4xl font-bold text-white">{stat.value}</p>
            </Card>
          ))}
        </div>

        {/* Quick Timer */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Start</h2>
          <p className="text-white/60 mb-6">
            Ready to focus? Click the button in the bottom right corner to start
            a work session.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-white/40 text-sm mb-2">Focus Time</p>
              <p className="text-3xl font-bold text-blue-400">60m</p>
            </div>
            <div>
              <p className="text-white/40 text-sm mb-2">Break Time</p>
              <p className="text-3xl font-bold text-purple-400">12m</p>
            </div>
            <div>
              <p className="text-white/40 text-sm mb-2">Status</p>
              <p className="text-3xl font-bold text-green-400">Ready</p>
            </div>
          </div>
        </Card>

        {/* FAB */}
        <FloatingActionButton />
      </div>
    </div>
  );
}
