import { useEffect, useState } from "react";

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
        const res = await fetch(
          `https://leetcode-stats-api.herokuapp.com/${username}`
        );
        const data = await res.json();

        if (!data.submissionCalendar) {
          setStreak(0);
          setHeatmap([]);
          return;
        }

        const calendar = data.submissionCalendar;
        const map = new Map<string, number>();

        Object.keys(calendar).forEach((ts) => {
          const day = new Date(Number(ts) * 1000)
            .toISOString()
            .slice(0, 10);
          map.set(day, calendar[ts]);
        });

        let count = 0;
        let cursor = new Date();

        while (true) {
          const key = cursor.toISOString().slice(0, 10);
          if ((map.get(key) || 0) > 0) {
            count++;
            cursor.setDate(cursor.getDate() - 1);
          } else {
            break;
          }
        }

        setStreak(count);

        const days: number[] = [];
        const today = new Date();

        for (let i = 89; i >= 0; i--) {
          const d = new Date(today);
          d.setDate(today.getDate() - i);
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
