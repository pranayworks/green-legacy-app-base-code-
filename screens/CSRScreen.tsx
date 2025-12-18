
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

export default function CSRScreen() {
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [industry, setIndustry] = useState('');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async () => {
    if (!companyName || !contactName || !email || !phone || !companySize || !industry || !budget) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }
    if (!agreedToTerms) {
      Alert.alert('Terms Required', 'Please agree to the terms');
      return;
    }
    setLoading(true);
    try {
      // TODO: Call backend API to save CSR request
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccessMessage('Thank you! Our team will contact you within 24 hours 🌱');
      setTimeout(() => {
        setCompanyName('');
        setContactName('');
        setEmail('');
        setPhone('');
        setCompanySize('');
        setIndustry('');
        setBudget('');
        setMessage('');
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
      <AppHeader title="CSR" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* HERO SECTION */}
        <View style={styles.heroSection}>
          <View style={styles.heroBg}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80' }}
              style={styles.heroImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Partner with Green Legacy</Text>
            <Text style={styles.heroSubtitle}>
              Drive corporate impact. Build a sustainable future together.
            </Text>
          </View>
        </View>
        {/* WHY CSR SECTION */}
        <View style={styles.whyCsrSection}>
          <Text style={styles.sectionTitle}>Why Partner with Green Legacy?</Text>
          <Text style={styles.sectionSubtitle}>
            Join companies making environmental and social impact. Strengthen your corporate responsibility.
          </Text>
          <View style={styles.benefitsList}>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitEmoji}>🌍</Text>
              <Text style={styles.benefitText}>Global Environmental Impact</Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitEmoji}>💼</Text>
              <Text style={styles.benefitText}>Build Brand Trust</Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitEmoji}>👥</Text>
              <Text style={styles.benefitText}>Engage Your Team</Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitEmoji}>📊</Text>
              <Text style={styles.benefitText}>Measurable Impact Reports</Text>
            </View>
          </View>
        </View>
        {/* OUR IMPACT SECTION */}
        <View style={styles.impactSection}>
          <Text style={styles.sectionTitle}>Our Impact</Text>
          <View style={styles.impactCardsRow}>
            <View style={styles.impactCard}>
              <Text style={styles.impactIcon}>🌳</Text>
              <Text style={styles.impactStat}>50,000+</Text>
              <Text style={styles.impactLabel}>Trees Planted</Text>
            </View>
            <View style={styles.impactCard}>
              <Text style={styles.impactIcon}>🤝</Text>
              <Text style={styles.impactStat}>5,000+</Text>
              <Text style={styles.impactLabel}>Volunteers Engaged</Text>
            </View>
            <View style={styles.impactCard}>
              <Text style={styles.impactIcon}>🌱</Text>
              <Text style={styles.impactStat}>1,000+</Text>
              <Text style={styles.impactLabel}>CO₂ Reduced (tons)</Text>
            </View>
          </View>
        </View>
        {/* CSR PACKAGES SECTION */}
        <View style={styles.packagesSection}>
          <Text style={styles.sectionTitle}>CSR Packages</Text>
          <View style={styles.packagesRow}>
            {/* STARTER PLAN */}
            <View style={styles.packageCard}>
              <Text style={styles.packageName}>STARTER</Text>
              <Text style={styles.packagePrice}>₹50,000/year</Text>
              <View style={styles.packageFeatures}>
                <Text style={styles.packageFeature}>• 500 trees planted</Text>
                <Text style={styles.packageFeature}>• Monthly reports</Text>
                <Text style={styles.packageFeature}>• Logo on website</Text>
                <Text style={styles.packageFeature}>• Team volunteer event</Text>
              </View>
              <TouchableOpacity style={styles.packageButton}>
                <Text style={styles.packageButtonText}>Choose Plan</Text>
              </TouchableOpacity>
            </View>
            {/* GROWTH PLAN */}
            <View style={[styles.packageCard, styles.packageCardHighlight]}>
              <Text style={styles.packageName}>GROWTH</Text>
              <Text style={styles.packagePrice}>₹1,50,000/year</Text>
              <View style={styles.packageFeatures}>
                <Text style={styles.packageFeature}>• 1,500 trees planted</Text>
                <Text style={styles.packageFeature}>• Bi-weekly reports</Text>
                <Text style={styles.packageFeature}>• Logo on website + app</Text>
                <Text style={styles.packageFeature}>• Quarterly team events</Text>
                <Text style={styles.packageFeature}>• CSR workshop</Text>
              </View>
              <TouchableOpacity style={[styles.packageButton, styles.packageButtonHighlight]}>
                <Text style={styles.packageButtonText}>Choose Plan</Text>
              </TouchableOpacity>
            </View>
            {/* ENTERPRISE PLAN */}
            <View style={styles.packageCard}>
              <Text style={styles.packageName}>ENTERPRISE</Text>
              <Text style={styles.packagePrice}>Custom pricing</Text>
              <View style={styles.packageFeatures}>
                <Text style={styles.packageFeature}>• Unlimited trees planted</Text>
                <Text style={styles.packageFeature}>• Weekly reports</Text>
                <Text style={styles.packageFeature}>• Premium branding</Text>
                <Text style={styles.packageFeature}>• Monthly events</Text>
                <Text style={styles.packageFeature}>• Dedicated account manager</Text>
                <Text style={styles.packageFeature}>• Custom program design</Text>
              </View>
              <TouchableOpacity style={styles.packageButton}>
                <Text style={styles.packageButtonText}>Contact Us</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* CONTACT FORM SECTION */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Get in Touch with Our CSR Team</Text>
          <Text style={styles.sectionSubtitle}>Fill in your details and our team will reach out soon!</Text>
          <TextInput
            style={styles.input}
            placeholder="Company Name"
            placeholderTextColor="#999"
            value={companyName}
            onChangeText={setCompanyName}
          />
          <TextInput
            style={styles.input}
            placeholder="Contact Person Name"
            placeholderTextColor="#999"
            value={contactName}
            onChangeText={setContactName}
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
          {/* Company Size Dropdown */}
          <View style={styles.dropdownContainer}>
            <Picker
              selectedValue={companySize}
              onValueChange={(itemValue) => setCompanySize(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Company Size *" value="" />
              <Picker.Item label="Startup (1-50)" value="startup" />
              <Picker.Item label="SME (50-500)" value="sme" />
              <Picker.Item label="Mid-sized (500-5000)" value="mid" />
              <Picker.Item label="Enterprise (5000+)" value="enterprise" />
            </Picker>
          </View>
          {/* Industry Dropdown */}
          <View style={styles.dropdownContainer}>
            <Picker
              selectedValue={industry}
              onValueChange={(itemValue) => setIndustry(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Industry *" value="" />
              <Picker.Item label="Technology" value="technology" />
              <Picker.Item label="Finance" value="finance" />
              <Picker.Item label="Healthcare" value="healthcare" />
              <Picker.Item label="Retail" value="retail" />
              <Picker.Item label="Education" value="education" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>
          {/* Budget Dropdown */}
          <View style={styles.dropdownContainer}>
            <Picker
              selectedValue={budget}
              onValueChange={(itemValue) => setBudget(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Budget Range *" value="" />
              <Picker.Item label="₹25K - ₹50K" value="25-50k" />
              <Picker.Item label="₹50K - ₹1L" value="50k-1l" />
              <Picker.Item label="₹1L - ₹5L" value="1l-5l" />
              <Picker.Item label="₹5L+" value="5lplus" />
            </Picker>
          </View>
          {/* Message */}
          <TextInput
            style={[styles.input, styles.textAreaInput]}
            placeholder="Tell us about your CSR goals"
            placeholderTextColor="#999"
            value={message}
            onChangeText={setMessage}
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
              I agree to receive CSR information
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
              <Text style={styles.submitButtonText}>Send Request</Text>
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
  whyCsrSection: {
    backgroundColor: '#f0f9ff',
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
  impactSection: {
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
  impactCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  impactCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f0f9ff',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 4,
  },
  impactIcon: {
    fontSize: 32,
    marginBottom: 6,
  },
  impactStat: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E8B57',
  },
  impactLabel: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
    textAlign: 'center',
  },
  packagesSection: {
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  packagesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  packageCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e6f4ea',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  packageCardHighlight: {
    borderColor: '#2E8B57',
    backgroundColor: '#e0f7fa',
  },
  packageName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginBottom: 6,
  },
  packagePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 10,
  },
  packageFeatures: {
    marginBottom: 12,
  },
  packageFeature: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  packageButton: {
    backgroundColor: '#2E8B57',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 6,
  },
  packageButtonHighlight: {
    backgroundColor: '#388E3C',
  },
  packageButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
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
