import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

import { useUsernames } from "../hooks/useUsernames";
import { useGithubStreak } from "../hooks/useGithubStreak";
import { useLeetCodeStreak } from "../hooks/useLeetCodeStreak";
import { Heatmap } from "../components/Heatmap";
import StreakCard from "../components/StreakCard";

import { moderateScale, verticalScale } from "../utils/responsive";

export default function Home() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const isWide = width >= 1024;

  const [githubWidth, setGithubWidth] = useState(0);
  const [leetcodeWidth, setLeetcodeWidth] = useState(0);

  const { github, leetcode, loaded } = useUsernames();
  const githubData = useGithubStreak(github);
  const leetcodeData = useLeetCodeStreak(leetcode);

  if (!loaded) return null;

  return (
    <LinearGradient
      colors={["#050505", "#0b1220", "#020617"]}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.content, isTablet && styles.tabletContent]}>
          {/* ===== HEADER ===== */}
          <View style={styles.header}>
            <Text style={styles.title}>Dev Streaks</Text>

            <View style={styles.toolbar}>
              <Pressable
                onPress={() => router.push("/profile-share")}
                style={styles.toolbarBtn}
              >
                <Text style={[styles.toolbarIcon, { color: "#93c5fd" }]}>
                  🔗
                </Text>
              </Pressable>

              <Pressable
                onPress={() => router.push("/stats")}
                style={styles.toolbarBtn}
              >
                <Text style={[styles.toolbarIcon, { color: "#facc15" }]}>
                  📊
                </Text>
              </Pressable>

              <Pressable
                onPress={() => router.push("/settings")}
                style={styles.toolbarBtn}
              >
                <Text style={[styles.toolbarIcon, { color: "#22c55e" }]}>
                  ⚙️
                </Text>
              </Pressable>
              <Pressable
                onPress={() => router.push("/repos")}
                style={styles.toolbarBtn}
              >
                <Text style={[styles.toolbarIcon, { color: "#22c55e" }]}>
                  📂
                </Text>
              </Pressable>
            </View>
          </View>

          {/* ===== CARDS ===== */}
          <View
            style={[styles.cardsWrapper, isWide && styles.cardsWrapperWide]}
          >
            {/* ---------- GITHUB ---------- */}
            <View style={styles.card}>
              <StreakCard
                title={`GitHub · ${github}`}
                streak={githubData.currentStreak ?? 0}
                loading={githubData.loading}
              />

              {/* USER DETAILS */}
              {!githubData.loading && (
                <View style={styles.metaRow}>
                  <Text style={styles.metaText}>
                    🏆 Longest: {githubData.longestStreak} days
                  </Text>
                  <Text style={styles.metaText}>
                    📦 Commits: {githubData.totalCommits}
                  </Text>
                </View>
              )}

              {!githubData.loading && (
                <View
                  style={styles.heatmapWrapper}
                  onLayout={(e) => setGithubWidth(e.nativeEvent.layout.width)}
                >
                  {githubData.heatmap.length > 0 && githubWidth > 0 && (
                    <Heatmap
                      data={githubData.heatmap}
                      containerWidth={githubWidth}
                    />
                  )}
                </View>
              )}
            </View>

            {/* ---------- LEETCODE ---------- */}
            <View style={styles.card}>
              <StreakCard
                title={`LeetCode · ${leetcode}`}
                streak={leetcodeData.currentStreak ?? 0}
                loading={leetcodeData.loading}
              />

              {/* USER DETAILS */}
              {!leetcodeData.loading && (
                <View style={styles.metaColumn}>
                  <Text style={styles.metaText}>
                    🏆 Longest: {leetcodeData.longestStreak} days
                  </Text>
                  <Text style={styles.metaText}>
                    🟢 Easy: {leetcodeData.solved.easy} 🟡 Medium:{" "}
                    {leetcodeData.solved.medium} 🔴 Hard:{" "}
                    {leetcodeData.solved.hard}
                  </Text>
                </View>
              )}

              {!leetcodeData.loading && (
                <View
                  style={styles.heatmapWrapper}
                  onLayout={(e) => setLeetcodeWidth(e.nativeEvent.layout.width)}
                >
                  {leetcodeData.heatmap.length > 0 && leetcodeWidth > 0 && (
                    <Heatmap
                      data={leetcodeData.heatmap}
                      containerWidth={leetcodeWidth}
                    />
                  )}
                </View>
              )}
            </View>
          </View>

          {/* ===== FOOTER ===== */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Made with ❤️ by Cosmo Coder</Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1 },

  content: {
    paddingHorizontal: moderateScale(20),
    paddingTop: verticalScale(50),
    paddingBottom: verticalScale(40),
  },

  tabletContent: {
    alignSelf: "center",
    maxWidth: 900,
    width: "100%",
  },

  /* HEADER */
  header: {
    marginBottom: verticalScale(24),
  },

  title: {
    fontSize: moderateScale(30),
    fontWeight: "800",
    color: "#e5e7eb",
    marginBottom: 12,
  },

  toolbar: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap", // 🔥 future-proof
  },

  toolbarBtn: {
    padding: moderateScale(12),
    borderRadius: moderateScale(16),
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  toolbarIcon: {
    fontSize: moderateScale(18),
  },

  /* CARDS */
  cardsWrapper: {
    gap: verticalScale(22),
  },

  cardsWrapperWide: {
    flexDirection: "row",
    gap: moderateScale(20),
  },

  card: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: moderateScale(22),
    padding: moderateScale(16),
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  metaColumn: {
    marginTop: 10,
    gap: 6,
  },

  metaText: {
    fontSize: 12,
    color: "#9ca3af",
  },

  heatmapWrapper: {
    marginTop: verticalScale(14),
    padding: moderateScale(12),
    borderRadius: moderateScale(14),
    backgroundColor: "rgba(0,0,0,0.35)",
    minHeight: 100,
  },

  /* FOOTER */
  footer: {
    marginTop: verticalScale(40),
    alignItems: "center",
  },

  footerText: {
    fontSize: 12,
    color: "#6b7280",
  },
});
