import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AppHeader from '../components/AppHeader';
import MetricCard from '../components/MetricCard';
import DonationCard from '../components/DonationCard';
import { useDonations } from '../contexts/DonationsContext';

const DashboardScreen: React.FC = () => {
  const { donations, stats } = useDonations();

  return (
    <View style={{ flex: 1 }}>
      <AppHeader />
      <View style={{ padding: 16 }}>
        <Text style={styles.heading}>Your Impact</Text>
        <View style={{ flexDirection: 'row', marginTop: 12 }}>
          <MetricCard title="Trees" value={`${stats.treesPlanted}`} />
          <MetricCard title="Oxygen (kg/yr)" value={`${stats.oxygenGenerated}`} />
          <MetricCard title="CO₂ (kg/yr)" value={`${stats.co2Absorbed}`} />
        </View>

        <Text style={[styles.heading, { marginTop: 18 }]}>Donations</Text>
        <FlatList data={donations} keyExtractor={(i) => i.id} renderItem={({ item }) => <DonationCard item={item} />} style={{ marginTop: 12 }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: { fontWeight: '700', fontSize: 18, color: '#2E8B57' }
});

export default DashboardScreen;
