import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDonation } from '../../context/DonationContext';
import { OccasionType } from '../../types/donation';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { PrimaryButton } from '../../components/PrimaryButton';

const OCCASIONS: OccasionType[] = ['Birthday', 'Anniversary', 'In Memory', 'Festival / Other'];

export const OccasionSelectionScreen = () => {
  const navigation = useNavigation<any>();
  const { donationData, updateDonationData } = useDonation();
  const [selected, setSelected] = React.useState<OccasionType | undefined>(donationData.occasion);

  const handleSelect = (occasion: OccasionType) => {
    setSelected(occasion);
  };

  const handleNext = () => {
    if (selected) {
      updateDonationData({ occasion: selected });
      navigation.navigate('TreeSelection');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>What is the occasion?</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {OCCASIONS.map((occasion) => (
            <TouchableOpacity
              key={occasion}
              style={[
                styles.card,
                selected === occasion && styles.cardSelected,
              ]}
              onPress={() => handleSelect(occasion)}
            >
              <Text
                style={[
                  styles.cardText,
                  selected === occasion && styles.cardTextSelected,
                ]}
              >
                {occasion}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <PrimaryButton
          title="Next"
          onPress={handleNext}
          disabled={!selected}
        />
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.m,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.m,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.surface, // Or a light tint
  },
  cardText: {
    ...typography.subheader,
    color: colors.text,
    textAlign: 'center',
  },
  cardTextSelected: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  footer: {
    paddingVertical: spacing.m,
  },
});
