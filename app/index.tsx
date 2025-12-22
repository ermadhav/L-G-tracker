import { View, Text, StyleSheet } from "react-native";
import StreakCard from "../components/StreakCard";
import { useGithubStreak } from "../hooks/useGithubStreak";
import { useLeetcodeStreak } from "../hooks/useLeetcodeStreak";
import { GITHUB_TOKEN, LEETCODE_USERNAME } from "../constants/config";

export default function HomeScreen() {
  const github = useGithubStreak(GITHUB_TOKEN);
  const leetcode = useLeetcodeStreak(LEETCODE_USERNAME);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🔥 Streak Tracker</Text>

      <StreakCard
        title="GitHub Commit Streak"
        streak={github.streak}
        loading={github.loading}
      />

      <StreakCard
        title="LeetCode Streak"
        streak={leetcode.streak}
        loading={leetcode.loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212",
  },
  header: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
  },
});
