"use client";

import { memo } from "react";

export const TimerDisplay = memo(function TimerDisplay({
  displayTime,
  sessionLabel,
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-[80px] md:text-[110px] font-semibold text-white tracking-tight leading-none">
        {Math.floor(displayTime / 60)
          .toString()
          .padStart(2, "0")}
        :{(displayTime % 60).toString().padStart(2, "0")}
      </h1>

      <p className="mt-2 text-white/40 text-xs tracking-[0.35em] uppercase">
        {sessionLabel}
      </p>
    </div>
  );
});
