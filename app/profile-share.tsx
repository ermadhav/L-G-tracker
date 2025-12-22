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
        <View style={styles.header}>
          <Text style={styles.title}>Share Profile</Text>
          <Text style={styles.subtitle}>
            Scan or tap to view your coding profiles
          </Text>
        </View>

        {/* GITHUB CARD */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.platform}>GitHub</Text>
            <Text style={[styles.username, { color: "#facc15" }]}>
              @{github}
            </Text>
          </View>

          <View style={styles.qrContainer}>
            <QRCode
              value={githubUrl}
              size={150}
              backgroundColor="transparent"
              color="#facc15"
            />
          </View>

          <Pressable
            onPress={() => Linking.openURL(githubUrl)}
            style={styles.linkBtn}
          >
            <Text style={styles.linkText}>{githubUrl}</Text>
          </Pressable>
        </View>

        {/* LEETCODE CARD */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.platform}>LeetCode</Text>
            <Text style={[styles.username, { color: "#f59e0b" }]}>
              @{leetcode}
            </Text>
          </View>

          <View style={styles.qrContainer}>
            <QRCode
              value={leetcodeUrl}
              size={150}
              backgroundColor="transparent"
              color="#f59e0b"
            />
          </View>

          <Pressable
            onPress={() => Linking.openURL(leetcodeUrl)}
            style={styles.linkBtn}
          >
            <Text style={styles.linkText}>{leetcodeUrl}</Text>
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

  header: {
    marginTop: 18,
    marginBottom: 28,
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
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 22,
    padding: 20,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  cardHeader: {
    marginBottom: 16,
  },

  platform: {
    fontSize: 16,
    fontWeight: "700",
    color: "#e5e7eb",
  },

  username: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "600",
  },

  qrContainer: {
    alignSelf: "center",
    padding: 16,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.45)",
    marginBottom: 16,
  },

  linkBtn: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  linkText: {
    fontSize: 13,
    color: "#93c5fd",
    textAlign: "center",
  },
});
