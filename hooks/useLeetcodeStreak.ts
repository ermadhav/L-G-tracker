import { useEffect, useState } from "react";

export function useLeetCodeStreak(username: string) {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    async function fetchLC() {
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

      const days = Object.keys(calendar)
        .map(Number)
        .sort((a, b) => a - b);

      // ---------- LONGEST ----------
      let longest = 0;
      let curr = 0;
      let prev = -1;

      for (const ts of days) {
        const day = Math.floor(ts / 86400);
        if (prev === -1 || day !== prev + 1) curr = 1;
        else curr++;
        longest = Math.max(longest, curr);
        prev = day;
      }

      setLongestStreak(longest);

      // ---------- CURRENT ----------
      let streak = 0;
      let today = Math.floor(Date.now() / 1000 / 86400) - 1;

      while (calendar[today * 86400]) {
        streak++;
        today--;
      }

      setCurrentStreak(streak);
      setLoading(false);
    }

    fetchLC();
  }, [username]);

  return { currentStreak, longestStreak, loading };
}
