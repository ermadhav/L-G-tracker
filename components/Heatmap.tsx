import { View } from "react-native";

type HeatmapProps = {
  data?: number[];          // 👈 optional & safe
  containerWidth: number;
};

const ROWS = 7;             // days in a week
const GAP = 4;
const MIN_CELL = 12;

export function Heatmap({
  data = [],                // 👈 default fallback
  containerWidth,
}: HeatmapProps) {
  /* ---------- HARD GUARDS ---------- */
  if (
    !containerWidth ||
    !Array.isArray(data) ||
    data.length === 0
  ) {
    return null;
  }

  /* ---------- CALCULATE COLUMNS ---------- */
  const columns = Math.floor(
    (containerWidth + GAP) / (MIN_CELL + GAP)
  );

  if (columns <= 0) return null;

  const cellSize =
    (containerWidth - GAP * (columns - 1)) / columns;

  if (cellSize <= 0 || !Number.isFinite(cellSize)) {
    return null;
  }

  /* ---------- SLICE DATA SAFELY ---------- */
  const visibleData = data.slice(-columns * ROWS);

  /* ---------- BUILD GRID (COLUMN-FIRST) ---------- */
  const grid: number[][] = [];

  for (let c = 0; c < columns; c++) {
    grid.push(
      visibleData.slice(c * ROWS, c * ROWS + ROWS)
    );
  }

  /* ---------- RENDER ---------- */
  return (
    <View style={{ flexDirection: "row", gap: GAP }}>
      {grid.map((col, colIndex) => (
        <View key={colIndex} style={{ gap: GAP }}>
          {col.map((value, rowIndex) => (
            <View
              key={rowIndex}
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

/* ---------- COLOR SCALE ---------- */
function getHeatColor(value: number) {
  if (value <= 0) return "#1f2937";
  if (value < 3) return "#14532d";
  if (value < 6) return "#166534";
  if (value < 10) return "#22c55e";
  return "#4ade80";
}
