import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

import { useUsernames } from "../hooks/useUsernames";
import { useGithubRepos } from "../hooks/useGithubRepos";
import RepoCard from "../components/RepoCard";

type Mode = "starred" | "popular";

export default function Repos() {
  const { github } = useUsernames();
  const { starred, popular, loading } = useGithubRepos(github);

  const [mode, setMode] = useState<Mode>("starred");

  const repos = mode === "starred" ? starred : popular;

  return (
    <LinearGradient
      colors={["#050505", "#0b1220", "#020617"]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>GitHub Repositories</Text>
        <Text style={styles.subtitle}>
          What you value & what you’ve built
        </Text>

        {/* TOGGLE */}
        <View style={styles.toggle}>
          <Pressable onPress={() => setMode("starred")}>
            <Text
              style={[
                styles.toggleText,
                mode === "starred" && styles.active,
              ]}
            >
              ⭐ Starred
            </Text>
          </Pressable>

          <Pressable onPress={() => setMode("popular")}>
            <Text
              style={[
                styles.toggleText,
                mode === "popular" && styles.active,
              ]}
            >
              🔥 Popular
            </Text>
          </Pressable>
        </View>

        {/* LIST */}
        {loading ? (
          <Text style={styles.loading}>Loading repos…</Text>
        ) : repos.length === 0 ? (
          <Text style={styles.empty}>No repositories found</Text>
        ) : (
          repos.map((r) => (
            <RepoCard key={r.id} {...r} />
          ))
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#e5e7eb",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: "#9ca3af",
    marginBottom: 24,
  },

  toggle: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 22,
  },

  toggleText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#9ca3af",
  },

  active: {
    color: "#e5e7eb",
    textDecorationLine: "underline",
  },

  loading: {
    color: "#9ca3af",
    marginTop: 40,
  },

  empty: {
    color: "#6b7280",
    marginTop: 40,
  },
});
