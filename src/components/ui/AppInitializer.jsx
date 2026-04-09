"use client";

import { useEffect } from "react";
import useAppStore from "@/store/useAppStore";

export function AppInitializer() {
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
    useAppStore.getState().loadStats();
    useAppStore.getState().loadStreak();
  }, []);

  return null;
}
