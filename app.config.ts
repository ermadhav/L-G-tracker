import "dotenv/config";

export default {
  expo: {
    name: "streak-tracker",
    slug: "streak-tracker",
    version: "1.0.0",
    userInterfaceStyle: "automatic",
    plugins: ["expo-router"],
    extra: {
      githubToken: process.env.GITHUB_TOKEN,
      leetcodeUsername: process.env.LEETCODE_USERNAME,
    },
  },
};
