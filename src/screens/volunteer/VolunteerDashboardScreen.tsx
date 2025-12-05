import React from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { Card } from '../../components/Card';
import { PrimaryButton } from '../../components/PrimaryButton';

const EVENTS = [
  { id: '1', title: 'City Park Planting', date: 'Nov 12, 2023', location: 'Central Park', status: 'Open' },
  { id: '2', title: 'River Cleanup', date: 'Nov 20, 2023', location: 'Riverside Walk', status: 'Full' },
  { id: '3', title: 'Tree Care Workshop', date: 'Dec 05, 2023', location: 'Community Center', status: 'Open' },
];

export const VolunteerDashboardScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Thank you for being a volunteer!</Text>
        <Text style={styles.bannerSubtext}>Your time makes a huge difference.</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>

        <FlatList
          data={EVENTS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={styles.eventCard}>
              <View>
                <Text style={styles.eventTitle}>{item.title}</Text>
                <Text style={styles.eventDetail}>{item.date} • {item.location}</Text>
              </View>
              <View style={styles.statusContainer}>
                <Text style={[styles.status, { color: item.status === 'Open' ? colors.success : colors.error }]}>
                  {item.status}
                </Text>
              </View>
            </Card>
          )}
          style={styles.list}
        />

        <PrimaryButton
          title="View All Events"
          onPress={() => Alert.alert('Events', 'Show all events flow')}
          style={styles.viewAllButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  banner: {
    backgroundColor: colors.primary,
    padding: spacing.l,
    alignItems: 'center',
  },
  bannerText: {
    ...typography.header,
    color: colors.surface,
    textAlign: 'center',
  },
  bannerSubtext: {
    ...typography.body,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: spacing.s,
  },
  content: {
    flex: 1,
    padding: spacing.m,
  },
  sectionTitle: {
    ...typography.subheader,
    color: colors.text,
    marginBottom: spacing.m,
    marginTop: spacing.s,
  },
  list: {
    flex: 1,
  },
  eventCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  eventTitle: {
    ...typography.body,
    fontWeight: 'bold',
    color: colors.text,
  },
  eventDetail: {
    ...typography.caption,
    marginTop: 4,
  },
  statusContainer: {
    justifyContent: 'center',
  },
  status: {
    ...typography.caption,
    fontWeight: 'bold',
  },
  viewAllButton: {
    marginTop: spacing.m,
    marginBottom: spacing.l,
  },
});
