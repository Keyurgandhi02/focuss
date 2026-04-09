"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAppStore from "@/store/useAppStore";
import { Card } from "@/components/ui/Card";
import { TimerSettingsSection } from "@/components/Settings/TimerSettingsSection";
import { PreferencesSection } from "@/components/Settings/PreferencesSection";
import { SettingsActions } from "@/components/Settings/SettingsActions";
import { ProductivityTips } from "@/components/Settings/ProductivityTips";

export default function SettingsPage() {
  const router = useRouter();
  const {
    focusDuration,
    breakDuration,
    notificationsEnabled,
    soundEnabled,
    setFocusDuration,
    setNotificationsEnabled,
    setSoundEnabled,
    loadSettingsFromLocalStorage,
    saveSettingsToLocalStorage,
  } = useAppStore();

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    loadSettingsFromLocalStorage();
  }, [loadSettingsFromLocalStorage]);

  const handleSave = () => {
    saveSettingsToLocalStorage();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleDurationSelect = (duration) => {
    setFocusDuration(duration);
  };

  return (
    <div className="min-h-screen pt-24 pb-32">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Settings
          </h1>
          <p className="text-xl text-white/60">
            Customize your focus experience
          </p>
        </div>

        <Card>
          <div className="space-y-8">
            {/* Timer Settings */}
            <TimerSettingsSection
              focusDuration={focusDuration}
              breakDuration={breakDuration}
              onFocusDurationChange={setFocusDuration}
              onDurationSelect={handleDurationSelect}
            />

            {/* Divider */}
            <div className="border-t border-white/10" />

            {/* Preferences */}
            <PreferencesSection
              notificationsEnabled={notificationsEnabled}
              soundEnabled={soundEnabled}
              onNotificationsChange={setNotificationsEnabled}
              onSoundChange={setSoundEnabled}
            />

            {/* Divider */}
            <div className="border-t border-white/10" />

            {/* Actions */}
            <SettingsActions
              isSaved={isSaved}
              onSave={handleSave}
              onCancel={() => router.back()}
            />
          </div>
        </Card>

        {/* Productivity Tips */}
        <ProductivityTips />
      </div>
    </div>
  );
}
