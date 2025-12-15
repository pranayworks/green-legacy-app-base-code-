import React from 'react';
import { View, Text } from 'react-native';
import AppHeader from '../components/AppHeader';

const ContactScreen: React.FC = () => (
  <View style={{ flex: 1 }}>
    <AppHeader />
    <View style={{ padding: 16 }}>
      <Text style={{ fontWeight: '700' }}>Contact</Text>
      <Text style={{ marginTop: 12 }}>Email: hello@greenlegacy.org</Text>
    </View>
  </View>
);

export default ContactScreen;
