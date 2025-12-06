import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AppHeader from '../components/AppHeader';

const AboutScreen: React.FC = () => (
  <View style={{ flex: 1 }}>
    <AppHeader />
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.title}>About Green Legacy</Text>
      <Text style={{ marginTop: 12 }}>Green Legacy is an NGO focused on planting trees and restoring ecosystems.</Text>
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({ title: { fontSize: 18, fontWeight: '700', color: '#2E8B57' } });

export default AboutScreen;
