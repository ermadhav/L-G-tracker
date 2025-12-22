import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import QRCode from "react-native-qrcode-svg";

import { useUsernames } from "../hooks/useUsernames";

export default function ProfileShare() {
  const { github, leetcode } = useUsernames();

  const githubUrl = `https://github.com/${github}`;
  const leetcodeUrl = `https://leetcode.com/${leetcode}`;

  return (
    <LinearGradient
      colors={["#050505", "#0b1220", "#020617"]}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <Text style={styles.title}>Share Your Profile</Text>
        <Text style={styles.subtitle}>
          Scan or share your coding journey
        </Text>

        {/* GITHUB */}
        <View style={styles.card}>
          <Text style={styles.platformTitle}>GitHub</Text>

          <View style={styles.qrWrapper}>
            <QRCode
              value={githubUrl}
              size={160}
              backgroundColor="transparent"
              color="#facc15"
            />
          </View>

          <Pressable onPress={() => Linking.openURL(githubUrl)}>
            <Text style={styles.link}>{githubUrl}</Text>
          </Pressable>
        </View>

        {/* LEETCODE */}
        <View style={styles.card}>
          <Text style={styles.platformTitle}>LeetCode</Text>

          <View style={styles.qrWrapper}>
            <QRCode
              value={leetcodeUrl}
              size={160}
              backgroundColor="transparent"
              color="#f59e0b"
            />
          </View>

          <Pressable onPress={() => Linking.openURL(leetcodeUrl)}>
            <Text style={styles.link}>{leetcodeUrl}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#e5e7eb",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: "#9ca3af",
    marginBottom: 28,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
  },

  platformTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#e5e7eb",
    marginBottom: 16,
  },

  qrWrapper: {
    padding: 14,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.4)",
    marginBottom: 14,
  },

  link: {
    fontSize: 13,
    color: "#93c5fd",
    textAlign: "center",
  },
});
