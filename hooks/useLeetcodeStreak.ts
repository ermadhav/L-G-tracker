import { useEffect, useState } from "react";
import axios from "axios";

export function useLeetcodeStreak(username: string) {
  const [streak, setStreak] = useState(0);
  const [heatmap, setHeatmap] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) {
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        const res = await axios.get(
          `https://leetcode-stats-api.herokuapp.com/${username}`
        );

        const calendar = res.data.submissionCalendar || {};
        const map = new Map<string, number>();

        Object.keys(calendar).forEach((ts) => {
          const day = new Date(Number(ts) * 1000)
            .toISOString()
            .split("T")[0];
          map.set(day, calendar[ts]);
        });

        const today = new Date();
        const days: number[] = [];

        for (let i = 89; i >= 0; i--) {
          const d = new Date(today);
          d.setDate(today.getDate() - i);
          const key = d.toISOString().split("T")[0];
          days.push(map.get(key) || 0);
        }

        setHeatmap(days);

        let count = 0;
        for (let i = days.length - 1; i >= 0; i--) {
          if (days[i] > 0) count++;
          else break;
        }

        setStreak(count);
      } catch (e) {
        console.error("LeetCode error:", e);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [username]);

  return { streak, heatmap, loading };
}
