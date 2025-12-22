import { useEffect, useState } from "react";

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
        const res = await fetch(
          `https://api.github.com/users/${username}/events/public`
        );
        const events = await res.json();

        const commitDays = new Set<string>();

        for (const e of events) {
          if (e.type === "PushEvent") {
            commitDays.add(e.created_at.slice(0, 10));
          }
        }

        // streak (calendar-day based)
        let count = 0;
        let cursor = new Date();

        while (true) {
          const key = cursor.toISOString().slice(0, 10);
          if (commitDays.has(key)) {
            count++;
            cursor.setDate(cursor.getDate() - 1);
          } else {
            break;
          }
        }

        setStreak(count);

        // heatmap (last 90 days)
        const days: number[] = [];
        const today = new Date();

        for (let i = 89; i >= 0; i--) {
          const d = new Date(today);
          d.setDate(today.getDate() - i);
          const key = d.toISOString().slice(0, 10);
          days.push(commitDays.has(key) ? 1 : 0);
        }

        setHeatmap(days);
      } catch (e) {
        console.log("GitHub error:", e);
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
