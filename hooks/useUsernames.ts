import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const KEY = "STREAK_USERNAMES";

export function useUsernames(username: unknown) {
  const [github, setGithub] = useState("");
  const [leetcode, setLeetcode] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setGithub(parsed.github || "");
        setLeetcode(parsed.leetcode || "");
      }
      setLoaded(true);
    })();
  }, []);

  const save = async () => {
    await AsyncStorage.setItem(
      KEY,
      JSON.stringify({ github, leetcode })
    );
  };

  return {
    github,
    leetcode,
    setGithub,
    setLeetcode,
    save,
    loaded,
  };
}
