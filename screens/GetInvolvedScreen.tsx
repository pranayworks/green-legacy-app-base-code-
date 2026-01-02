

import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AppHeader from '../components/AppHeader';

const VOLUNTEER_TAB = 'volunteer';
const CSR_TAB = 'csr';

export default function GetInvolvedScreen() {
  const [activeTab, setActiveTab] = useState(VOLUNTEER_TAB);

  // Volunteer states
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

  // CSR states
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [csrEmail, setCsrEmail] = useState('');
  const [csrPhone, setCsrPhone] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [industry, setIndustry] = useState('');
  const [budget, setBudget] = useState('');
  const [csrMessage, setCsrMessage] = useState('');
  const [csrTerms, setCsrTerms] = useState(false);
  const [csrLoading, setCsrLoading] = useState(false);
  const [csrSuccessMessage, setCsrSuccessMessage] = useState('');

  const handleVolunteerSubmit = async () => {
    if (!fullName || !email || !phone || !interestArea || !experience) {
      alert('Please fill in all required fields');
      return;
    }
    if (!agreedToTerms) {
      alert('Please agree to the terms');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccessMessage('Thank you! We\'ll contact you soon 🌱');
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
      alert('Error submitting form.');
    } finally {
      setLoading(false);
    }
  };

  const handleCSRSubmit = async () => {
    if (!companyName || !contactPerson || !csrEmail || !csrPhone || !companySize || !industry) {
      alert('Please fill in all required fields');
      return;
    }
    if (!csrTerms) {
      alert('Please agree to the terms');
      return;
    }

    setCsrLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCsrSuccessMessage('Thank you! Our CSR team will contact you within 24 hours 🌱');
      setTimeout(() => {
        setCompanyName('');
        setContactPerson('');
        setCsrEmail('');
        setCsrPhone('');
        setCompanySize('');
        setIndustry('');
        setBudget('');
        setCsrMessage('');
        setCsrTerms(false);
        setCsrSuccessMessage('');
      }, 2000);
    } catch (error) {
      alert('Error submitting form.');
    } finally {
      setCsrLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <AppHeader title="Get Involved" />

      {/* TAB BUTTONS */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === VOLUNTEER_TAB && styles.tabActive]}
          onPress={() => setActiveTab(VOLUNTEER_TAB)}
        >
          <Text style={[styles.tabText, activeTab === VOLUNTEER_TAB && styles.tabTextActive]}>
            🤝 Volunteer
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === CSR_TAB && styles.tabActive]}
          onPress={() => setActiveTab(CSR_TAB)}
        >
          <Text style={[styles.tabText, activeTab === CSR_TAB && styles.tabTextActive]}>
            💼 CSR
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* ========== VOLUNTEER TAB ========== */}
        {activeTab === VOLUNTEER_TAB && (
          <>
            <View style={styles.heroSection}>
              <Image
                source={{ uri: 'https://res.cloudinary.com/dqgqdszk2/image/upload/v1766557072/The_Comprehensive_List_Of_How_And_Where_To_Volunteer_In_Columbus_jxrrns.jpg' }}
                style={styles.heroImage}
              />
              <View style={styles.heroOverlay}>
                <Text style={styles.heroTitle}>Volunteers Beyond Borders</Text>
                <Text style={styles.heroSubtitle}>
                  Change the world — and yourself. Start your volunteer journey today.
                </Text>
              </View>
            </View>

            <View style={styles.whySection}>
              <Text style={styles.sectionTitle}>Why Volunteer?</Text>
              <Text style={styles.sectionSubtitle}>
                Volunteering helps people, animals, and the environment. It also helps you grow.
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

              <View style={styles.dropdownContainer}>
                <Picker
                  selectedValue={interestArea}
                  onValueChange={setInterestArea}
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

              <View style={styles.dropdownContainer}>
                <Picker
                  selectedValue={experience}
                  onValueChange={setExperience}
                  style={styles.picker}
                >
                  <Picker.Item label="Select Experience Level *" value="" />
                  <Picker.Item label="Beginner" value="beginner" />
                  <Picker.Item label="Intermediate" value="intermediate" />
                  <Picker.Item label="Expert" value="expert" />
                </Picker>
              </View>

              <TextInput
                style={[styles.input, styles.textAreaInput]}
                placeholder="Tell us about yourself"
                placeholderTextColor="#999"
                value={bio}
                onChangeText={setBio}
                multiline={true}
                numberOfLines={4}
              />

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

              <TouchableOpacity
                style={[styles.submitButton, !agreedToTerms || loading ? styles.submitButtonDisabled : {}]}
                onPress={handleVolunteerSubmit}
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
          </>
        )}

        {/* ========== CSR TAB ========== */}
        {activeTab === CSR_TAB && (
          <>
            <View style={styles.heroSection}>
              <Image
                source={{ uri: 'https://res.cloudinary.com/dqgqdszk2/image/upload/v1766557072/The_Comprehensive_List_Of_How_And_Where_To_Volunteer_In_Columbus_jxrrns.jpg' }}
                style={styles.heroImage}
              />
              <View style={styles.heroOverlay}>
                <Text style={styles.heroTitle}>Partner with Green Legacy</Text>
                <Text style={styles.heroSubtitle}>
                  Drive corporate impact. Build a sustainable future together.
                </Text>
              </View>
            </View>

            <View style={styles.whySection}>
              <Text style={styles.sectionTitle}>Why Partner with Green Legacy?</Text>
              <Text style={styles.sectionSubtitle}>
                Join companies making environmental and social impact.
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

            {/* CSR PACKAGES */}
            <View style={styles.packagesSection}>
              <Text style={styles.sectionTitle}>CSR Packages</Text>

              <View style={styles.packageCard}>
                <Text style={styles.packageTitle}>STARTER</Text>
                <Text style={styles.packagePrice}>₹50,000/year</Text>
                <View style={styles.packageFeatures}>
                  <Text style={styles.packageFeature}>✓ 500 trees planted</Text>
                  <Text style={styles.packageFeature}>✓ Monthly reports</Text>
                  <Text style={styles.packageFeature}>✓ Logo on website</Text>
                  <Text style={styles.packageFeature}>✓ Team volunteer event</Text>
                </View>
                <TouchableOpacity style={styles.packageButton}>
                  <Text style={styles.packageButtonText}>Choose Plan</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.packageCard}>
                <Text style={styles.packageTitle}>GROWTH</Text>
                <Text style={styles.packagePrice}>₹2,00,000/year</Text>
                <View style={styles.packageFeatures}>
                  <Text style={styles.packageFeature}>✓ 2,500 trees planted</Text>
                  <Text style={styles.packageFeature}>✓ Quarterly reports</Text>
                  <Text style={styles.packageFeature}>✓ Logo on website & events</Text>
                  <Text style={styles.packageFeature}>✓ Custom team event</Text>
                </View>
                <TouchableOpacity style={styles.packageButton}>
                  <Text style={styles.packageButtonText}>Choose Plan</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.packageCard}>
                <Text style={styles.packageTitle}>ENTERPRISE</Text>
                <Text style={styles.packagePrice}>Custom</Text>
                <View style={styles.packageFeatures}>
                  <Text style={styles.packageFeature}>✓ Custom tree count</Text>
                  <Text style={styles.packageFeature}>✓ Custom reporting</Text>
                  <Text style={styles.packageFeature}>✓ Dedicated account manager</Text>
                  <Text style={styles.packageFeature}>✓ Co-branded campaigns</Text>
                </View>
                <TouchableOpacity style={styles.packageButton}>
                  <Text style={styles.packageButtonText}>Contact Us</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* CSR FORM SECTION */}
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Corporate CSR Inquiry</Text>
              <Text style={styles.sectionSubtitle}>Fill in your company details and our CSR team will reach out!</Text>

              <TextInput
                style={styles.input}
                placeholder="Company Name"
                placeholderTextColor="#999"
                value={companyName}
                onChangeText={setCompanyName}
              />

              <TextInput
                style={styles.input}
                placeholder="Contact Person"
                placeholderTextColor="#999"
                value={contactPerson}
                onChangeText={setContactPerson}
              />

              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                value={csrEmail}
                onChangeText={setCsrEmail}
                keyboardType="email-address"
              />

              <TextInput
                style={styles.input}
                placeholder="Phone"
                placeholderTextColor="#999"
                value={csrPhone}
                onChangeText={setCsrPhone}
                keyboardType="phone-pad"
              />

              <View style={styles.dropdownContainer}>
                <Picker
                  selectedValue={companySize}
                  onValueChange={setCompanySize}
                  style={styles.picker}
                >
                  <Picker.Item label="Select Company Size *" value="" />
                  <Picker.Item label="1-50" value="1-50" />
                  <Picker.Item label="51-200" value="51-200" />
                  <Picker.Item label="201-1000" value="201-1000" />
                  <Picker.Item label="1000+" value="1000+" />
                </Picker>
              </View>

              <View style={styles.dropdownContainer}>
                <Picker
                  selectedValue={industry}
                  onValueChange={setIndustry}
                  style={styles.picker}
                >
                  <Picker.Item label="Select Industry *" value="" />
                  <Picker.Item label="IT / Software" value="it" />
                  <Picker.Item label="Manufacturing" value="manufacturing" />
                  <Picker.Item label="Finance" value="finance" />
                  <Picker.Item label="Retail" value="retail" />
                  <Picker.Item label="Other" value="other" />
                </Picker>
              </View>

              <TextInput
                style={styles.input}
                placeholder="CSR Budget (optional)"
                placeholderTextColor="#999"
                value={budget}
                onChangeText={setBudget}
                keyboardType="numeric"
              />

              <TextInput
                style={[styles.input, styles.textAreaInput]}
                placeholder="Message (optional)"
                placeholderTextColor="#999"
                value={csrMessage}
                onChangeText={setCsrMessage}
                multiline={true}
                numberOfLines={4}
              />

              <View style={styles.checkboxContainer}>
                <TouchableOpacity
                  style={[styles.checkbox, csrTerms && styles.checkboxChecked]}
                  onPress={() => setCsrTerms(!csrTerms)}
                >
                  <Text style={styles.checkboxIcon}>{csrTerms ? '✓' : ''}</Text>
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>
                  I confirm this is a genuine CSR inquiry
                </Text>
              </View>

              <TouchableOpacity
                style={[styles.submitButton, !csrTerms || csrLoading ? styles.submitButtonDisabled : {}]}
                onPress={handleCSRSubmit}
                disabled={!csrTerms || csrLoading}
              >
                {csrLoading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.submitButtonText}>Submit CSR Inquiry</Text>
                )}
              </TouchableOpacity>

              {csrSuccessMessage && (
                <Text style={styles.successMessage}>{csrSuccessMessage}</Text>
              )}
            </View>
          </>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    margin: 16,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: '#f1f8e9',
  },
  tabActive: {
    backgroundColor: '#16a34a',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  tabTextActive: {
    color: '#fff',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  heroSection: {
    marginBottom: 18,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#e8f5e9',
  },
  heroImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(22,163,74,0.15)',
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 4,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
  },
  whySection: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 6,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 10,
  },
  benefitsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f8e9',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  benefitEmoji: {
    fontSize: 18,
    marginRight: 6,
  },
  benefitText: {
    fontSize: 13,
    color: '#1B5E20',
  },
  formSection: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 18,
    elevation: 1,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    marginBottom: 12,
  },
  textAreaInput: {
    minHeight: 70,
    textAlignVertical: 'top',
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 12,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    color: '#1B5E20',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#16a34a',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: '#16a34a',
    borderColor: '#16a34a',
  },
  checkboxIcon: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  checkboxLabel: {
    fontSize: 13,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#16a34a',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#b2dfdb',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  successMessage: {
    color: '#16a34a',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 10,
    textAlign: 'center',
  },
  packagesSection: {
    marginBottom: 18,
  },
  packageCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
  },
  packageTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 4,
  },
  packagePrice: {
    fontSize: 16,
    color: '#16a34a',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  packageFeatures: {
    marginBottom: 10,
  },
  packageFeature: {
    fontSize: 13,
    color: '#333',
    marginBottom: 2,
  },
  packageButton: {
    backgroundColor: '#16a34a',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  packageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
