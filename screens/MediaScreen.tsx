import React from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import AppHeader from "../components/AppHeader";
import { useScrollToTop } from "@react-navigation/native";

const MediaScreen: React.FC = () => {
  const galleryItems = [
    {
      id: "1",
      emoji: "🌳",
      title: "Forest Restoration",
      location: "Amazon, Brazil",
    },
    { id: "2", emoji: "🌱", title: "Seedling Nursery", location: "Kenya" },
    { id: "3", emoji: "👥", title: "Community Planting", location: "India" },
    {
      id: "4",
      emoji: "🏔️",
      title: "Mountain Reforestation",
      location: "Nepal",
    },
    { id: "5", emoji: "🌊", title: "Coastal Trees", location: "Philippines" },
    {
      id: "6",
      emoji: "🏜️",
      title: "Desert Greening",
      location: "Sahel Region",
    },
  ];

  const scrollRef = React.useRef<any>(null);
  useScrollToTop(scrollRef);

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.screen}
      contentContainerStyle={styles.contentContainer}
    >
      <AppHeader />

      {/* Header */}
      <View style={styles.headerSection}>
        <Text style={styles.headerEmoji}>📸</Text>
        <Text style={styles.headerTitle}>Our Gallery</Text>
        <Text style={styles.headerSubtitle}>
          See the impact of our projects
        </Text>
      </View>

      {/* Gallery Grid */}
      <View style={styles.gallerySection}>
        <FlatList
          data={galleryItems}
          scrollEnabled={false}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 12,
          }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.galleryCard}>
              <View style={styles.galleryImage}>
                <Text style={styles.galleryEmoji}>{item.emoji}</Text>
              </View>
              <Text style={styles.galleryTitle}>{item.title}</Text>
              <Text style={styles.galleryLocation}>{item.location}</Text>
            </View>
          )}
        />
      </View>

      {/* Video Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Videos</Text>
        <View style={styles.videoCard}>
          <Text style={styles.videoEmoji}>🎬</Text>
          <View style={styles.videoInfo}>
            <Text style={styles.videoTitle}>Our Impact Documentary</Text>
            <Text style={styles.videoDesc}>
              Watch how we've changed millions of lives
            </Text>
          </View>
        </View>
        <View style={styles.videoCard}>
          <Text style={styles.videoEmoji}>🎥</Text>
          <View style={styles.videoInfo}>
            <Text style={styles.videoTitle}>How to Plant a Tree</Text>
            <Text style={styles.videoDesc}>
              Learn proper tree planting techniques
            </Text>
          </View>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Media Stats</Text>
        <View style={styles.statRow}>
          <View style={styles.statItem}>
            <Text style={styles.statEmoji}>📸</Text>
            <Text style={styles.statNumber}>500+</Text>
            <Text style={styles.statLabel}>Photos</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statEmoji}>🎬</Text>
            <Text style={styles.statNumber}>50+</Text>
            <Text style={styles.statLabel}>Videos</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statEmoji}>📱</Text>
            <Text style={styles.statNumber}>10M+</Text>
            <Text style={styles.statLabel}>Views</Text>
          </View>
        </View>
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#E8F5E9" },
  contentContainer: { paddingBottom: 20 },
  headerSection: {
    alignItems: "center",
    paddingVertical: 32,
    backgroundColor: "#C8E6C9",
  },
  headerEmoji: { fontSize: 60 },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1B5E20",
    marginTop: 12,
  },
  headerSubtitle: { fontSize: 14, color: "#2E7D32", marginTop: 4 },
  gallerySection: { paddingHorizontal: 16, paddingVertical: 16 },
  galleryCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C8E6C9",
  },
  galleryImage: {
    width: "100%",
    height: 100,
    backgroundColor: "#F1F8E9",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  galleryEmoji: { fontSize: 48 },
  galleryTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1B5E20",
    textAlign: "center",
  },
  galleryLocation: {
    fontSize: 11,
    color: "#666",
    marginTop: 4,
    textAlign: "center",
  },
  section: { paddingHorizontal: 16, paddingVertical: 12 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1B5E20",
    marginBottom: 12,
  },
  videoCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  videoEmoji: { fontSize: 36, marginRight: 12 },
  videoInfo: { flex: 1 },
  videoTitle: { fontSize: 14, fontWeight: "700", color: "#1B5E20" },
  videoDesc: { fontSize: 12, color: "#666", marginTop: 2 },
  statsSection: { paddingHorizontal: 16, paddingVertical: 12 },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "#C8E6C9",
    borderRadius: 10,
  },
  statItem: { alignItems: "center" },
  statEmoji: { fontSize: 32 },
  statNumber: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1B5E20",
    marginTop: 6,
  },
  statLabel: { fontSize: 11, color: "#2E7D32", marginTop: 2 },
});

export default MediaScreen;
