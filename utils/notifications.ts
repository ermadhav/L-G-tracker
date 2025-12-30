import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export async function registerForNotifications() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") return;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("streaks", {
      name: "Streak Reminders",
      importance: Notifications.AndroidImportance.HIGH,
    });
  }
}
