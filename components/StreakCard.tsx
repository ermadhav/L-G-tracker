import { View, Text, StyleSheet } from "react-native";

export default function StreakCard({
  title,
  streak,
  loading,
}: {
  title: string;
  streak: number;
  loading: boolean;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>
        {loading ? "Loading..." : `🔥 ${streak} days`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1a1a1a",
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
  },
  title: { color: "#9ca3af" },
  value: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 6,
  },
});
