import * as Notifications from "expo-notifications";
import { getISTTimes, getLocalEndOfDayOffsets } from "./time";

/* ---------- CANCEL ALL ---------- */
export async function cancelAllStreakNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

/* ---------- GITHUB (LOCAL TIME) ---------- */
export async function scheduleGithubNotifications() {
  const now = new Date();

  for (const offset of getLocalEndOfDayOffsets()) {
    const trigger = new Date(now);
    trigger.setHours(24 - offset.hoursBefore, 0, 0, 0);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "GitHub streak at risk",
        body: "You haven’t committed today. One small commit keeps it alive.",
        sound: true,
      },
      trigger,
    });
  }
}

/* ---------- LEETCODE (IST FIXED) ---------- */
export async function scheduleLeetCodeNotifications() {
  const now = new Date();

  for (const t of getISTTimes()) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "LeetCode streak reminder",
        body: "Solve one problem to keep your streak alive.",
        sound: true,
      },
      trigger: {
        hour: t.hour,
        minute: t.minute,
        repeats: true,
      },
    });
  }
}
