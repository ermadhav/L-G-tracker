import "dotenv/config";

export default {
  expo: {
    name: "streak-tracker",
    slug: "streak-tracker",
    scheme: "streaktracker",
    userInterfaceStyle: "automatic",
    plugins: ["expo-router"],
    extra: {
      githubToken: process.env.GITHUB_TOKEN,
    },
  },
};
