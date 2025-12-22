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

        // Defensive check
        if (typeof res.data.streak === "number") {
          setStreak(res.data.streak);
        } else {
          setStreak(0);
        }
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
