import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useEffect } from "react";
import { useUsernames } from "../hooks/useUsernames";
import { useGithubStreak } from "../hooks/useGithubStreak";
import { useLeetCodeStreak } from "../hooks/useLeetCodeStreak";
import { Heatmap } from "../components/Heatmap";
import StreakCard from "../components/StreakCard";

export default function Home() {
  const { github, leetcode, loaded } = useUsernames();
  const githubData = useGithubStreak(github);
  const leetcodeData = useLeetCodeStreak(leetcode);

  if (!loaded) return null;

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.push("/settings")}>
        <Text style={styles.settings}>⚙️ Settings</Text>
      </Pressable>

      {/* <Pressable onPress={() => router.push("/test-leetcode")}>
        <Text style={styles.settings}>⚙️ tests</Text>
      </Pressable> */}

      <StreakCard
        title={`GitHub Streak of ${github}`}
        streak={githubData.streak}
        loading={githubData.loading}
      />

      {!githubData.loading && <Heatmap data={githubData.heatmap} />}

      <StreakCard
        title={`LeetCode Streak of ${leetcode}`}
        streak={leetcodeData.streak}
        loading={leetcodeData.loading}
      />

      {!leetcodeData.loading && <Heatmap data={leetcodeData.heatmap} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
    padding: 20,
  },
  settings: {
    color: "#22c55e",
    marginBottom: 16,
  },
});
