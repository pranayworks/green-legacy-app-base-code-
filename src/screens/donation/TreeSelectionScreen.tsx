import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDonation } from '../../context/DonationContext';
import { TreeOption } from '../../types/donation';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Card } from '../../components/Card';

const TREES: TreeOption[] = [
  { id: '1', name: 'Mango Tree', description: 'Provides sweet fruit and shade.', amount: 249, currency: '₹' },
  { id: '2', name: 'Neem Tree', description: 'Medicinal properties and air purification.', amount: 199, currency: '₹' },
  { id: '3', name: 'Banyan Tree', description: 'Long-living and massive canopy.', amount: 299, currency: '₹' },
];

export const TreeSelectionScreen = () => {
  const navigation = useNavigation<any>();
  const { donationData, updateDonationData } = useDonation();
  const [selectedTreeId, setSelectedTreeId] = React.useState<string | undefined>(donationData.tree?.id);

  const handleSelect = (tree: TreeOption) => {
    setSelectedTreeId(tree.id);
  };

  const handleNext = () => {
    const tree = TREES.find((t) => t.id === selectedTreeId);
    if (tree) {
      updateDonationData({ tree });
      navigation.navigate('RecipientDetails');
    }
  };

  const renderItem = ({ item }: { item: TreeOption }) => {
    const isSelected = selectedTreeId === item.id;
    return (
      <TouchableOpacity onPress={() => handleSelect(item)} activeOpacity={0.8}>
        <Card style={[styles.card, isSelected && styles.cardSelected]}>
          <View style={styles.cardHeader}>
            <Text style={styles.treeName}>{item.name}</Text>
            <Text style={styles.amount}>{item.currency}{item.amount}</Text>
          </View>
          <Text style={styles.description}>{item.description}</Text>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select a Tree</Text>
      <FlatList
        data={TREES}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.footer}>
        <PrimaryButton
          title="Next"
          onPress={handleNext}
          disabled={!selectedTreeId}
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
    marginBottom: spacing.m,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  card: {
    marginBottom: spacing.m,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelected: {
    borderColor: colors.primary,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.s,
  },
  treeName: {
    ...typography.subheader,
    color: colors.text,
  },
  amount: {
    ...typography.subheader,
    color: colors.primaryDark,
    fontWeight: 'bold',
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
  },
  footer: {
    paddingVertical: spacing.m,
  },
});
