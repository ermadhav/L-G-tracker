import { View, Text, StyleSheet } from "react-native";

type Props = {
  title: string;
  streak: number;
  loading?: boolean;
};

export default function StreakCard({ title, streak, loading }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.streak}>
        {loading ? "Loading..." : `🔥 ${streak} days`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1e1e1e",
    padding: 20,
    borderRadius: 14,
    marginBottom: 16,
  },
  title: {
    color: "#aaa",
    fontSize: 16,
  },
  streak: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 6,
  },
});
