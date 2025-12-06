import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import AppHeader from '../components/AppHeader';

const MediaScreen: React.FC = () => (
  <View style={{ flex: 1 }}>
    <AppHeader />
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontWeight: '700' }}>Media</Text>
      <Text style={{ marginTop: 8 }}>Images and videos from our tree planting events.</Text>
    </ScrollView>
  </View>
);

export default MediaScreen;
