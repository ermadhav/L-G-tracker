import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

export async function registerForNotifications() {
  if (!Device.isDevice) return;

  const { status } = await Notifications.getPermissionsAsync();
  let finalStatus = status;

  if (status !== "granted") {
    const res = await Notifications.requestPermissionsAsync();
    finalStatus = res.status;
  }

  if (finalStatus !== "granted") {
    console.log("Notification permission not granted");
    return;
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("streaks", {
      name: "Streak Reminders",
      importance: Notifications.AndroidImportance.HIGH,
    });
  }
}
