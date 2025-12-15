import React from 'react';
import { Text, StyleSheet } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';

const PrivacyScreen: React.FC = () => (
  <ScreenWrapper>
    <Text style={styles.title}>Privacy Policy</Text>
    <Text style={styles.p}>We collect minimal data to process donations and send receipts. Data is used for delivering services and will not be sold.</Text>
  </ScreenWrapper>
);

const styles = StyleSheet.create({ title: { fontSize: 20, fontWeight: '800', color: '#1B5E20', marginBottom: 8 }, p: { color: '#444', marginBottom: 8 } });

export default PrivacyScreen;
