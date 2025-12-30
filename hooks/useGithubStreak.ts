import { useEffect, useState } from "react";

/**
 * IMPORTANT:
 * Make sure this env variable exists and is correct
 * EXPO_PUBLIC_GITHUB_TOKEN=ghp_xxxxxxxxxxxxxx
 */
const GITHUB_TOKEN = process.env.EXPO_PUBLIC_GITHUB_TOKEN ?? "";

export function useGithubStreak(username: string) {
  const cleanUsername = username?.trim(); // 🔥 FIX: remove spaces

  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [totalCommits, setTotalCommits] = useState(0);
  const [heatmap, setHeatmap] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!cleanUsername) {
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // 🧪 Debug (remove later)
        // console.log("Fetching GitHub data for:", cleanUsername);

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
            variables: { username: cleanUsername },
          }),
        });

        const json = await res.json();

        /* ---------- SAFETY CHECK ---------- */
        if (!json?.data?.user) {
          throw new Error(
            json?.errors?.[0]?.message ??
              "GitHub user not found or token invalid"
          );
        }

        const weeks =
          json.data.user.contributionsCollection?.contributionCalendar?.weeks;

        if (!weeks || weeks.length === 0) {
          throw new Error("No contribution data found");
        }

        const days = weeks.flatMap((w: any) => w.contributionDays);

        /* ---------- MAP DATE → COUNT ---------- */
        const map = new Map<string, number>();
        days.forEach((d: any) => {
          map.set(d.date, d.contributionCount);
        });

        /* ---------- TOTAL COMMITS ---------- */
        const total = days.reduce(
          (sum: number, d: any) => sum + d.contributionCount,
          0
        );
        setTotalCommits(total);

        /* ---------- CURRENT STREAK ---------- */
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

        /* ---------- LONGEST STREAK ---------- */
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

        /* ---------- HEATMAP (LAST 90 DAYS) ---------- */
        const heat: number[] = [];
        const today = new Date();

        for (let i = 89; i >= 0; i--) {
          const d = new Date(today);
          d.setUTCDate(today.getUTCDate() - i);
          const key = d.toISOString().slice(0, 10);
          heat.push(map.get(key) || 0);
        }

        setHeatmap(heat);
      } catch (err: any) {
        console.error("GitHub streak error:", err.message);

        setCurrentStreak(0);
        setLongestStreak(0);
        setTotalCommits(0);
        setHeatmap([]);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [cleanUsername]);

  return {
    currentStreak,
    longestStreak,
    totalCommits,
    heatmap,
    loading,
    error,
  };
}
