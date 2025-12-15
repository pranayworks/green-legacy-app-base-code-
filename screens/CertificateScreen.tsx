import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ShareOptions from '../components/ShareOptions';
import { useAuth } from '../contexts/AuthContext';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

type Props = NativeStackScreenProps<any>;

const CertificateScreen: React.FC<Props> = ({ navigation, route }) => {
  const donation = route.params?.donation;
  const auth = useAuth();

  if (!donation) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>No certificate found.</Text>
      </View>
    );
  }

  const certText = `Certificate of Contribution\n\nThis certifies that ${donation.donorName || auth.user?.name || 'Supporter'} has sponsored ${donation.trees} tree(s) (${donation.treeType || 'tree'}) on ${new Date(donation.date).toDateString()}.\n\nOccasion: ${donation.occasion || 'Donation'}\nRecipient: ${donation.recipient || '—'}\nLocation: ${donation.location || 'Location will be updated shortly.'}\n\nDonation ID: ${donation.id}`;

  const handleEmail = () => {
    // Mock sending email — real implementation requires backend
    Alert.alert('Email Sent', 'A copy of your certificate will be sent to your email address shortly (simulated).');
  };

  const handleDownloadPDF = async () => {
    try {
      const html = `
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
              body { font-family: Arial, Helvetica, sans-serif; padding: 24px; color: #133d27 }
              .card { border-left: 8px solid #4CAF50; padding: 16px; background: #fff; border-radius: 6px }
              h1 { color: #1B5E20 }
              .meta { margin-top: 12px; color: #333 }
            </style>
          </head>
          <body>
            <div class="card">
              <h1>Certificate of Contribution</h1>
              <h3>Green Legacy</h3>
              <p class="meta">This certifies that <strong>${donation.donorName || auth.user?.name || 'Supporter'}</strong> has sponsored <strong>${donation.trees}</strong> tree(s) (${donation.treeType || 'tree'}) on <strong>${new Date(donation.date).toDateString()}</strong>.</p>
              <p class="meta">Occasion: ${donation.occasion || 'Donation'}</p>
              <p class="meta">Recipient: ${donation.recipient || '—'}</p>
              <p class="meta">Location: ${donation.location || 'Location will be updated shortly.'}</p>
              <p class="meta">Donation ID: ${donation.id}</p>
            </div>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html });

      // On web this will be a blob URL; expo-sharing is not available on web
      if (Platform.OS === 'web') {
        Alert.alert('PDF Generated', 'PDF generation is supported on native only in this demo.');
        return;
      }

      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(uri, { mimeType: 'application/pdf' });
      } else {
        Alert.alert('Share not available', 'Sharing is not available on this device. The file was generated at: ' + uri);
      }
    } catch (err) {
      console.warn('PDF generation error', err);
      Alert.alert('Error', 'Failed to generate PDF certificate.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.title}>Certificate of Contribution</Text>
        <Text style={styles.subtitle}>Green Legacy</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Donor</Text>
          <Text style={styles.value}>{donation.donorName || auth.user?.name || 'Supporter'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Trees</Text>
          <Text style={styles.value}>{donation.trees} ({donation.treeType || 'Tree'})</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Occasion</Text>
          <Text style={styles.value}>{donation.occasion || 'Donation'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Recipient</Text>
          <Text style={styles.value}>{donation.recipient || '—'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{new Date(donation.date).toDateString()}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Location</Text>
          <Text style={styles.value}>{donation.location || 'Location will be updated shortly.'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Donation ID</Text>
          <Text style={styles.value}>{donation.id}</Text>
        </View>

      </View>

      <ShareOptions title={`I planted ${donation.trees} tree(s) with Green Legacy!`} message={certText} url={undefined} />

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.primaryText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn} onPress={handleEmail}>
          <Text style={styles.secondaryText}>Email Certificate</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.actionsRow, { marginTop: 12 }] }>
        <TouchableOpacity style={[styles.primaryBtn, { flex: 1 }]} onPress={handleDownloadPDF}>
          <Text style={styles.primaryText}>Download PDF</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8F5E9' },
  content: { padding: 16, alignItems: 'center' },
  card: { width: '100%', backgroundColor: '#fff', borderRadius: 12, padding: 16, marginTop: 12, borderLeftWidth: 4, borderLeftColor: '#4CAF50' },
  title: { fontSize: 20, fontWeight: '800', color: '#1B5E20', textAlign: 'center' },
  subtitle: { fontSize: 12, color: '#2E7D32', textAlign: 'center', marginBottom: 12 },
  section: { marginTop: 10 },
  label: { fontSize: 12, color: '#666' },
  value: { fontSize: 14, fontWeight: '700', color: '#1B5E20', marginTop: 2 },
  message: { textAlign: 'center', marginTop: 32, color: '#999' },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 20 },
  primaryBtn: { flex: 1, marginRight: 8, paddingVertical: 12, backgroundColor: '#1B5E20', borderRadius: 10, alignItems: 'center' },
  primaryText: { color: '#fff', fontWeight: '700' },
  secondaryBtn: { flex: 1, marginLeft: 8, paddingVertical: 12, backgroundColor: '#fff', borderRadius: 10, borderWidth: 1, borderColor: '#C8E6C9', alignItems: 'center' },
  secondaryText: { color: '#1B5E20', fontWeight: '700' }
});

export default CertificateScreen;
