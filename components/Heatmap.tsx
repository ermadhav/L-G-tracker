import { View, StyleSheet } from "react-native";

export function Heatmap({ data }: { data: number[] }) {
  return (
    <View style={styles.grid}>
      {data.map((count, i) => (
        <View
          key={i}
          style={[
            styles.cell,
            { opacity: count === 0 ? 0.15 : Math.min(0.25 + count * 0.15, 1) },
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
