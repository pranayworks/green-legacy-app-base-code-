import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AppHeader from '../components/AppHeader';
import { useNavigation } from '@react-navigation/native';

const MoreScreen: React.FC = () => {
  const nav = useNavigation<any>();

  return (
    <View style={{ flex: 1 }}>
      <AppHeader />
      <View style={styles.container}>
        <Text style={styles.title}>More</Text>
        <TouchableOpacity style={styles.row} onPress={() => nav.navigate('Impact')}>
          <Text>Impact</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => nav.navigate('Contact')}>
          <Text>Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => nav.navigate('Media')}>
          <Text>Media</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({ container: { padding: 16 }, title: { fontSize: 18, fontWeight: '700', color: '#2E8B57' }, row: { padding: 12, backgroundColor: '#fff', marginTop: 12, borderRadius: 8 } });

export default MoreScreen;
