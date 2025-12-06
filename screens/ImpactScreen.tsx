import React from 'react';
import { View, Text } from 'react-native';
import AppHeader from '../components/AppHeader';

const ImpactScreen: React.FC = () => (
  <View style={{ flex: 1 }}>
    <AppHeader />
    <View style={{ padding: 16 }}>
      <Text style={{ fontWeight: '700' }}>Impact</Text>
      <Text style={{ marginTop: 12 }}>We calculate oxygen and CO₂ using simple multipliers per tree.</Text>
    </View>
  </View>
);

export default ImpactScreen;
