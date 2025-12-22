import { Text, StyleSheet } from "react-native";
import { GlassCard } from "./GlassCard";

export function StreakCard({
  title,
  streak,
  color,
}: {
  title: string;
  streak: number;
  color: string;
}) {
  return (
    <GlassCard>
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.streak, { color }]}>🔥 {streak} days</Text>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#aaa",
    fontSize: 14,
    marginBottom: 8,
  },
  streak: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
