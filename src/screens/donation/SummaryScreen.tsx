import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDonation } from '../../context/DonationContext';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Card } from '../../components/Card';

export const SummaryScreen = () => {
  const navigation = useNavigation<any>();
  const { donationData } = useDonation();
  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    // Integrate API calls to backend here (to create a donation record)
    // Integrate real payment gateway (e.g., Razorpay) here

    setLoading(true);
    // Simulate payment delay
    setTimeout(() => {
      setLoading(false);
      // Navigate to Success
      navigation.replace('Success');
      // After success, typically generate certificate or send email from backend
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Summary</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card}>
          <DetailRow label="Occasion" value={donationData.occasion} />
          <DetailRow label="Tree Type" value={donationData.tree?.name} />
          <DetailRow label="Amount" value={`${donationData.tree?.currency}${donationData.tree?.amount}`} isTotal />
          <View style={styles.divider} />
          <DetailRow label="Recipient" value={donationData.recipientName} />
          <DetailRow label="Date" value={donationData.occasionDate} />
          {donationData.message ? (
             <View style={styles.messageContainer}>
               <Text style={styles.label}>Message:</Text>
               <Text style={styles.message}>{donationData.message}</Text>
             </View>
          ) : null}
        </Card>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total to Pay:</Text>
            <Text style={styles.totalValue}>{donationData.tree?.currency}{donationData.tree?.amount}</Text>
        </View>
        <PrimaryButton
          title="Confirm & Pay"
          onPress={handlePay}
          loading={loading}
        />
        <PrimaryButton
          title="Back"
          onPress={() => navigation.goBack()}
          variant="outline"
          style={styles.backButton}
          disabled={loading}
        />
      </View>
    </View>
  );
};

const DetailRow = ({ label, value, isTotal }: { label: string, value?: string, isTotal?: boolean }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={[styles.value, isTotal && styles.totalText]}>{value || '-'}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.m,
  },
  header: {
    ...typography.header,
    color: colors.primary,
    marginBottom: spacing.l,
    textAlign: 'center',
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  card: {
    padding: spacing.l,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.m,
  },
  label: {
    ...typography.body,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  value: {
    ...typography.body,
    color: colors.text,
    textAlign: 'right',
    flex: 1,
    marginLeft: spacing.m,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.m,
  },
  totalText: {
    color: colors.primaryDark,
    fontWeight: 'bold',
  },
  messageContainer: {
    marginTop: spacing.s,
  },
  message: {
    ...typography.body,
    color: colors.text,
    marginTop: spacing.xs,
    fontStyle: 'italic',
  },
  footer: {
    paddingVertical: spacing.m,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  totalLabel: {
    ...typography.subheader,
    color: colors.text,
  },
  totalValue: {
    ...typography.header,
    color: colors.primaryDark,
  },
  backButton: {
    marginTop: spacing.s,
    borderColor: 'transparent', // Looks cleaner
  },
});
