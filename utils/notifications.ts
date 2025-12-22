import Constants from "expo-constants";
import { Platform } from "react-native";

export async function scheduleStreakWarning() {
  // 🚫 Expo Go does not support notifications
  if (Constants.appOwnership === "expo") {
    console.log("Skipping notifications in Expo Go");
    return;
  }

  // ✅ Lazy import (avoids Expo Go crash)
  const Notifications = await import("expo-notifications");

  // Android requires a channel
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("streak", {
      name: "Streak Alerts",
      importance: Notifications.AndroidImportance.HIGH,
    });
  }

  await Notifications.cancelAllScheduledNotificationsAsync();

  const now = new Date();
  const fireDate = new Date();
  fireDate.setHours(23, 0, 0, 0);

  if (fireDate <= now) return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🔥 Streak Alert",
      body: "Your GitHub or LeetCode streak might break today!",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: fireDate,
      channelId: "streak",
    },
  });
}
