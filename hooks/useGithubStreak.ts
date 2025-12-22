import { useEffect, useState } from "react";

const GITHUB_TOKEN = process.env.EXPO_PUBLIC_GITHUB_TOKEN!;

export function useGithubStreak(username: string) {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [heatmap, setHeatmap] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    async function fetchData() {
      setLoading(true);

      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            query ($username: String!) {
              user(login: $username) {
                contributionsCollection {
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
          variables: { username },
        }),
      });

      const json = await res.json();
      const days =
        json.data.user.contributionsCollection.contributionCalendar.weeks
          .flatMap((w: any) => w.contributionDays);

      // ---------- MAP ----------
      const map = new Map<string, number>();
      days.forEach((d: any) =>
        map.set(d.date, d.contributionCount)
      );

      // ---------- CURRENT ----------
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

      // ---------- LONGEST ----------
      let longest = 0;
      let current = 0;

      days.forEach((d: any) => {
        if (d.contributionCount > 0) {
          current++;
          longest = Math.max(longest, current);
        } else {
          current = 0;
        }
      });

      setLongestStreak(longest);

      // ---------- HEATMAP (LAST 90 DAYS) ----------
      const heat: number[] = [];
      const today = new Date();

      for (let i = 89; i >= 0; i--) {
        const d = new Date(today);
        d.setUTCDate(today.getUTCDate() - i);
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
