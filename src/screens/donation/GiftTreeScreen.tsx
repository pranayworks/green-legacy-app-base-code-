import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { PrimaryButton } from '../../components/PrimaryButton';
import { TextInputField } from '../../components/TextInputField';

export const GiftTreeScreen = () => {
  const [selectedPlan, setSelectedPlan] = useState('one-time');

  const handleDonate = () => {
    Alert.alert('Payment', 'Navigating to Payment Gateway...');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>Make a Donation</Text>

      <Text style={styles.sectionTitle}>Select Plan</Text>
      <View style={styles.planContainer}>
        {['One-time', 'Monthly', 'Annual'].map((plan) => {
          const value = plan.toLowerCase();
          const isSelected = selectedPlan === value;
          return (
            <PrimaryButton
              key={value}
              title={plan}
              onPress={() => setSelectedPlan(value)}
              variant={isSelected ? 'primary' : 'outline'}
              style={styles.planButton}
            />
          );
        })}
      </View>

      <View style={styles.form}>
        <TextInputField
          label="Occasion"
          placeholder="e.g., Birthday, Anniversary, Memory"
        />
        <TextInputField
          label="Honoree Name"
          placeholder="Who is this tree for?"
        />
        <TextInputField
          label="Message"
          placeholder="Add a personal note..."
          multiline
          numberOfLines={3}
          style={{ height: 100, textAlignVertical: 'top' }}
        />

        <View style={styles.summary}>
          <Text style={styles.summaryText}>Total Donation: $20.00</Text>
        </View>

        <PrimaryButton
          title="Proceed to Donate"
          onPress={handleDonate}
          style={styles.donateButton}
        />
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
  },
  header: {
    ...typography.header,
    color: colors.primary,
    marginBottom: spacing.l,
  },
  sectionTitle: {
    ...typography.subheader,
    color: colors.text,
    marginBottom: spacing.s,
  },
  planContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.l,
  },
  planButton: {
    flex: 1,
    marginHorizontal: spacing.xs,
    height: 40,
  },
  form: {
    marginTop: spacing.s,
  },
  summary: {
    marginVertical: spacing.l,
    alignItems: 'center',
  },
  summaryText: {
    ...typography.subheader,
    color: colors.primaryDark,
  },
  donateButton: {
    marginTop: spacing.s,
  },
});
