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
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Dev Streaks</Text>

            <View style={{ flexDirection: "row", gap: 10 }}>
              <Pressable
                onPress={() => router.push("/stats")}
                style={styles.statsBtn}
              >
                <Text style={styles.statsText}>📊 Stats</Text>
              </Pressable>

              <Pressable
                onPress={() => router.push("/settings")}
                style={styles.settingsBtn}
              >
                <Text style={styles.settingsText}>⚙️</Text>
              </Pressable>
            </View>
          </View>

          {/* Cards */}
          <View
            style={[styles.cardsWrapper, isWide && styles.cardsWrapperWide]}
          >
            {/* ---------------- GITHUB ---------------- */}
            <View style={styles.card}>
              <StreakCard
                title={`GitHub · ${github}`}
                streak={githubData.currentStreak ?? 0}
                loading={githubData.loading}
              />
              
              {!githubData.loading && (
                <View
                  style={styles.heatmapWrapper}
                  onLayout={(e) =>
                    setGithubWidth(e.nativeEvent.layout.width)
                  }
                >
                  {Array.isArray(githubData.heatmap) &&
                    githubData.heatmap.length > 0 &&
                    githubWidth > 0 && (
                      <Heatmap
                        data={githubData.heatmap}
                        containerWidth={githubWidth}
                      />
                    )}
                </View>
              )}
            </View>

            {/* ---------------- LEETCODE ---------------- */}
            <View style={styles.card}>
              <StreakCard
                title={`LeetCode · ${leetcode}`}
                streak={leetcodeData.currentStreak ?? 0}
                loading={leetcodeData.loading}
              />

              {!leetcodeData.loading && (
                <View
                  style={styles.heatmapWrapper}
                  onLayout={(e) =>
                    setLeetcodeWidth(e.nativeEvent.layout.width)
                  }
                >
                  {Array.isArray(leetcodeData.heatmap) &&
                    leetcodeData.heatmap.length > 0 &&
                    leetcodeWidth > 0 && (
                      <Heatmap
                        data={leetcodeData.heatmap}
                        containerWidth={leetcodeWidth}
                      />
                    )}
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  content: {
    paddingHorizontal: moderateScale(20),
    paddingTop: verticalScale(60),
    paddingBottom: verticalScale(40),
  },

  tabletContent: {
    alignSelf: "center",
    maxWidth: 900,
    width: "100%",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(30),
  },

  title: {
    fontSize: moderateScale(28),
    fontWeight: "800",
    color: "#e5e7eb",
  },

  settingsBtn: {
    padding: moderateScale(12),
    borderRadius: moderateScale(16),
    backgroundColor: "rgba(34,197,94,0.15)",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.4)",
  },

  settingsText: {
    fontSize: moderateScale(18),
    color: "#22c55e",
  },

  statsBtn: {
    padding: moderateScale(12),
    borderRadius: moderateScale(16),
    backgroundColor: "rgba(250,204,21,0.15)",
    borderWidth: 1,
    borderColor: "rgba(250,204,21,0.4)",
  },

  statsText: {
    fontSize: moderateScale(18),
    color: "#facc15",
  },

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
    borderRadius: moderateScale(20),
    padding: moderateScale(16),
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    overflow: "hidden",
  },

  heatmapWrapper: {
    marginTop: verticalScale(14),
    padding: moderateScale(12),
    borderRadius: moderateScale(14),
    backgroundColor: "rgba(0,0,0,0.35)",
    minHeight: 100,
  },
});
