
import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AppHeader from '../components/AppHeader';

export default function GetInvolvedScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [interestArea, setInterestArea] = useState('');
  const [experience, setExperience] = useState('');
  const [bio, setBio] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async () => {
    if (!fullName || !email || !phone || !interestArea || !experience) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }
    if (!agreedToTerms) {
      Alert.alert('Terms Required', 'Please agree to the terms');
      return;
    }
    setLoading(true);
    try {
      // TODO: Call backend API to save volunteer data
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccessMessage("Thank you! We'll contact you soon 🌱");
      setTimeout(() => {
        setFullName('');
        setEmail('');
        setPhone('');
        setLocation('');
        setInterestArea('');
        setExperience('');
        setBio('');
        setAgreedToTerms(false);
        setSuccessMessage('');
      }, 2000);
    } catch (error) {
      Alert.alert('Error', 'Error submitting form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <AppHeader title="Get Involved" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* HERO SECTION */}
        <View style={styles.heroSection}>
          <View style={styles.heroBg}>
            {/* Replace with your own image asset or remote image */}
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' }}
              style={styles.heroImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Volunteers Beyond Borders</Text>
            <Text style={styles.heroSubtitle}>
              Change the world — and yourself. Start your volunteer journey today.
            </Text>
          </View>
        </View>
        {/* WHY VOLUNTEER SECTION */}
        <View style={styles.whyVolunteerSection}>
          <Text style={styles.sectionTitle}>Why Volunteer?</Text>
          <Text style={styles.sectionSubtitle}>
            Volunteering helps people, animals, and the environment. It also helps you grow. You learn new things, meet new people, and discover other cultures.
          </Text>
          <View style={styles.benefitsList}>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitEmoji}>🌱</Text>
              <Text style={styles.benefitText}>Make a difference</Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitEmoji}>🌍</Text>
              <Text style={styles.benefitText}>Discover the world</Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitEmoji}>💬</Text>
              <Text style={styles.benefitText}>Improve your language skills</Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitEmoji}>💪</Text>
              <Text style={styles.benefitText}>Grow your confidence</Text>
            </View>
          </View>
        </View>
        {/* VOLUNTEER FORM SECTION */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Join as a Volunteer</Text>
          <Text style={styles.sectionSubtitle}>Fill in your details and we'll get in touch soon!</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#999"
            value={fullName}
            onChangeText={setFullName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            placeholderTextColor="#999"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Location/City"
            placeholderTextColor="#999"
            value={location}
            onChangeText={setLocation}
          />
          {/* Interest Area Dropdown */}
          <View style={styles.dropdownContainer}>
            <Picker
              selectedValue={interestArea}
              onValueChange={(itemValue) => setInterestArea(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Interest Area *" value="" />
              <Picker.Item label="Tree Planting" value="tree-planting" />
              <Picker.Item label="Community Outreach" value="community" />
              <Picker.Item label="Social Media & Content" value="social-media" />
              <Picker.Item label="Event Organization" value="events" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>
          {/* Experience Level Dropdown */}
          <View style={styles.dropdownContainer}>
            <Picker
              selectedValue={experience}
              onValueChange={(itemValue) => setExperience(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Experience Level *" value="" />
              <Picker.Item label="Beginner" value="beginner" />
              <Picker.Item label="Intermediate" value="intermediate" />
              <Picker.Item label="Expert" value="expert" />
            </Picker>
          </View>
          {/* Bio/Message */}
          <TextInput
            style={[styles.input, styles.textAreaInput]}
            placeholder="Tell us about yourself"
            placeholderTextColor="#999"
            value={bio}
            onChangeText={setBio}
            multiline={true}
            numberOfLines={4}
          />
          {/* Terms Checkbox */}
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}
              onPress={() => setAgreedToTerms(!agreedToTerms)}
            >
              <Text style={styles.checkboxIcon}>{agreedToTerms ? '✓' : ''}</Text>
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>
              I agree to volunteer with Green Legacy
            </Text>
          </View>
          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              !agreedToTerms || loading ? styles.submitButtonDisabled : {},
            ]}
            onPress={handleSubmit}
            disabled={!agreedToTerms || loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.submitButtonText}>Join as Volunteer</Text>
            )}
          </TouchableOpacity>
          {successMessage && (
            <Text style={styles.successMessage}>{successMessage}</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 80,
  },
  heroSection: {
    position: 'relative',
    height: 280,
    marginBottom: 24,
  },
  heroBg: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#e0e0e0',
    textAlign: 'center',
  },
  whyVolunteerSection: {
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 16,
    paddingVertical: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  benefitsList: {
    marginTop: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  benefitEmoji: {
    fontSize: 22,
    marginRight: 10,
  },
  benefitText: {
    fontSize: 15,
    color: '#1B5E20',
    fontWeight: '600',
  },
  formSection: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 12,
    marginHorizontal: 12,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  input: {
    backgroundColor: '#f6fff7',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 15,
    color: '#222',
    borderWidth: 1,
    borderColor: '#e6f4ea',
  },
  textAreaInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  dropdownContainer: {
    backgroundColor: '#f6fff7',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e6f4ea',
    marginBottom: 12,
    overflow: 'hidden',
  },
  picker: {
    height: 44,
    color: '#222',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#2E8B57',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: '#2E8B57',
    borderColor: '#2E8B57',
  },
  checkboxIcon: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  checkboxLabel: {
    color: '#222',
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: '#2E8B57',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#b2dfdb',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  successMessage: {
    color: '#1B5E20',
    fontWeight: '700',
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
  },
});
