"use client";

export function PreferencesSection({
  notificationsEnabled,
  soundEnabled,
  onNotificationsChange,
  onSoundChange,
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Preferences</h2>

      <div className="space-y-4">
        <label className="flex items-center gap-4 cursor-pointer">
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={(e) => onNotificationsChange(e.target.checked)}
            className="w-5 h-5 rounded bg-white/10 border border-white/20 cursor-pointer"
          />
          <div>
            <p className="text-white font-medium">Notifications</p>
            <p className="text-white/40 text-sm">
              Get notified when work and break sessions end
            </p>
          </div>
        </label>

        <label className="flex items-center gap-4 cursor-pointer">
          <input
            type="checkbox"
            checked={soundEnabled}
            onChange={(e) => onSoundChange(e.target.checked)}
            className="w-5 h-5 rounded bg-white/10 border border-white/20 cursor-pointer"
          />
          <div>
            <p className="text-white font-medium">Sound Effects</p>
            <p className="text-white/40 text-sm">
              Play audio feedback during sessions
            </p>
          </div>
        </label>
      </div>
    </div>
  );
}
