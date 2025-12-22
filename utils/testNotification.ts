import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export async function testNotification() {
  try {
    // Ask permission
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      console.log("❌ Notification permission not granted");
      return;
    }

    // Android notification channel (REQUIRED)
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "Default",
        importance: Notifications.AndroidImportance.HIGH,
      });
    }

    // Schedule test notification (after 10 seconds)
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🔥 Notification Test",
        body: "If you see this, notifications are working!",
      },
      trigger: {
        seconds: 10,
        channelId: "default",
      },
    });

    console.log("✅ Test notification scheduled");
  } catch (error) {
    console.log("❌ Notification error:", error);
  }
}
