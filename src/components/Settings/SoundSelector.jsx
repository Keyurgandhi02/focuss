"use client";

import { Music, Brain, Zap, Leaf, VolumeX } from "lucide-react";

const MODES = [
  { id: "off", label: "Off", icon: VolumeX },
  { id: "study", label: "Study", icon: Music },
  { id: "deep", label: "Deep", icon: Brain },
  { id: "normal", label: "Normal", icon: Leaf },
  { id: "energy", label: "Energy", icon: Zap },
];

export function SoundSelector({ soundMode, onChange }) {
  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
      {MODES.map((mode) => {
        const Icon = mode.icon;
        const active = soundMode === mode.id;

        return (
          <button
            key={mode.id}
            onClick={() => onChange(mode.id)}
            className={`
              flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs
              transition-all duration-200 cursor-pointer

              ${
                active
                  ? "bg-white text-black"
                  : "text-white/50 hover:text-white hover:bg-white/10"
              }

              ${
                mode.id === "off" && !active
                  ? "opacity-40 hover:opacity-70"
                  : ""
              }
            `}
          >
            <Icon size={13} />
            {mode.label}
          </button>
        );
      })}
    </div>
  );
}
