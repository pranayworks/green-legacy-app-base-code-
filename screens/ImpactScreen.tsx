import React from "react";
import { View, Text, StyleSheet, ScrollView, Animated } from "react-native";
import AppHeader from "../components/AppHeader";
import { useScrollToTop } from "@react-navigation/native";

const ImpactScreen: React.FC = () => {
  const slideIn = React.useRef(new Animated.Value(-50)).current;
  const scrollRef = React.useRef<any>(null);
  useScrollToTop(scrollRef);

  React.useEffect(() => {
    Animated.timing(slideIn, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [slideIn]);

  return (
    <View style={{ flex: 1, backgroundColor: "#E8F5E9" }}>
      <AppHeader />
      <ScrollView ref={scrollRef} contentContainerStyle={styles.container}>
        {/* Header */}
        <Animated.View
          style={[
            styles.headerSection,
            { transform: [{ translateY: slideIn }] },
          ]}
        >
          <Text style={styles.headerEmoji}>🌍</Text>
          <Text style={styles.headerTitle}>Our Environmental Impact</Text>
        </Animated.View>

        {/* Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How Trees Help</Text>
          <Text style={styles.sectionText}>
            Each tree planted contributes to environmental restoration. Our
            calculations are based on peer-reviewed research on average tree
            growth and environmental benefits.
          </Text>
        </View>

        {/* Impact Metrics */}
        <View style={styles.metricsSection}>
          <View style={styles.metricCard}>
            <Text style={styles.metricEmoji}>💨</Text>
            <Text style={styles.metricTitle}>Oxygen Generated</Text>
            <Text style={styles.metricValue}>~260 lbs/year</Text>
            <Text style={styles.metricDesc}>Per mature tree</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricEmoji}>🔄</Text>
            <Text style={styles.metricTitle}>CO₂ Absorbed</Text>
            <Text style={styles.metricValue}>~48 lbs/year</Text>
            <Text style={styles.metricDesc}>Per mature tree</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricEmoji}>💧</Text>
            <Text style={styles.metricTitle}>Water Conserved</Text>
            <Text style={styles.metricValue}>~1,000 gal/year</Text>
            <Text style={styles.metricDesc}>Prevents runoff</Text>
          </View>
        </View>

        {/* Global Impact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Global Statistics</Text>
          <View style={styles.statRow}>
            <View style={styles.globalStat}>
              <Text style={styles.globalStatNumber}>1.5M</Text>
              <Text style={styles.globalStatLabel}>Trees Planted</Text>
            </View>
            <View style={styles.globalStat}>
              <Text style={styles.globalStatNumber}>720K</Text>
              <Text style={styles.globalStatLabel}>Tons CO₂ Offset</Text>
            </View>
          </View>
          <View style={styles.statRow}>
            <View style={styles.globalStat}>
              <Text style={styles.globalStatNumber}>390M</Text>
              <Text style={styles.globalStatLabel}>Lbs Oxygen/Year</Text>
            </View>
            <View style={styles.globalStat}>
              <Text style={styles.globalStatNumber}>1.5B</Text>
              <Text style={styles.globalStatLabel}>Gal Water Saved</Text>
            </View>
          </View>
        </View>

        {/* Methodology */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Methodology</Text>
          <Text style={styles.sectionText}>
            We use conservative estimates from environmental research
            organizations like the EPA and USDA Forest Service. Numbers
            represent average mature tree values in their 10th-20th years of
            growth.
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingBottom: 20 },
  headerSection: {
    backgroundColor: "#C8E6C9",
    paddingVertical: 40,
    alignItems: "center",
  },
  headerEmoji: { fontSize: 64 },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1B5E20",
    marginTop: 12,
  },
  section: { padding: 20, borderBottomWidth: 1, borderBottomColor: "#C8E6C9" },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1B5E20",
    marginBottom: 12,
  },
  sectionText: { fontSize: 14, color: "#333", lineHeight: 22 },
  metricsSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingVertical: 20,
    backgroundColor: "#F1F8F4",
  },
  metricCard: {
    width: "48%",
    alignItems: "center",
    paddingVertical: 16,
    backgroundColor: "#C8E6C9",
    borderRadius: 12,
    marginBottom: 12,
    marginHorizontal: "1%",
  },
  metricEmoji: { fontSize: 40 },
  metricTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1B5E20",
    marginTop: 8,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2E7D32",
    marginTop: 4,
  },
  metricDesc: { fontSize: 11, color: "#555", marginTop: 2 },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  globalStat: { alignItems: "center" },
  globalStatNumber: { fontSize: 22, fontWeight: "800", color: "#1B5E20" },
  globalStatLabel: { fontSize: 12, color: "#2E7D32", marginTop: 4 },
});

export default ImpactScreen;
