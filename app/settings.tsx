import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useUsernames } from "../hooks/useUsernames";
import { moderateScale, verticalScale } from "../utils/responsive";

export default function Settings() {
  const { github, leetcode, setGithub, setLeetcode, save } = useUsernames();

  return (
    <LinearGradient
      colors={["#050505", "#0b1220", "#020617"]}
      style={styles.container}
    >
      {/* Header */}
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Configure your developer profiles</Text>

      {/* GitHub */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>GitHub Username</Text>
        <TextInput
          value={github}
          onChangeText={setGithub}
          placeholder="e.g. ermadhav"
          placeholderTextColor="#6b7280"
          style={styles.input}
          autoCapitalize="none"
        />
      </View>

      {/* LeetCode */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>LeetCode Username</Text>
        <TextInput
          value={leetcode}
          onChangeText={setLeetcode}
          placeholder="e.g. cosmocoders"
          placeholderTextColor="#6b7280"
          style={styles.input}
          autoCapitalize="none"
        />
      </View>

      {/* Save Button */}
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] },
        ]}
        onPress={async () => {
          await save();
          router.back();
        }}
      >
        <Text style={styles.buttonText}>Save Changes</Text>
      </Pressable>
      {/* ===== FOOTER ===== */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Made with ❤️ by Cosmo Coder</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 70,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#e5e7eb",
    marginBottom: 6,
  },

  subtitle: {
    color: "#9ca3af",
    marginBottom: 40,
  },

  inputGroup: {
    marginBottom: 26,
  },

  label: {
    color: "#9ca3af",
    fontSize: 13,
    marginBottom: 8,
  },

  input: {
    backgroundColor: "rgba(255,255,255,0.06)",
    color: "#ffffff",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  button: {
    marginTop: 20,
    backgroundColor: "#22c55e",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    shadowColor: "#22c55e",
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
  },

  buttonText: {
    color: "#052e16",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  footer: {
    marginTop: verticalScale(40),
    alignItems: "center",
  },

  footerText: {
    fontSize: 12,
    color: "#6b7280",
  },
});
