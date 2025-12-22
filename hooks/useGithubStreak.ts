import { useEffect, useState } from "react";
import axios from "axios";

export function useGithubStreak(username: string) {
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
          `https://api.github.com/users/${username}/events/public`
        );

        const events = res.data;
        const map = new Map<string, number>();

        events.forEach((e: any) => {
          if (e.type === "PushEvent") {
            const day = e.created_at.split("T")[0];
            map.set(day, (map.get(day) || 0) + 1);
          }
        });

        // Build last 90 days heatmap
        const today = new Date();
        const days: number[] = [];

        for (let i = 89; i >= 0; i--) {
          const d = new Date(today);
          d.setDate(today.getDate() - i);
          const key = d.toISOString().split("T")[0];
          days.push(map.get(key) || 0);
        }

        setHeatmap(days);

        // Calculate streak
        let count = 0;
        for (let i = days.length - 1; i >= 0; i--) {
          if (days[i] > 0) count++;
          else break;
        }

        setStreak(count);
      } catch (e) {
        console.error("GitHub error:", e);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [username]);

  return { streak, heatmap, loading };
}
