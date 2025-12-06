import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppHeader from '../components/AppHeader';
import AnimatedButton from '../components/AnimatedButton';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

const HomeScreen: React.FC = () => {
  const auth = useAuth();
  const nav = useNavigation<any>();

  return (
    <View style={{ flex: 1 }}>
      <AppHeader onProfilePress={() => nav.navigate('Login')} onNotifPress={() => nav.navigate('Main')} unread={2} />
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome{auth.user ? `, ${auth.user.name}` : ''} 👋</Text>
        <AnimatedButton title="Donate / Gift a Tree" onPress={() => nav.navigate('Donate')} style={{ marginTop: 14 }} />
        {!auth.isLoggedIn && (
          <View style={styles.banner}>
            <Text style={{ color: '#fff' }}>Please login to save your donations and access rewards</Text>
            <AnimatedButton title="Login" onPress={() => nav.navigate('Login')} style={{ marginTop: 10 }} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  welcome: { fontSize: 20, fontWeight: '700', color: '#2E8B57' },
  banner: { backgroundColor: '#2E8B57', padding: 12, borderRadius: 10, marginTop: 20 }
});

export default HomeScreen;
