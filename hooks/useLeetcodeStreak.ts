import { useEffect, useState } from "react";

export function useLeetCodeStreak(username: string) {
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
        setLoading(true);

        const res = await fetch(
          `https://leetcode-stats-api.herokuapp.com/${username}`
        );
        const data = await res.json();

        const calendar = data.submissionCalendar;
        if (!calendar) {
          setStreak(0);
          setHeatmap([]);
          return;
        }

        // Map UTC date -> submissions
        const map = new Map<string, number>();
        Object.keys(calendar).forEach((ts) => {
          const date = new Date(Number(ts) * 1000)
            .toISOString()
            .slice(0, 10);
          map.set(date, calendar[ts]);
        });

        // 🔥 START FROM YESTERDAY (UTC)
        let cursor = new Date();
        cursor.setUTCDate(cursor.getUTCDate() - 1);

        let count = 0;
        while (true) {
          const key = cursor.toISOString().slice(0, 10);
          if ((map.get(key) || 0) > 0) {
            count++;
            cursor.setUTCDate(cursor.getUTCDate() - 1);
          } else {
            break;
          }
        }

        setStreak(count);

        // Heatmap (last 90 completed UTC days)
        const days: number[] = [];
        const today = new Date();

        for (let i = 89; i >= 0; i--) {
          const d = new Date(today);
          d.setUTCDate(today.getUTCDate() - i);
          const key = d.toISOString().slice(0, 10);
          days.push(map.get(key) || 0);
        }

        setHeatmap(days);
      } catch (e) {
        console.log("LeetCode error:", e);
        setStreak(0);
        setHeatmap([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [username]);

  return { streak, heatmap, loading };
}
