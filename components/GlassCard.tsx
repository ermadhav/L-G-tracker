import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <LinearGradient
      colors={["rgba(255,255,255,0.15)", "rgba(255,255,255,0.05)"]}
      style={styles.card}
    >
      <View>{children}</View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    shadowColor: "#00ffcc",
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
});
