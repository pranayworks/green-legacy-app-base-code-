import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { Card } from '../../components/Card';
import { PrimaryButton } from '../../components/PrimaryButton';

// Mock Data
const DONATIONS = [
  { id: '1', date: '2023-10-15', plan: 'One-time', amount: '$20', occasion: 'Birthday', status: 'Planted' },
  { id: '2', date: '2023-08-22', plan: 'Monthly', amount: '$10', occasion: 'Support', status: 'Growing' },
  { id: '3', date: '2023-05-10', plan: 'One-time', amount: '$50', occasion: 'Anniversary', status: 'Planted' },
];

export const DonationHistoryScreen = () => {
  const renderItem = ({ item }: { item: typeof DONATIONS[0] }) => (
    <Card style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={[styles.status, { color: item.status === 'Planted' ? colors.success : colors.secondary }]}>
          {item.status}
        </Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.occasion}>{item.occasion}</Text>
        <Text style={styles.plan}>{item.plan} • {item.amount}</Text>
      </View>
      <PrimaryButton
        title="View Details"
        onPress={() => {}}
        variant="outline"
        style={styles.detailsButton}
      />
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DONATIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<Text style={styles.header}>Your Contributions</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: spacing.m,
  },
  header: {
    ...typography.header,
    color: colors.primary,
    marginBottom: spacing.m,
  },
  card: {
    marginBottom: spacing.m,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.s,
  },
  date: {
    ...typography.caption,
  },
  status: {
    ...typography.caption,
    fontWeight: 'bold',
  },
  cardBody: {
    marginBottom: spacing.m,
  },
  occasion: {
    ...typography.subheader,
    fontSize: 18,
    color: colors.text,
  },
  plan: {
    ...typography.body,
    color: colors.textSecondary,
  },
  detailsButton: {
    height: 40,
  },
});
