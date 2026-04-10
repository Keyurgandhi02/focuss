import { Sparkles, Timer, Coffee, Keyboard } from "lucide-react";

const TIPS = [
  {
    icon: Timer,
    title: "Deep Focus",
    desc: "Start with 45–60 minutes of uninterrupted work",
  },
  {
    icon: Coffee,
    title: "Real Breaks",
    desc: "Step away from your screen to recharge properly",
  },
  {
    icon: Keyboard,
    title: "Shortcuts",
    desc: "Use Space to play/pause and R to reset quickly",
  },
  {
    icon: Sparkles,
    title: "Consistency",
    desc: "Small daily wins beat long inconsistent sessions",
  },
];

export function ProductivityTips() {
  return (
    <div className="mt-2">
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="text-white/70" size={18} />
        <h3 className="text-lg font-semibold text-white tracking-tight">
          Productivity Tips
        </h3>
      </div>

      {/* CARD */}
      <div className="p-5 sm:p-6 space-y-4">
        {TIPS.map((tip, i) => {
          const Icon = tip.icon;

          return (
            <div
              key={i}
              className="group flex items-start gap-4 p-3 rounded-2xl transition-all duration-300 hover:bg-white/6"
            >
              {/* ICON */}
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/6 border border-white/10">
                <Icon size={16} className="text-white/70" />
              </div>

              {/* TEXT */}
              <div>
                <p className="text-white text-sm font-medium">{tip.title}</p>
                <p className="text-white/40 text-xs mt-1">{tip.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
