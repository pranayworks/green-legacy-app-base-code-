import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import AnimatedButton from '../components/AnimatedButton';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

const SignupScreen: React.FC = () => {
  const auth = useAuth();
  const nav = useNavigation<any>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!terms) return Alert.alert('Please accept Terms & Privacy Policy');
    if (!email || !password) return Alert.alert('Please enter email and password');
    setLoading(true);
    try {
      await auth.signupWithCredentials(email.trim(), password, { name: name || undefined, phone: phone || undefined, age: age ? Number(age) : undefined });
      Alert.alert('Welcome', `Welcome ${auth.user?.name || ''}`);
      // If profile incomplete (missing phone or age), prompt to complete
      if (!auth.user?.phone || !auth.user?.age) {
        setTimeout(() => nav.navigate('Profile' as any), 600);
      } else {
        nav.navigate('Main' as any);
      }
    } catch (err) {
      console.warn('Signup failed', err);
      Alert.alert('Signup failed', 'Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <Text style={styles.title}>Create your account</Text>

      <TextInput placeholder="Full name" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="you@example.com" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput placeholder="Phone (optional)" style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <TextInput placeholder="Age (optional)" style={styles.input} value={age} onChangeText={setAge} keyboardType="number-pad" />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
        <TouchableOpacity onPress={() => setTerms(!terms)} style={{ width: 22, height: 22, borderRadius: 4, borderWidth: 1, borderColor: '#4CAF50', backgroundColor: terms ? '#4CAF50' : '#fff', marginRight: 10 }} />
        <Text>I accept the <Text style={{ color: '#1B5E20', fontWeight: '700' }} onPress={() => nav.navigate('Terms' as any)}>Terms & Privacy Policy</Text></Text>
      </View>

      <AnimatedButton title={loading ? 'Creating…' : 'Sign up'} onPress={handleSignup} style={{ marginTop: 20 }} />

      <View style={{ marginTop: 12 }}>
        <Text style={{ color: '#666' }}>Already have an account? <Text style={{ color: '#1B5E20', fontWeight: '700' }} onPress={() => nav.navigate('Login' as any)}>Login</Text></Text>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '800', color: '#1B5E20', marginBottom: 8 },
  input: { backgroundColor: '#fff', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, borderColor: '#E6F4EA', marginTop: 10 }
});

export default SignupScreen;
