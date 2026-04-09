"use client";

import { useEffect } from "react";
import useAppStore from "@/store/useAppStore";
import { TimerModule } from "@/components/Focus/TimerModule";

export default function FocusPage() {
  const { loadSettingsFromLocalStorage } = useAppStore();

  useEffect(() => {
    loadSettingsFromLocalStorage();
  }, [loadSettingsFromLocalStorage]);

  return (
    <div className="min-h-dvh flex items-center justify-center px-6 pb-23">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-center">
          <TimerModule />
        </div>
      </div>
    </div>
  );
}
