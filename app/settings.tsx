import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useUsernames } from "../hooks/useUsernames";

export default function Settings() {
  const { github, leetcode, setGithub, setLeetcode, save } =
    useUsernames();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <Text style={styles.label}>GitHub Username</Text>
      <TextInput
        value={github}
        onChangeText={setGithub}
        style={styles.input}
      />

      <Text style={styles.label}>LeetCode Username</Text>
      <TextInput
        value={leetcode}
        onChangeText={setLeetcode}
        style={styles.input}
      />

      <Pressable
        style={styles.button}
        onPress={async () => {
          await save();
          router.back();
        }}
      >
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0f0f", padding: 20 },
  title: { color: "#fff", fontSize: 28, marginBottom: 30 },
  label: { color: "#9ca3af", marginBottom: 6 },
  input: {
    backgroundColor: "#1a1a1a",
    color: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#22c55e",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: { color: "#000", fontWeight: "bold" },
});
