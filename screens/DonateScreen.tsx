import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import AnimatedButton from '../components/AnimatedButton';
import AppHeader from '../components/AppHeader';
import { useAuth } from '../contexts/AuthContext';
import { useDonations } from '../contexts/DonationsContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

const DonateScreen: React.FC = () => {
  const auth = useAuth();
  const { addDonation } = useDonations();
  const nav = useNavigation<NativeStackNavigationProp<any>>();

  const [form, setForm] = useState({ occasion: '', treeType: 'Neem', trees: '1', recipient: '', date: new Date().toISOString(), message: '' });

  if (!auth.isLoggedIn) {
    return (
      <View style={{ flex: 1 }}>
        <AppHeader />
        <View style={{ padding: 16 }}>
          <Text>Please login to donate.</Text>
          <AnimatedButton title="Login" onPress={() => nav.navigate('Login' as any)} style={{ marginTop: 12 }} />
        </View>
      </View>
    );
  }

  const handleSubmit = async () => {
    const trees = Number(form.trees) || 1;
    if (trees <= 0) return;
    // simulate payment flow
    // TODO: integrate real payment gateway
    const donation = await addDonation({ occasion: form.occasion || 'Donation', treeType: form.treeType, trees, recipient: form.recipient, date: form.date, message: form.message });
    if (donation) nav.navigate('DonationSuccess' as any, { donationId: donation.id });
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 40 }}>
      <AppHeader />
      <View style={styles.container}>
        <Text style={styles.title}>Plant a Tree</Text>
        <TextInput placeholder="Occasion" style={styles.input} value={form.occasion} onChangeText={(t) => setForm({ ...form, occasion: t })} />
        <TextInput placeholder="Tree type" style={styles.input} value={form.treeType} onChangeText={(t) => setForm({ ...form, treeType: t })} />
        <TextInput placeholder="Number of trees" keyboardType="number-pad" style={styles.input} value={form.trees} onChangeText={(t) => setForm({ ...form, trees: t })} />
        <TextInput placeholder="Recipient name" style={styles.input} value={form.recipient} onChangeText={(t) => setForm({ ...form, recipient: t })} />
        <TextInput placeholder="Message" style={[styles.input, { height: 100 }]} value={form.message} multiline onChangeText={(t) => setForm({ ...form, message: t })} />
        <AnimatedButton title="Submit Donation" onPress={handleSubmit} style={{ marginTop: 14 }} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: '700', color: '#2E8B57' },
  input: { backgroundColor: '#fff', marginTop: 12, padding: 10, borderRadius: 8 }
});

export default DonateScreen;
