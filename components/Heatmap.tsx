import { View } from "react-native";

type HeatmapProps = {
  data?: number[];           // safe optional
  containerWidth?: number;   // safe optional
};

const ROWS = 7;              // days in a week
const GAP = 4;
const MIN_CELL = 12;
const FALLBACK_WIDTH = 300;  // ✅ fallback if width is missing

export function Heatmap({
  data = [],
  containerWidth = FALLBACK_WIDTH,
}: HeatmapProps) {
  // 🔒 HARD GUARDS (NO CRASH POSSIBLE)
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  // Ensure width is usable
  const width = containerWidth > 0 ? containerWidth : FALLBACK_WIDTH;

  // Calculate how many columns fit
  const columns = Math.max(
    1,
    Math.floor((width + GAP) / (MIN_CELL + GAP))
  );

  const cellSize =
    (width - GAP * (columns - 1)) / columns;

  if (!Number.isFinite(cellSize) || cellSize <= 0) {
    return null;
  }

  // Take only visible portion
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
