import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Constants from 'expo-constants';

const API_BASE = (() => {
  try {
    const dbg = (Constants as any).manifest?.debuggerHost || (Constants as any).manifest2?.debuggerHost;
    if (dbg && typeof dbg === 'string') {
      const host = dbg.split(':')[0];
      return `http://${host}:4000/api`;
    }
  } catch (e) {}
  return 'http://localhost:4000/api';
})();

const VolunteerForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [skills, setSkills] = useState('');
  const [interests, setInterests] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!name || !email || !phone || !skills) {
      Alert.alert('Please fill all required fields', 'Name, email, phone and skills are required.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/involvement/volunteer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, skills, interests })
      });
      if (!res.ok) throw new Error('Server error');
      Alert.alert('Thanks!', 'Your volunteer application has been submitted. We will contact you soon.');
      setName(''); setEmail(''); setPhone(''); setSkills(''); setInterests('');
    } catch (err) {
      console.warn(err);
      Alert.alert('Submission failed', 'Unable to send your application. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Volunteer with Green Legacy</Text>
      <Text style={styles.blurb}>Join our community volunteers to plant trees, run awareness drives, and support events. Tell us about yourself below.</Text>

      <TextInput value={name} onChangeText={setName} placeholder="Full name *" style={styles.input} />
      <TextInput value={email} onChangeText={setEmail} placeholder="Email *" keyboardType="email-address" style={styles.input} />
      <TextInput value={phone} onChangeText={setPhone} placeholder="Phone *" keyboardType="phone-pad" style={styles.input} />
      <TextInput value={skills} onChangeText={setSkills} placeholder="Skills (e.g. first aid, logistics) *" style={styles.input} />
      <TextInput value={interests} onChangeText={setInterests} placeholder="Interests / availability" style={[styles.input, { height: 100 }]} multiline />

      <TouchableOpacity style={styles.submitBtn} onPress={submit} disabled={loading}>
        <Text style={styles.submitText}>{loading ? 'Submitting…' : 'Apply to Volunteer'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#F6FFF7', flexGrow: 1 },
  title: { fontSize: 20, fontWeight: '800', color: '#1B5E20', marginBottom: 8 },
  blurb: { color: '#4B4B4B', marginBottom: 12 },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#E6F4EA', marginBottom: 12 },
  submitBtn: { backgroundColor: '#2E8B57', padding: 14, borderRadius: 10, alignItems: 'center' },
  submitText: { color: '#fff', fontWeight: '700' }
});

export default VolunteerForm;
