import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDonation } from '../../context/DonationContext';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Card } from '../../components/Card';

export const SuccessScreen = () => {
  const navigation = useNavigation<any>();
  const { donationData, resetDonationData } = useDonation();

  const handleHome = () => {
    resetDonationData();
    // Navigate back to the initial route of the Donation flow or Root
    navigation.popToTop();
    navigation.navigate('Home'); // Assuming 'Home' is available in the parent navigator
  };

  const handleViewMyTrees = () => {
     resetDonationData();
     navigation.popToTop();
     navigation.navigate('History'); // Placeholder navigation
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.iconContainer}>
            <Text style={styles.successIcon}>🌱</Text>
        </View>
        <Text style={styles.title}>Thank you!</Text>
        <Text style={styles.subtitle}>Your tree will be planted soon.</Text>

        <Card style={styles.summaryCard}>
            <Text style={styles.cardTitle}>Donation Summary</Text>
            <Text style={styles.text}>Tree: {donationData.tree?.name}</Text>
            <Text style={styles.text}>For: {donationData.recipientName}</Text>
            <Text style={styles.text}>Occasion: {donationData.occasion}</Text>
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton title="View My Trees" onPress={handleViewMyTrees} style={styles.button} />
        <PrimaryButton title="Back to Home" onPress={handleHome} variant="outline" style={styles.button} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.m,
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: spacing.xl,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.l,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  successIcon: {
    fontSize: 48,
  },
  title: {
    ...typography.header,
    color: colors.primary,
    marginBottom: spacing.s,
  },
  subtitle: {
    ...typography.subheader,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  summaryCard: {
    width: '100%',
    padding: spacing.l,
  },
  cardTitle: {
    ...typography.subheader,
    marginBottom: spacing.m,
    color: colors.text,
  },
  text: {
    ...typography.body,
    marginBottom: spacing.s,
    color: colors.textSecondary,
  },
  footer: {
    paddingVertical: spacing.m,
  },
  button: {
    marginTop: spacing.s,
  },
});
