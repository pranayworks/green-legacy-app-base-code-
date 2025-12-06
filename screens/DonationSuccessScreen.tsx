import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AnimatedButton from '../components/AnimatedButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any>;

const DonationSuccessScreen: React.FC<Props> = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thank you! Your donation was successful.</Text>
      <AnimatedButton title="Back to Home" onPress={() => navigation.navigate('Main' as any)} style={{ marginTop: 20 }} />
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }, title: { fontSize: 20, fontWeight: '800', color: '#2E8B57', textAlign: 'center' } });

export default DonationSuccessScreen;
