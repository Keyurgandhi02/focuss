import { useTimerStore } from "@/store/useTimerStore";

export function sendNotification(title, body) {
  if (typeof window === "undefined") return;

  if (!("Notification" in window)) return;

  const { notificationsEnabled } = useTimerStore.getState();

  if (!notificationsEnabled) return;

  if (Notification.permission === "granted") {
    new Notification(title, {
      body,
      icon: "/icon.png",
    });
  }
}
