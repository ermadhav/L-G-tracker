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
        setStreak(res.data.streak);
      } catch (err) {
        console.error("LeetCode streak error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStreak();
  }, []);

  return { streak, loading };
}
