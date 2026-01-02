const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingBottom: 12, backgroundColor: '#C8E6C9' },
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#1B5E20' },
  headerSubtitle: { fontSize: 14, color: '#2E7D32', marginTop: 4 },
  profileRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 12, paddingVertical: 16 },
  statCard: { width: '30%', alignItems: 'center', paddingVertical: 16, backgroundColor: '#fff', borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#4CAF50' },
  statEmoji: { fontSize: 32 },
  statValue: { fontSize: 20, fontWeight: '800', color: '#1B5E20', marginTop: 8 },
  statLabel: { fontSize: 11, color: '#666', marginTop: 4, textAlign: 'center' },
  actionsSection: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 12, paddingBottom: 16 },
  actionButton: { alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16, backgroundColor: '#fff', borderRadius: 10 },
  actionEmoji: { fontSize: 24 },
  actionLabel: { fontSize: 12, fontWeight: '600', color: '#1B5E20', marginTop: 4 },
  listHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#C8E6C9' },
  listTitle: { fontSize: 18, fontWeight: '700', color: '#1B5E20' },
  donationCount: { fontSize: 13, color: '#2E7D32', fontWeight: '600' },
  donationItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, marginHorizontal: 12, marginVertical: 6, backgroundColor: '#fff', borderRadius: 10, borderLeftWidth: 4, borderLeftColor: '#66BB6A' },
  donationIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#F1F8E9', alignItems: 'center', justifyContent: 'center' },
  iconEmoji: { fontSize: 28 },
  donationDetails: { flex: 1, marginLeft: 12 },
  donationOccasion: { fontSize: 15, fontWeight: '700', color: '#1B5E20' },
  donationTrees: { fontSize: 13, color: '#2E7D32', marginTop: 2 },
  donationDate: { fontSize: 12, color: '#999', marginTop: 4 },
  donationBadge: { backgroundColor: '#4CAF50', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 16 },
  badgeText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  emptyMessage: { textAlign: 'center', color: '#999', fontSize: 14, marginTop: 24 },
  viewCertBtn: { backgroundColor: '#fff', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: '#C8E6C9', marginBottom: 8 },
  viewCertText: { color: '#1B5E20', fontWeight: '700', fontSize: 12 }
});

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useScrollToTop, useNavigation } from '@react-navigation/native';
import { useDonations } from '../contexts/DonationsContext';
import { useAuth } from '../contexts/AuthContext';
import AppHeader from '../components/AppHeader';

const DashboardScreen: React.FC = () => {
  const { donations, stats, refresh } = useDonations();
  const auth = useAuth();
  const fade = React.useRef(new Animated.Value(0)).current;
  const [refreshing, setRefreshing] = React.useState(false);
  const listRef = React.useRef<any>(null);
  useScrollToTop(listRef);
  const navigation = useNavigation<any>();

  React.useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 400, useNativeDriver: true }).start();
  }, [fade]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refresh();
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E8F5E9' }}>
  <AppHeader />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 12,
          paddingBottom: 80,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fade }}>
          {/* Header / Profile summary */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Your Impact Dashboard</Text>
            <Text style={styles.headerSubtitle}>Track your contribution to Earth</Text>
            <View style={styles.profileRow}>
              <View style={styles.avatar}>
                <Text style={{ fontSize: 20 }}>{(auth.user?.name || 'G').charAt(0)}</Text>
              </View>
              <View style={{ marginLeft: 12 }}>
                <Text style={{ fontSize: 16, fontWeight: '800', color: '#1B5E20' }}>WELCOME {auth.user?.name ? auth.user!.name.toUpperCase() : 'FRIEND'}</Text>
                <Text style={{ fontSize: 12, color: '#2E7D32' }}>{auth.user?.email || ''}</Text>
              </View>
            </View>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statEmoji}>🌳</Text>
              <Text style={styles.statValue}>{stats.treesPlanted}</Text>
              <Text style={styles.statLabel}>Trees Planted</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statEmoji}>💨</Text>
              <Text style={styles.statValue}>{(stats.oxygenGenerated / 1000).toFixed(1)}K</Text>
              <Text style={styles.statLabel}>Lbs Oxygen/yr</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statEmoji}>🔄</Text>
              <Text style={styles.statValue}>{(stats.co2Absorbed / 1000).toFixed(1)}K</Text>
              <Text style={styles.statLabel}>Lbs CO₂ Offset</Text>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.actionsSection}>
            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Main' as any, { screen: 'Donate' } )}>
              <Text style={styles.actionEmoji}>🎁</Text>
              <Text style={styles.actionLabel}>Donate Again</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Impact' as any)}>
              <Text style={styles.actionEmoji}>📊</Text>
              <Text style={styles.actionLabel}>View Stats</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Leaderboard' as any)}>
              <Text style={styles.actionEmoji}>🏆</Text>
              <Text style={styles.actionLabel}>Leaderboard</Text>
            </TouchableOpacity>
          </View>

          {/* Donations List */}
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Your Donations</Text>
            <Text style={styles.donationCount}>{donations.length} total</Text>
          </View>

          <FlatList
            data={donations}
            ref={listRef}
            keyExtractor={(it) => it.id}
            renderItem={({ item }) => (
              <View style={styles.donationItem}>
                <View style={styles.donationIcon}>
                  <Text style={styles.iconEmoji}>🎋</Text>
                </View>
                <View style={styles.donationDetails}>
                  <Text style={styles.donationOccasion}>{item.occasion}</Text>
                  <Text style={styles.donationTrees}>{item.trees} tree(s) planted</Text>
                  <Text style={styles.donationDate}>{item.date}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <TouchableOpacity style={styles.viewCertBtn} onPress={() => navigation.navigate('Certificate' as any, { donation: item })}>
                    <Text style={styles.viewCertText}>View Certificate</Text>
                  </TouchableOpacity>
                  <View style={styles.donationBadge}>
                    <Text style={styles.badgeText}>+{item.trees}</Text>
                  </View>
                </View>
              </View>
            )}
            ListEmptyComponent={() => (
              <Text style={styles.emptyMessage}>No donations yet. Start planting today! 🌱</Text>
            )}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#2E7D32" />}
            scrollEnabled={false}
          />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;
