import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StreakCard } from "@/components/StreakCard";
import { useGithubStreak } from "@/hooks/useGithubStreak";
import { useLeetCodeStreak } from "@/hooks/useLeetCodeStreak";

export default function Home() {
  const { streak: gh } = useGithubStreak("ermadhav");
  const { streak: lc } = useLeetCodeStreak("cosmocoders");

  return (
    <LinearGradient
      colors={["#050505", "#0b0b0b", "#050505"]}
      style={styles.container}
    >
      <StreakCard title="GitHub Streak" streak={gh} color="#00ffcc" />
      <StreakCard title="LeetCode Streak" streak={lc} color="#ffaa00" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
