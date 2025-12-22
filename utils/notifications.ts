import Constants from "expo-constants";

export async function scheduleStreakWarning() {
  if (Constants.appOwnership === "expo") {
    console.log("Skipping notifications in Expo Go");
    return;
  }

  const Notifications = await import("expo-notifications");

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🔥 Streak Alert",
      body: "Your streak might break today!",
    },
    trigger: { seconds: 5 },
  });
}
