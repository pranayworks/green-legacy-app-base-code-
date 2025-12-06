import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Card } from '../../components/Card';

export const ProfileScreen = () => {
  const navigation = useNavigation<any>();

  const handleLogout = () => {
    // Reset navigation to Auth stack
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>JD</Text>
        </View>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
      </View>

      <Card style={styles.statsCard}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Trees Gifted</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>5</Text>
          <Text style={styles.statLabel}>Events</Text>
        </View>
      </Card>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <PrimaryButton
          title="Edit Profile"
          onPress={() => {}}
          variant="outline"
          style={styles.menuButton}
        />
        <PrimaryButton
          title="Notifications"
          onPress={() => {}}
          variant="outline"
          style={styles.menuButton}
        />
        <PrimaryButton
          title="Privacy & Security"
          onPress={() => {}}
          variant="outline"
          style={styles.menuButton}
        />
      </View>

      <PrimaryButton
        title="Log Out"
        onPress={handleLogout}
        variant="secondary"
        style={styles.logoutButton}
      />
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
  },
  header: {
    alignItems: 'center',
    marginVertical: spacing.l,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  avatarText: {
    ...typography.header,
    color: colors.surface,
    fontSize: 32,
  },
  name: {
    ...typography.header,
    color: colors.text,
  },
  email: {
    ...typography.body,
    color: colors.textSecondary,
  },
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.l,
    marginBottom: spacing.l,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...typography.header,
    color: colors.primaryDark,
  },
  statLabel: {
    ...typography.caption,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.border,
  },
  section: {
    marginBottom: spacing.l,
  },
  sectionTitle: {
    ...typography.subheader,
    color: colors.text,
    marginBottom: spacing.s,
  },
  menuButton: {
    marginBottom: spacing.s,
    justifyContent: 'flex-start',
    borderColor: colors.border,
  },
  logoutButton: {
    marginTop: spacing.s,
    backgroundColor: '#FFEBEE', // Light red for logout
  },
});
