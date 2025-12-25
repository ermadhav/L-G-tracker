import "dotenv/config";

export default {
  expo: {
    name: "Dev Streaks",
    slug: "streak-tracker",
    scheme: "streaktracker",
    userInterfaceStyle: "automatic",

    // ✅ APP ICON
    icon: "./assets/icon.png",

    // ✅ ANDROID CONFIG (REQUIRED)
    android: {
      package: "com.cosmocoder.streaktracker",
      adaptiveIcon: {
        foregroundImage: "./assets/icon.png",
        backgroundColor: "#020617",
      },
    },

    // ✅ NOTIFICATION ICON
    notification: {
      icon: "./assets/notification-icon.png",
      color: "#22c55e",
    },

    plugins: ["expo-router"],

    extra: {
      githubToken: process.env.GITHUB_TOKEN,
    },
  },
};
