import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
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
    platform === "github"
      ? githubData.heatmap
      : leetcodeData.heatmap;

  const accent = platform === "github" ? "#facc15" : "#f59e0b";

  const week = getWeeklySummary(data);
  const month = getMonthlySummary(data);
  const compare = getComparison(
    data.slice(-7),
    data.slice(-14, -7)
  );

  return (
    <LinearGradient
      colors={["#050505", "#0b1220", "#020617"]}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Your Stats</Text>

        {/* PLATFORM TOGGLE */}
        <View style={styles.toggleRow}>
          <Pressable
            onPress={() => setPlatform("github")}
            style={[
              styles.toggleBtn,
              platform === "github" && styles.githubActive,
            ]}
          >
            <Text style={styles.toggleText}>
              GitHub · {github}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setPlatform("leetcode")}
            style={[
              styles.toggleBtn,
              platform === "leetcode" && styles.leetcodeActive,
            ]}
          >
            <Text style={styles.toggleText}>
              LeetCode · {leetcode}
            </Text>
          </Pressable>
        </View>

        {/* STREAKS */}
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

        {/* WEEK */}
        <View style={styles.row}>
          <StatCard
            label="Active Days (7d)"
            value={`${week.activeDays}/7`}
            accent={accent}
          />
          <StatCard
            label="Total (7d)"
            value={`${week.total}`}
            accent={accent}
          />
        </View>

        {/* MONTH */}
        <View style={styles.row}>
          <StatCard
            label="Active Days (30d)"
            value={`${month.activeDays}/30`}
            accent={accent}
          />
          <StatCard
            label="Total (30d)"
            value={`${month.total}`}
            accent={accent}
          />
        </View>

        {/* HEALTH */}
        <View style={styles.row}>
          <StatCard
            label="Week-over-week"
            value={`${compare}%`}
            accent={compare >= 0 ? "#22c55e" : "#ef4444"}
          />
          <StatCard
            label="Health Score"
            value={`${getHealthScore(data)}/100`}
            accent="#facc15"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#e5e7eb",
    marginBottom: 18,
  },

  toggleRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },

  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "rgba(255,255,255,0.04)",
  },

  toggleText: {
    color: "#e5e7eb",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },

  githubActive: {
    borderColor: "#facc15",
    backgroundColor: "rgba(250,204,21,0.15)",
  },

  leetcodeActive: {
    borderColor: "#f59e0b",
    backgroundColor: "rgba(245,158,11,0.15)",
  },

  row: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 16,
  },
});
