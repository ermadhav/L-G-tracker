import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const KEY = "STREAK_USERNAMES";

export function useUsernames() {
  const [github, setGithub] = useState("");
  const [leetcode, setLeetcode] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem(KEY);
      if (data) {
        const parsed = JSON.parse(data);
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
