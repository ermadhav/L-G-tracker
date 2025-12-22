import { useEffect, useState } from "react";

const GITHUB_TOKEN = process.env.EXPO_PUBLIC_GITHUB_TOKEN!;

export function useGithubStreak(username: string) {
  const [streak, setStreak] = useState(0);
  const [heatmap, setHeatmap] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) {
      setLoading(false);
      return;
    }

    async function fetchStreak() {
      try {
        setLoading(true);

        const res = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GITHUB_TOKEN}`,
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

        // Build date -> count map
        const map = new Map<string, number>();
        days.forEach((d: any) => {
          map.set(d.date, d.contributionCount);
        });

        // 🔥 GitHub counts TODAY immediately
        let cursor = new Date();
        let count = 0;

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

        // Heatmap (last 90 days)
        const heat: number[] = [];
        const today = new Date();
        for (let i = 89; i >= 0; i--) {
          const d = new Date(today);
          d.setDate(today.getDate() - i);
          const key = d.toISOString().slice(0, 10);
          heat.push(map.get(key) || 0);
        }

        setHeatmap(heat);
      } catch (e) {
        console.log("GitHub streak error:", e);
        setStreak(0);
        setHeatmap([]);
      } finally {
        setLoading(false);
      }
    }

    fetchStreak();
  }, [username]);

  return { streak, heatmap, loading };
}
