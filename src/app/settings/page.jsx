"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { TimerSettingsSection } from "@/components/Settings/TimerSettingsSection";
import { PreferencesSection } from "@/components/Settings/PreferencesSection";
import { ProductivityTips } from "@/components/Settings/ProductivityTips";
import { useTimerStore } from "@/store/useTimerStore";

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
  } = useTimerStore();

  const [justSaved, setJustSaved] = useState(false);

  const triggerAutoSave = () => {
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 1500);
  };

  const handleDurationSelect = (duration) => {
    setFocusDuration(duration);
    triggerAutoSave();
  };

  return (
    <div className="min-h-screen pt-24 pb-32">
      <div className="max-w-2xl mx-auto px-4 py-12">
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
            <TimerSettingsSection
              focusDuration={focusDuration}
              breakDuration={breakDuration}
              onFocusDurationChange={(val) => {
                setFocusDuration(val);
                triggerAutoSave();
              }}
              onDurationSelect={handleDurationSelect}
            />

            <div className="border-t border-white/10" />

            <PreferencesSection
              notificationsEnabled={notificationsEnabled}
              soundEnabled={soundEnabled}
              onNotificationsChange={(val) => {
                setNotificationsEnabled(val);
                triggerAutoSave();
              }}
              onSoundChange={(val) => {
                setSoundEnabled(val);
                triggerAutoSave();
              }}
            />

            <div className="text-right h-4">
              {justSaved ? (
                <span className="text-green-400 text-sm transition">
                  Saved ✓
                </span>
              ) : (
                <span className="text-white/30 text-xs">
                  Changes are saved automatically
                </span>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
