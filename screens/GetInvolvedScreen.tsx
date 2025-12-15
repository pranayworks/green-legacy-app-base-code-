import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GetInvolvedScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Get Involved</Text>
      <Text style={styles.blurb}>Choose how you'd like to support Green Legacy. Volunteers help on-the-ground. CSR partnerships enable companies to amplify impact.</Text>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Volunteer' as never)}>
        <Text style={styles.cardTitle}>Volunteer</Text>
        <Text style={styles.cardText}>Donate your time — tree planting, events, and community outreach.</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CSR' as never)}>
        <Text style={styles.cardTitle}>Corporate Social Responsibility (CSR)</Text>
        <Text style={styles.cardText}>Partner with us to run corporate giving and employee volunteering programs.</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F6FFF7' },
  title: { fontSize: 22, fontWeight: '800', color: '#1B5E20', marginBottom: 8 },
  blurb: { color: '#4B4B4B', marginBottom: 16 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: '#E6F4EA' },
  cardTitle: { fontWeight: '700', color: '#2E7D32', marginBottom: 6 },
  cardText: { color: '#666' }
});

export default GetInvolvedScreen;
