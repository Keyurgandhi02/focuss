"use client";

export function PreferencesSection({
  notificationsEnabled,
  soundEnabled,
  onNotificationsChange,
  onSoundChange,
}) {
  const handleNotificationToggle = async () => {
    if (!notificationsEnabled) {
      if ("Notification" in window) {
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
          onNotificationsChange(true);
        } else {
          onNotificationsChange(false);

          if (permission === "denied") {
            alert("Please enable notifications from browser settings");
          }
        }
      }
    } else {
      onNotificationsChange(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">Preferences</h2>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-medium">Notifications</p>
            <p className="text-white/40 text-sm">
              Get notified when sessions end
            </p>
          </div>

          <button
            onClick={handleNotificationToggle}
            className={`
              relative w-12 h-7 rounded-full transition-all duration-300
              ${notificationsEnabled ? "bg-white" : "bg-white/20"}
            `}
          >
            <span
              className={`
                absolute top-1 left-1 w-5 h-5 rounded-full bg-black
                transition-all duration-300
                ${notificationsEnabled ? "translate-x-5" : ""}
              `}
            />
          </button>
        </div>

        {/* 🔊 SOUND */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-medium">Sound Effects</p>
            <p className="text-white/40 text-sm">Play audio feedback</p>
          </div>

          <button
            onClick={() => onSoundChange(!soundEnabled)}
            className={`
              relative w-12 h-7 rounded-full transition-all duration-300
              ${soundEnabled ? "bg-white" : "bg-white/20"}
            `}
          >
            <span
              className={`
                absolute top-1 left-1 w-5 h-5 rounded-full bg-black
                transition-all duration-300
                ${soundEnabled ? "translate-x-5" : ""}
              `}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
