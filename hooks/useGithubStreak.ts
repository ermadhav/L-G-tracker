import { useEffect, useState } from "react";

const TOKEN = process.env.EXPO_PUBLIC_GITHUB_TOKEN!;

type Day = { date: string; contributionCount: number };

export function useGithubStreak(username: string) {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    async function fetchAllYears() {
      setLoading(true);

      const allDays: Day[] = [];
      const currentYear = new Date().getUTCFullYear();

      for (let year = 2015; year <= currentYear; year++) {
        const from = `${year}-01-01T00:00:00Z`;
        const to = `${year}-12-31T23:59:59Z`;

        const res = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query ($user: String!, $from: DateTime!, $to: DateTime!) {
                user(login: $user) {
                  contributionsCollection(from: $from, to: $to) {
                    contributionCalendar {
                      weeks {
                        contributionDays {
                          date
                          contributionCount
                        }
                      }
                    }
                  }
                }
              }
            `,
            variables: { user: username, from, to },
          }),
        });

        const json = await res.json();
        const weeks =
          json.data.user.contributionsCollection.contributionCalendar.weeks;

        weeks.forEach((w: any) =>
          w.contributionDays.forEach((d: Day) => allDays.push(d))
        );
      }

      // ---------- LONGEST STREAK ----------
      let longest = 0;
      let curr = 0;

      for (const d of allDays) {
        if (d.contributionCount > 0) {
          curr++;
          longest = Math.max(longest, curr);
        } else {
          curr = 0;
        }
      }

      setLongestStreak(longest);

      // ---------- CURRENT STREAK ----------
      let now = new Date().toISOString().slice(0, 10);
      const map = new Map(allDays.map((d) => [d.date, d.contributionCount]));

      let streak = 0;
      let cursor = new Date();

      while (true) {
        const key = cursor.toISOString().slice(0, 10);
        if ((map.get(key) || 0) > 0) {
          streak++;
          cursor.setUTCDate(cursor.getUTCDate() - 1);
        } else break;
      }

      setCurrentStreak(streak);
      setLoading(false);
    }

    fetchAllYears();
  }, [username]);

  return { currentStreak, longestStreak, loading };
}
