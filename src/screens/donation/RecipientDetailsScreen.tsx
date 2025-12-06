import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDonation } from '../../context/DonationContext';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { PrimaryButton } from '../../components/PrimaryButton';
import { TextInputField } from '../../components/TextInputField';

export const RecipientDetailsScreen = () => {
  const navigation = useNavigation<any>();
  const { donationData, updateDonationData } = useDonation();

  const [recipientName, setRecipientName] = useState(donationData.recipientName);
  const [occasionDate, setOccasionDate] = useState(donationData.occasionDate);
  const [message, setMessage] = useState(donationData.message);
  const [donorEmail, setDonorEmail] = useState(donationData.donorEmail);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!recipientName.trim()) newErrors.recipientName = 'Recipient Name is required';
    if (!occasionDate.trim()) newErrors.occasionDate = 'Date is required';
    if (!donorEmail.trim()) newErrors.donorEmail = 'Donor Email is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      updateDonationData({
        recipientName,
        occasionDate,
        message,
        donorEmail,
      });
      navigation.navigate('Summary');
    } else {
      Alert.alert('Incomplete', 'Please fill in all required fields.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recipient Details</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TextInputField
          label="Recipient Name *"
          value={recipientName}
          onChangeText={setRecipientName}
          placeholder="Who is this for?"
          error={errors.recipientName}
        />
        <TextInputField
          label="Occasion Date *"
          value={occasionDate}
          onChangeText={setOccasionDate}
          placeholder="YYYY-MM-DD"
          error={errors.occasionDate}
        />
        <TextInputField
          label="Donor Email *"
          value={donorEmail}
          onChangeText={setDonorEmail}
          placeholder="Your email for the receipt"
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.donorEmail}
        />
        <TextInputField
          label="Personal Message"
          value={message}
          onChangeText={setMessage}
          placeholder="Write a message..."
          multiline
          numberOfLines={4}
          style={styles.textArea}
        />
      </ScrollView>
      <View style={styles.footer}>
        <PrimaryButton title="Next" onPress={handleNext} />
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
  header: {
    ...typography.header,
    color: colors.primary,
    marginBottom: spacing.l,
    textAlign: 'center',
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  footer: {
    paddingVertical: spacing.m,
  },
});
