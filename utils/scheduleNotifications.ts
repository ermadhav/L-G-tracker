import * as Notifications from "expo-notifications";

/* ================= HELPERS ================= */

function secondsUntil(target: Date) {
  const now = new Date();
  let diff = (target.getTime() - now.getTime()) / 1000;

  // If time already passed, schedule for next day
  if (diff <= 0) {
    diff += 24 * 60 * 60;
  }

  return Math.floor(diff);
}

/* ================= GITHUB ================= */

export async function scheduleGithubNotifications() {
  const now = new Date();

  // Today at midnight
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);

  const fiveHoursBefore = new Date(midnight);
  fiveHoursBefore.setHours(midnight.getHours() - 5);

  const oneHourBefore = new Date(midnight);
  oneHourBefore.setHours(midnight.getHours() - 1);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "GitHub Streak Reminder",
      body: "5 hours left — make a commit to keep your streak 🔥",
    },
    trigger: {
      seconds: secondsUntil(fiveHoursBefore),
      channelId: "streaks",
    },
  });

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "GitHub Streak At Risk",
      body: "Only 1 hour left! Commit now 🚨",
    },
    trigger: {
      seconds: secondsUntil(oneHourBefore),
      channelId: "streaks",
    },
  });
}

/* ================= LEETCODE (IST RESET) ================= */

export async function scheduleLeetCodeNotifications() {
  const now = new Date();

  // Convert current time to IST
  const istNow = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );

  // Next reset at 5:30 AM IST
  const reset = new Date(istNow);
  reset.setHours(5, 30, 0, 0);

  if (istNow >= reset) {
    reset.setDate(reset.getDate() + 1);
  }

  const fiveHoursBefore = new Date(reset);
  fiveHoursBefore.setHours(reset.getHours() - 5);

  const oneHourBefore = new Date(reset);
  oneHourBefore.setHours(reset.getHours() - 1);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "LeetCode Reminder",
      body: "5 hours left — solve one problem to keep your streak 💡",
    },
    trigger: {
      seconds: secondsUntil(fiveHoursBefore),
      channelId: "streaks",
    },
  });

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "LeetCode Streak At Risk",
      body: "Only 1 hour left! Solve now 🚨",
    },
    trigger: {
      seconds: secondsUntil(oneHourBefore),
      channelId: "streaks",
    },
  });
}

/* ================= CANCEL ================= */

export async function cancelAllStreakNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}
