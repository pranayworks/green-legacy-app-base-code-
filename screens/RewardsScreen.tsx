import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppHeader from '../components/AppHeader';
import { useDonations } from '../contexts/DonationsContext';

const RewardsScreen: React.FC = () => {
  const { stats } = useDonations();

  return (
    <View style={{ flex: 1 }}>
      <AppHeader />
      <View style={styles.container}>
        <Text style={styles.title}>Green Points</Text>
        <Text style={styles.points}>{stats.points}</Text>
        <Text style={{ marginTop: 12 }}>Tier logic: 1 tree = 10 pts; 2–3 trees = 25 pts each; 4–5 = 50 pts each</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({ container: { padding: 16 }, title: { fontSize: 18, fontWeight: '700', color: '#2E8B57' }, points: { fontSize: 34, fontWeight: '900', color: '#2E8B57', marginTop: 12 } });

export default RewardsScreen;
