import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AnimatedButton from '../components/AnimatedButton';
import { useAuth } from '../contexts/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

const LoginScreen: React.FC = () => {
  const auth = useAuth();
  const nav = useNavigation<NativeStackNavigationProp<any>>();

  const handleGoogle = async () => {
    await auth.login();
    // TODO: Integrate real Google Sign-In
    nav.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login or signup to access your dashboard and rewards.</Text>
      <AnimatedButton title="Continue with Google" onPress={handleGoogle} style={{ marginTop: 20 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 18, textAlign: 'center', color: '#333' }
});

export default LoginScreen;
