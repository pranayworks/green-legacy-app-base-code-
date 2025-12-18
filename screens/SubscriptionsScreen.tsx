import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";

const SubscriptionsScreen: React.FC = () => {
  return (
    <ScreenWrapper>
      <View style={styles.root}>
        <Text style={styles.title}>Subscriptions</Text>
        <Text style={styles.text}>
          Monthly, Quarterly and Annual plans (mock)
        </Text>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  root: { padding: 8 },
  title: { fontSize: 22, fontWeight: "800", color: "#1B5E20", marginBottom: 8 },
  text: { color: "#444" },
});

export default SubscriptionsScreen;
