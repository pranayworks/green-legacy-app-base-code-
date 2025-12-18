import React from "react";
import { View, Text, StyleSheet, ScrollView, Animated } from "react-native";
import AppHeader from "../components/AppHeader";
import TeamCarousel from "../components/TeamCarousel";

const AboutScreen: React.FC = () => {
  const fadeIn = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeIn]);

  return (
    <Animated.View style={[{ flex: 1, opacity: fadeIn }]}>
      <AppHeader />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroEmoji}>🌱</Text>
          <Text style={styles.heroTitle}>Green Legacy</Text>
          <Text style={styles.heroSubtitle}>
            Planting Trees for a Better Tomorrow
          </Text>
        </View>

        {/* Mission */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.sectionText}>
            Green Legacy is dedicated to combating climate change by planting
            trees globally. We believe every individual can make a difference in
            creating a sustainable future for generations to come.
          </Text>
        </View>

        {/* Impact Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>1.5M+</Text>
            <Text style={styles.statLabel}>Trees Planted</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>500K+</Text>
            <Text style={styles.statLabel}>Active Users</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>75</Text>
            <Text style={styles.statLabel}>Countries</Text>
          </View>
        </View>

        {/* Vision */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Vision</Text>
          <Text style={styles.sectionText}>
            To create a world where every person can easily contribute to
            environmental restoration and witness the impact of their actions
            through transparent tracking and meaningful rewards.
          </Text>
        </View>

        {/* Core Values */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Core Values</Text>
          <View style={styles.valueItem}>
            <Text style={styles.valueIcon}>🌍</Text>
            <View>
              <Text style={styles.valueName}>Sustainability</Text>
              <Text style={styles.valueDesc}>
                Environmental responsibility in all actions
              </Text>
            </View>
          </View>
          <View style={styles.valueItem}>
            <Text style={styles.valueIcon}>🤝</Text>
            <View>
              <Text style={styles.valueName}>Community</Text>
              <Text style={styles.valueDesc}>
                Strength through collective action
              </Text>
            </View>
          </View>
          <View style={styles.valueItem}>
            <Text style={styles.valueIcon}>📈</Text>
            <View>
              <Text style={styles.valueName}>Transparency</Text>
              <Text style={styles.valueDesc}>
                Clear tracking of every donation
              </Text>
            </View>
          </View>
        </View>

        {/* Team Carousel */}
        <TeamCarousel
          onMemberPress={(member) => {
            // Optionally handle member press
            // console.log('Selected:', member.name);
          }}
        />
        <View style={{ height: 40 }} />
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  contentContainer: { backgroundColor: "#E8F5E9", paddingBottom: 20 },
  heroSection: {
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: "#C8E6C9",
  },
  heroEmoji: { fontSize: 80 },
  heroTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1B5E20",
    marginTop: 12,
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#2E7D32",
    marginTop: 8,
    textAlign: "center",
  },
  section: { padding: 20, borderBottomWidth: 1, borderBottomColor: "#C8E6C9" },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1B5E20",
    marginBottom: 12,
  },
  sectionText: { fontSize: 14, color: "#333", lineHeight: 22 },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    backgroundColor: "#C8E6C9",
  },
  statCard: { alignItems: "center" },
  statNumber: { fontSize: 24, fontWeight: "800", color: "#1B5E20" },
  statLabel: { fontSize: 12, color: "#2E7D32", marginTop: 4 },
  valueItem: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "flex-start",
  },
  valueIcon: { fontSize: 32, marginRight: 12 },
  valueName: { fontSize: 16, fontWeight: "700", color: "#1B5E20" },
  valueDesc: { fontSize: 13, color: "#555", marginTop: 4 },
});

export default AboutScreen;
