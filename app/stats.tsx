import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

import { useUsernames } from "../hooks/useUsernames";
import { useGithubStreak } from "../hooks/useGithubStreak";
import { useLeetCodeStreak } from "../hooks/useLeetCodeStreak";

import StatCard from "../components/StatCard";
import {
  getWeeklySummary,
  getMonthlySummary,
  getLongestStreak,
  getCurrentStreak,
  getLastActiveDay,
  getComparison,
  getHealthScore,
} from "../utils/stats";

type Platform = "github" | "leetcode";

export default function Stats() {
  const { github, leetcode } = useUsernames();
  const githubData = useGithubStreak(github);
  const leetcodeData = useLeetCodeStreak(leetcode);

  const [platform, setPlatform] = useState<Platform>("github");

  if (githubData.loading || leetcodeData.loading) return null;

  const data =
    platform === "github" ? githubData.heatmap : leetcodeData.heatmap;

  const accent = platform === "github" ? "#facc15" : "#f59e0b";

  const week = getWeeklySummary(data);
  const month = getMonthlySummary(data);
  const compare = getComparison(data.slice(-7), data.slice(-14, -7));

  return (
    <LinearGradient
      colors={["#050505", "#0b1220", "#020617"]}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Progress</Text>
          <Text style={styles.subtitle}>
            Track consistency, not competition
          </Text>
        </View>

        {/* PLATFORM TOGGLE */}
        <View style={styles.toggleRow}>
          <Pressable onPress={() => setPlatform("github")}>
            <Text
              style={[
                styles.toggleLabel,
                platform === "github" && styles.toggleActive,
              ]}
            >
              GitHub · {github}
            </Text>
            {platform === "github" && <View style={styles.underline} />}
          </Pressable>

          <Pressable onPress={() => setPlatform("leetcode")}>
            <Text
              style={[
                styles.toggleLabel,
                platform === "leetcode" && styles.toggleActive,
              ]}
            >
              LeetCode · {leetcode}
            </Text>
            {platform === "leetcode" && <View style={styles.underline} />}
          </Pressable>
        </View>

        {/* STREAKS */}
        <Text style={styles.section}>Streaks</Text>
        <View style={styles.row}>
          <StatCard
            label="Current Streak"
            value={`${getCurrentStreak(data)} days`}
            accent={accent}
          />
          <StatCard
            label="Longest Streak"
            value={`${getLongestStreak(data)} days`}
            accent={accent}
          />
        </View>

        {/* WEEKLY */}
        <Text style={styles.section}>This Week</Text>
        <View style={styles.row}>
          <StatCard
            label="Active Days"
            value={`${week.activeDays}/7`}
            accent={accent}
          />
          <StatCard
            label="Total Activity"
            value={`${week.total}`}
            accent={accent}
          />
        </View>

        {/* MONTHLY */}
        <Text style={styles.section}>This Month</Text>
        <View style={styles.row}>
          <StatCard
            label="Active Days"
            value={`${month.activeDays}/30`}
            accent={accent}
          />
          <StatCard
            label="Total Activity"
            value={`${month.total}`}
            accent={accent}
          />
        </View>

        {/* HEALTH */}
        <Text style={styles.section}>Consistency</Text>
        <View style={styles.row}>
          <StatCard
            label="Week-over-week"
            value={`${compare}%`}
            accent={compare >= 0 ? "#22c55e" : "#ef4444"}
          />
          <StatCard
            label="Health Score"
            value={`${getHealthScore(data)}/100`}
            accent="#22c55e"
          />
        </View>

        {/* LAST ACTIVE */}
        <View style={styles.row}>
          <StatCard
            label="Last Active"
            value={getLastActiveDay(data)}
            accent={accent}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  toggleRow: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 26,
  },

  toggleLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#9ca3af",
  },

  toggleActive: {
    color: "#e5e7eb",
  },

  underline: {
    height: 2,
    marginTop: 6,
    borderRadius: 2,
    backgroundColor: "#facc15",
  },

  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 999,
    padding: 4,
    marginBottom: 26,
  },

  segment: {
    flex: 2,
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },

  segmentText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#9ca3af",
  },

  segmentTextActive: {
    color: "#020617",
  },

  segmentActiveGithub: {
    backgroundColor: "#facc15",
  },

  segmentActiveLeetcode: {
    backgroundColor: "#f59e0b",
  },

  container: {
    flex: 1,
    padding: 20,
  },

  header: {
    marginTop: 25,
    marginBottom: 22,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#e5e7eb",
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#9ca3af",
  },

  toggleWrapper: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 26,
  },

  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 999, // pill
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    backgroundColor: "rgba(255,255,255,0.04)",
  },

  toggleText: {
    color: "#9ca3af",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },

  activeText: {
    color: "#020617",
  },

  githubActive: {
    backgroundColor: "#facc15",
    borderColor: "#facc15",
  },

  leetcodeActive: {
    backgroundColor: "#f59e0b",
    borderColor: "#f59e0b",
  },

  section: {
    marginBottom: 10,
    marginTop: 6,
    fontSize: 14,
    fontWeight: "700",
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  row: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 18,
  },
});
