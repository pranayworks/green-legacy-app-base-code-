import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import AppHeader from '../components/AppHeader';
import { useDonations } from '../contexts/DonationsContext';

const RewardsScreen: React.FC = () => {
  const { stats } = useDonations();

  // Mock leaderboard data
  const leaderboard = [
    { id: '1', rank: 1, name: 'Eco Warrior', trees: 847, points: 8470 },
    { id: '2', rank: 2, name: 'Green Champion', trees: 723, points: 7230 },
    { id: '3', rank: 3, name: 'Nature Friend', trees: 612, points: 6120 },
    { id: '4', rank: 4, name: 'Climate Hero', trees: 445, points: 4450 },
    { id: '5', rank: 5, name: 'Green Guardian', trees: 389, points: 3890 }
  ];

  // Badges logic
  const getBadges = () => {
    const badges = [];
    if (stats.points >= 100) badges.push({ emoji: '🌱', name: 'Seedling', unlocked: true });
    if (stats.points >= 500) badges.push({ emoji: '🌿', name: 'Sprout', unlocked: true });
    if (stats.points >= 1000) badges.push({ emoji: '🌳', name: 'Tree', unlocked: true });
    if (stats.points >= 5000) badges.push({ emoji: '🏆', name: 'Champion', unlocked: true });
    if (stats.points >= 10000) badges.push({ emoji: '👑', name: 'Legend', unlocked: true });
    
    // Add locked badges
    if (stats.points < 100) badges.push({ emoji: '🔒', name: 'Seedling', unlocked: false });
    if (stats.points < 500) badges.push({ emoji: '🔒', name: 'Sprout', unlocked: false });
    if (stats.points < 1000) badges.push({ emoji: '🔒', name: 'Tree', unlocked: false });
    
    return badges.slice(0, 5);
  };

  const badges = getBadges();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.contentContainer}>
      <AppHeader />

      {/* Header */}
      <View style={styles.headerSection}>
        <Text style={styles.headerEmoji}>⭐</Text>
        <Text style={styles.headerTitle}>Green Points & Rewards</Text>
      </View>

      {/* Points Display */}
      <View style={styles.pointsCard}>
        <Text style={styles.pointsLabel}>Your Points</Text>
        <Text style={styles.pointsValue}>{stats.points}</Text>
        <Text style={styles.pointsInfo}>
          {stats.points < 100 ? `${100 - stats.points} points to Seedling Badge` : '🎉 You have unlocked badges!'}
        </Text>
      </View>

      {/* Tier Information */}
      <View style={styles.tierSection}>
        <Text style={styles.sectionTitle}>Tier Rewards</Text>
        <View style={styles.tierItem}>
          <Text>🌱 1 tree = 10 points</Text>
        </View>
        <View style={styles.tierItem}>
          <Text>🌿 2-3 trees = 25 points each</Text>
        </View>
        <View style={styles.tierItem}>
          <Text>🌳 4-5 trees = 50 points each</Text>
        </View>
        <View style={styles.tierItem}>
          <Text>🏆 6+ trees = 100 points each</Text>
        </View>
      </View>

      {/* Badges */}
      <View style={styles.badgesSection}>
        <Text style={styles.sectionTitle}>Achievement Badges</Text>
        <View style={styles.badgesGrid}>
          {badges.map((badge, idx) => (
            <View key={idx} style={[styles.badge, !badge.unlocked && styles.badgeLocked]}>
              <Text style={styles.badgeEmoji}>{badge.emoji}</Text>
              <Text style={styles.badgeName}>{badge.name}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Leaderboard */}
      <View style={styles.leaderboardSection}>
        <Text style={styles.sectionTitle}>🏅 Top 5 Contributors</Text>
        <FlatList
          data={leaderboard}
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.leaderboardItem}>
              <View style={styles.rankContainer}>
                <Text style={styles.rank}>{item.rank}</Text>
              </View>
              <View style={styles.leaderboardDetails}>
                <Text style={styles.leaderboardName}>{item.name}</Text>
                <Text style={styles.leaderboardTrees}>{item.trees} trees • {item.points} points</Text>
              </View>
              <View style={styles.leaderboardBadge}>
                <Text style={styles.leaderboardMedal}>{item.rank === 1 ? '🥇' : item.rank === 2 ? '🥈' : item.rank === 3 ? '🥉' : '✨'}</Text>
              </View>
            </View>
          )}
        />
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#E8F5E9' },
  contentContainer: { paddingBottom: 20 },
  headerSection: { alignItems: 'center', paddingVertical: 32, backgroundColor: '#C8E6C9' },
  headerEmoji: { fontSize: 60 },
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#1B5E20', marginTop: 12 },
  pointsCard: { marginHorizontal: 16, marginVertical: 20, paddingVertical: 24, paddingHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, alignItems: 'center', borderLeftWidth: 6, borderLeftColor: '#FFD700' },
  pointsLabel: { fontSize: 14, color: '#666' },
  pointsValue: { fontSize: 56, fontWeight: '900', color: '#FFD700', marginVertical: 8 },
  pointsInfo: { fontSize: 13, color: '#2E7D32', textAlign: 'center' },
  tierSection: { paddingHorizontal: 16, paddingVertical: 12 },
  badgesSection: { paddingHorizontal: 16, paddingVertical: 12 },
  leaderboardSection: { paddingHorizontal: 16, paddingVertical: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1B5E20', marginBottom: 12 },
  tierItem: { backgroundColor: '#F1F8E9', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8, marginBottom: 8, borderLeftWidth: 3, borderLeftColor: '#66BB6A' },
  badgesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  badge: { width: '30%', alignItems: 'center', paddingVertical: 12, backgroundColor: '#fff', borderRadius: 12, marginBottom: 12, borderWidth: 2, borderColor: '#4CAF50' },
  badgeLocked: { opacity: 0.5 },
  badgeEmoji: { fontSize: 32 },
  badgeName: { fontSize: 11, fontWeight: '600', color: '#1B5E20', marginTop: 6, textAlign: 'center' },
  leaderboardItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 12, backgroundColor: '#fff', borderRadius: 10, marginBottom: 8, borderLeftWidth: 4, borderLeftColor: '#66BB6A' },
  rankContainer: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#C8E6C9', alignItems: 'center', justifyContent: 'center' },
  rank: { fontSize: 20, fontWeight: '800', color: '#1B5E20' },
  leaderboardDetails: { flex: 1, marginLeft: 12 },
  leaderboardName: { fontSize: 15, fontWeight: '700', color: '#1B5E20' },
  leaderboardTrees: { fontSize: 12, color: '#666', marginTop: 2 },
  leaderboardBadge: { marginLeft: 12 },
  leaderboardMedal: { fontSize: 24 }
});

export default RewardsScreen;
