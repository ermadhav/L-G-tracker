import { View, StyleSheet } from "react-native";

type HeatmapProps = {
  data: number[]; // daily data (oldest → newest)
  containerWidth: number;
};

const ROWS = 7; // days in a week
const GAP = 4;
const MIN_CELL = 12;

export function Heatmap({ data, containerWidth }: HeatmapProps) {
  if (!containerWidth) return null;

  // Calculate how many columns fit in the container
  const columns = Math.floor(
    (containerWidth + GAP) / (MIN_CELL + GAP)
  );

  const cellSize =
    (containerWidth - GAP * (columns - 1)) / columns;

  // Take only the latest data that fits
  const visibleData = data.slice(-columns * ROWS);

  // Build column-first (GitHub style)
  const grid: number[][] = [];
  for (let c = 0; c < columns; c++) {
    grid.push(
      visibleData.slice(c * ROWS, c * ROWS + ROWS)
    );
  }

  return (
    <View style={{ flexDirection: "row", gap: GAP }}>
      {grid.map((col, i) => (
        <View key={i} style={{ gap: GAP }}>
          {col.map((value, j) => (
            <View
              key={j}
              style={{
                width: cellSize,
                height: cellSize,
                borderRadius: 4,
                backgroundColor: getHeatColor(value),
              }}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

function getHeatColor(value: number) {
  if (value === 0) return "#1f2937";
  if (value < 3) return "#14532d";
  if (value < 6) return "#166534";
  if (value < 10) return "#22c55e";
  return "#4ade80";
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
