"use client";

import { useEffect } from "react";
import { useTimerStore } from "@/store/useTimerStore";
import { useAnalyticsStore } from "@/store/useAnalyticsStore";

export function AppInitializer() {
  useEffect(() => {
    useTimerStore.persist.rehydrate();
    useAnalyticsStore.persist.rehydrate();
  }, []);

  return null;
}
