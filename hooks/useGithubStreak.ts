import { useEffect, useState } from "react";
import axios from "axios";

type ContributionDay = {
  date: string;
  contributionCount: number;
};

export function useGithubStreak(token: string) {
  const [streak, setStreak] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStreak() {
      try {
        const query = `
          query {
            viewer {
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
        `;

        const res = await axios.post(
          "https://api.github.com/graphql",
          { query },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const weeks =
          res.data.data.viewer.contributionsCollection
            .contributionCalendar.weeks;

        const days: ContributionDay[] = weeks.flatMap(
          (week: any) => week.contributionDays
        );

        let count = 0;
        for (let i = days.length - 1; i >= 0; i--) {
          if (days[i].contributionCount > 0) count++;
          else break;
        }

        setStreak(count);
      } catch (err) {
        console.error("GitHub streak error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStreak();
  }, []);

  return { streak, loading };
}
