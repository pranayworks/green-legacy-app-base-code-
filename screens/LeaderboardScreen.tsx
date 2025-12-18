import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";

const dummy = [
  { name: "Asha", trees: 42, score: 420 },
  { name: "Ravi", trees: 36, score: 360 },
  { name: "Priya", trees: 28, score: 280 },
  { name: "Kumar", trees: 20, score: 200 },
  { name: "Sneha", trees: 15, score: 150 },
];

const LeaderboardScreen: React.FC = () => {
  return (
    <ScreenWrapper>
      <Text style={styles.title}>Leaderboard</Text>
      {dummy.map((d, i) => (
        <View key={i} style={styles.row}>
          <Text style={styles.rank}>{i + 1}.</Text>
          <Text style={styles.name}>{d.name}</Text>
          <Text style={styles.trees}>{d.trees} trees</Text>
          <Text style={styles.score}>{d.score}</Text>
        </View>
      ))}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1B5E20",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E6F4EA",
  },
  rank: { width: 28, fontWeight: "700" },
  name: { flex: 1 },
  trees: { width: 110, textAlign: "right" },
  score: { width: 60, textAlign: "right" },
});

export default LeaderboardScreen;
