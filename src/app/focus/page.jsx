"use client";

import { useEffect } from "react";
import useAppStore from "@/store/useAppStore";
import { TimerModule } from "@/components/Focus/TimerModule";
import { TodoPanel } from "@/components/Todo/TodoPanel";

export default function FocusPage() {
  const { loadSettingsFromLocalStorage, isFocusMode } = useAppStore();

  useEffect(() => {
    loadSettingsFromLocalStorage();
  }, [loadSettingsFromLocalStorage]);

  return (
    <div className="fixed inset-0 flex bg-black/30 backdrop-blur-xl">
      <div className="w-[45%] flex items-center justify-center px-10">
        <TimerModule compact />
      </div>

      <div className="w-px bg-white/10" />

      <div className="w-[55%] h-full px-8 py-10 overflow-y-auto">
        <TodoPanel />
      </div>
    </div>
  );
}
