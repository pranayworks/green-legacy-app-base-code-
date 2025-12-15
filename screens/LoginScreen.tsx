import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity } from 'react-native';
import AnimatedButton from '../components/AnimatedButton';
import { useAuth } from '../contexts/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';

const LoginScreen: React.FC = () => {
  const auth = useAuth();
  const nav = useNavigation<NativeStackNavigationProp<any>>();
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'email' | 'phone' | 'google'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);

  const handleGoogle = async () => {
    if (!termsChecked) return Alert.alert('Please accept Terms & Privacy Policy');
    setLoading(true);
    try {
      await auth.loginWithGoogle();
      Alert.alert('Welcome', `Welcome ${auth.user?.name || ''}`);
      nav.navigate('Main');
    } catch (err) {
      console.warn('Login error:', err);
      Alert.alert('Login Failed', 'Unable to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmail = async () => {
    if (!termsChecked) return Alert.alert('Please accept Terms & Privacy Policy');
    if (!email || !password) return Alert.alert('Please enter email and password');
    setLoading(true);
    try {
      await auth.loginWithCredentials(email.trim(), password);
      Alert.alert('Welcome', `Welcome ${auth.user?.name || ''}`);
      nav.navigate('Main');
    } catch (err) {
      console.warn('Email login failed', err);
      Alert.alert('Login Failed', 'Check your credentials and try again');
    } finally {
      setLoading(false);
    }
  };

  const handlePhone = async () => {
    if (!termsChecked) return Alert.alert('Please accept Terms & Privacy Policy');
    if (!phone) return Alert.alert('Please enter phone number');
    setLoading(true);
    try {
      // OTP flow mocked: accept any otp
      await auth.loginWithPhone(phone, otp);
      Alert.alert('Welcome', `Welcome ${auth.user?.name || ''}`);
      nav.navigate('Main');
    } catch (err) {
      console.warn('Phone login failed', err);
      Alert.alert('Login Failed', 'Unable to login via phone');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <Text style={styles.title}>Login to continue</Text>

      <View style={{ flexDirection: 'row', marginTop: 12 }}>
        <TouchableOpacity onPress={() => setMode('email')} style={[styles.tab, mode === 'email' && styles.tabActive]}><Text style={{ color: mode === 'email' ? '#fff' : '#1B5E20' }}>Email</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setMode('phone')} style={[styles.tab, mode === 'phone' && styles.tabActive]}><Text style={{ color: mode === 'phone' ? '#fff' : '#1B5E20' }}>Phone</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setMode('google')} style={[styles.tab, mode === 'google' && styles.tabActive]}><Text style={{ color: mode === 'google' ? '#fff' : '#1B5E20' }}>Google</Text></TouchableOpacity>
      </View>

      {mode === 'email' && (
        <View style={{ marginTop: 16 }}>
          <TextInput placeholder="you@example.com" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
          <TextInput placeholder="Password" secureTextEntry style={[styles.input, { marginTop: 12 }]} value={password} onChangeText={setPassword} />
          <AnimatedButton title={loading ? 'Logging in…' : 'Login with Email'} onPress={handleEmail} style={{ marginTop: 16 }} />
        </View>
      )}

      {mode === 'phone' && (
        <View style={{ marginTop: 16 }}>
          <TextInput placeholder="+1##########" style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          <TextInput placeholder="OTP (mock)" style={[styles.input, { marginTop: 12 }]} value={otp} onChangeText={setOtp} />
          <AnimatedButton title={loading ? 'Logging in…' : 'Login with Phone'} onPress={handlePhone} style={{ marginTop: 16 }} />
        </View>
      )}

      {mode === 'google' && (
        <AnimatedButton title={loading ? 'Logging in…' : 'Continue with Google'} onPress={handleGoogle} style={{ marginTop: 16 }} />
      )}

      <View style={{ flexDirection: 'row', marginTop: 18, alignItems: 'center' }}>
        <TouchableOpacity onPress={() => setTermsChecked(!termsChecked)} style={{ width: 22, height: 22, borderRadius: 4, borderWidth: 1, borderColor: '#4CAF50', backgroundColor: termsChecked ? '#4CAF50' : '#fff', marginRight: 10 }} />
        <Text>I accept the <Text style={{ color: '#1B5E20', fontWeight: '700' }} onPress={() => nav.navigate('Terms' as any)}>Terms & Privacy Policy</Text></Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={{ color: '#666' }}>Don't have an account? <Text style={{ color: '#1B5E20', fontWeight: '700' }} onPress={() => nav.navigate('Signup' as any)}>Sign up</Text></Text>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#F6FFF7' },
  title: { fontSize: 18, textAlign: 'center', color: '#333' },
  tab: { paddingVertical: 8, paddingHorizontal: 12, marginRight: 8, borderRadius: 8, borderWidth: 1, borderColor: '#E6F4EA', backgroundColor: '#F1FFF6' },
  tabActive: { backgroundColor: '#1B5E20' },
  input: { backgroundColor: '#fff', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, borderColor: '#E6F4EA' }
});

export default LoginScreen;
