import { View, Text, Button } from "react-native";
import { useState } from "react";

export default function TestLeetcode() {
  const [result, setResult] = useState("No result");

  async function test() {
    try {
      const res = await fetch(
        "https://leetcode-stats-api.herokuapp.com/cosmocoders"
      );
      const json = await res.json();
      console.log("LC RAW:", json);
      setResult(JSON.stringify(json).slice(0, 200));
    } catch (e) {
      console.log("LC ERROR:", e);
      setResult("ERROR");
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <Button title="TEST LEETCODE API" onPress={test} />
      <Text style={{ marginTop: 20 }}>{result}</Text>
    </View>
  );
}
