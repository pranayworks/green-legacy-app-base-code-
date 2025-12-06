import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppHeader from '../components/AppHeader';

const NotificationsScreen: React.FC = () => (
  <View style={{ flex: 1 }}>
    <AppHeader />
    <View style={{ padding: 16 }}>
      <Text style={{ fontWeight: '700' }}>Notifications</Text>
      <Text style={{ marginTop: 12 }}>No new notifications</Text>
    </View>
  </View>
);

export default NotificationsScreen;
