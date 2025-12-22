import { useEffect, useState } from "react";

export function useLeetCodeStreak(username: string) {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [heatmap, setHeatmap] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    async function fetchData() {
      setLoading(true);

      const res = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            query {
              matchedUser(username: "${username}") {
                submissionCalendar
              }
            }
          `,
        }),
      });

      const json = await res.json();
      const calendar = JSON.parse(
        json.data.matchedUser.submissionCalendar
      );

      const timestamps = Object.keys(calendar)
        .map(Number)
        .sort((a, b) => a - b);

      // ---------- LONGEST ----------
      let longest = 0;
      let current = 0;
      let prevDay = -1;

      timestamps.forEach((ts) => {
        const day = Math.floor(ts / 86400);
        if (prevDay === -1 || day !== prevDay + 1) {
          current = 1;
        } else {
          current++;
        }
        longest = Math.max(longest, current);
        prevDay = day;
      });

      setLongestStreak(longest);

      // ---------- CURRENT ----------
      let streak = 0;
      let today = Math.floor(Date.now() / 1000 / 86400) - 1;

      while (calendar[today * 86400]) {
        streak++;
        today--;
      }

      setCurrentStreak(streak);

      // ---------- HEATMAP (LAST 90 DAYS) ----------
      const map = new Map<string, number>();
      Object.keys(calendar).forEach((ts) => {
        const date = new Date(Number(ts) * 1000)
          .toISOString()
          .slice(0, 10);
        map.set(date, calendar[ts]);
      });

      const heat: number[] = [];
      const todayDate = new Date();

      for (let i = 89; i >= 0; i--) {
        const d = new Date(todayDate);
        d.setUTCDate(todayDate.getUTCDate() - i);
        const key = d.toISOString().slice(0, 10);
        heat.push(map.get(key) || 0);
      }

      setHeatmap(heat);
      setLoading(false);
    }

    fetchData();
  }, [username]);

  return {
    currentStreak,
    longestStreak,
    heatmap,
    loading,
  };
}
