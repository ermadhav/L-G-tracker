import { View, StyleSheet } from "react-native";

export function Heatmap({ data }: { data?: number[] }) {
  if (!Array.isArray(data)) return null;

  return (
    <View style={styles.grid}>
      {data.map((v, i) => (
        <View
          key={i}
          style={[
            styles.cell,
            { opacity: v === 0 ? 0.15 : 0.8 },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 300,
    marginBottom: 20,
  },
  cell: {
    width: 14,
    height: 14,
    margin: 2,
    borderRadius: 3,
    backgroundColor: "#22c55e",
  },
});
