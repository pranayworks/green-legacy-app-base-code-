import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { Card } from '../../components/Card';
import { PrimaryButton } from '../../components/PrimaryButton';

export const HomeScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome back, User!</Text>
        <Text style={styles.tagline}>Turn every celebration into a living tree.</Text>
      </View>

      <View style={styles.actionsContainer}>
        <Card style={styles.actionCard}>
          <Text style={styles.cardTitle}>Gift a Tree</Text>
          <Text style={styles.cardDescription}>
            Plant a tree in honor of someone special or for a special occasion.
          </Text>
          <PrimaryButton
            title="Gift Now"
            onPress={() => navigation.navigate('GiftTree')}
            style={styles.cardButton}
          />
        </Card>

        <Card style={styles.actionCard}>
          <Text style={styles.cardTitle}>See My Trees</Text>
          <Text style={styles.cardDescription}>
            Track the growth and location of your planted trees.
          </Text>
          <PrimaryButton
            title="View History"
            onPress={() => navigation.navigate('History')}
            variant="secondary"
            style={styles.cardButton}
          />
        </Card>

        <Card style={styles.actionCard}>
          <Text style={styles.cardTitle}>Volunteer Dashboard</Text>
          <Text style={styles.cardDescription}>
            Join our events and help us make the world greener.
          </Text>
          <PrimaryButton
            title="Go to Dashboard"
            onPress={() => navigation.navigate('Volunteer')}
            variant="outline"
            style={styles.cardButton}
          />
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: spacing.m,
    paddingBottom: spacing.xxl,
  },
  header: {
    marginVertical: spacing.l,
    paddingHorizontal: spacing.s,
  },
  welcomeText: {
    ...typography.header,
    color: colors.primaryDark,
  },
  tagline: {
    ...typography.subheader,
    color: colors.textSecondary,
    marginTop: spacing.s,
    fontSize: 18,
  },
  actionsContainer: {
    marginTop: spacing.m,
  },
  actionCard: {
    marginBottom: spacing.m,
  },
  cardTitle: {
    ...typography.subheader,
    color: colors.text,
    marginBottom: spacing.s,
  },
  cardDescription: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.m,
  },
  cardButton: {
    marginTop: spacing.s,
  },
});
