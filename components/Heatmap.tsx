import { View } from "react-native";

type HeatmapProps = {
  data?: number[];           // 👈 OPTIONAL
  containerWidth: number;
};

const ROWS = 7;
const GAP = 4;
const MIN_CELL = 12;

export function Heatmap({
  data = [],                 // 👈 SAFE DEFAULT
  containerWidth,
}: HeatmapProps) {
  // 🔒 HARD GUARDS
  if (
    !containerWidth ||
    !Array.isArray(data) ||
    data.length === 0
  ) {
    return null;
  }

  // Calculate how many columns fit
  const columns = Math.floor(
    (containerWidth + GAP) / (MIN_CELL + GAP)
  );

  if (columns <= 0) return null;

  const cellSize =
    (containerWidth - GAP * (columns - 1)) / columns;

  // Prevent NaN / negative sizes
  if (cellSize <= 0) return null;

  // Only show what fits
  const visibleData = data.slice(-columns * ROWS);

  // Build column-first grid (GitHub style)
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
