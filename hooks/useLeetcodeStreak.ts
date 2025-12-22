import { useEffect, useState } from "react";
import axios from "axios";

export function useLeetcodeStreak(username: string) {
  const [streak, setStreak] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStreak() {
      try {
        const res = await axios.get(
          `https://leetcode-stats-api.herokuapp.com/${username}`
        );

        const calendar = res.data.submissionCalendar;

        if (!calendar) {
          setStreak(0);
          return;
        }

        // Convert timestamps to sorted array of days
        const days = Object.keys(calendar)
          .map((ts) => ({
            date: new Date(Number(ts) * 1000),
            count: calendar[ts],
          }))
          .sort((a, b) => a.date.getTime() - b.date.getTime());

        let count = 0;
        let prevDate: Date | null = null;

        // Traverse from latest to oldest
        for (let i = days.length - 1; i >= 0; i--) {
          const { date, count: solved } = days[i];

          if (solved <= 0) break;

          if (!prevDate) {
            count++;
            prevDate = date;
            continue;
          }

          const diff =
            (prevDate.getTime() - date.getTime()) /
            (1000 * 60 * 60 * 24);

          if (diff === 1) {
            count++;
            prevDate = date;
          } else {
            break;
          }
        }

        setStreak(count);
      } catch (err) {
        console.error("LeetCode streak error:", err);
        setStreak(0);
      } finally {
        setLoading(false);
      }
    }

    fetchStreak();
  }, []);

  return { streak, loading };
}
