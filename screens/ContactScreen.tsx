import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";
import AppHeader from "../components/AppHeader";

const ContactScreen: React.FC = () => {
  const contactLinks = [
    {
      emoji: "📧",
      title: "Email",
      value: "hello@greenlegacy.org",
      link: "mailto:hello@greenlegacy.org",
    },
    {
      emoji: "📱",
      title: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      emoji: "🌐",
      title: "Website",
      value: "www.greenlegacy.org",
      link: "https://www.greenlegacy.org",
    },
    {
      emoji: "📍",
      title: "Address",
      value: "123 Green Street, Earth 🌍",
      link: null,
    },
  ];

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.contentContainer}
    >
      <AppHeader />

      {/* Header */}
      <View style={styles.headerSection}>
        <Text style={styles.headerEmoji}>💬</Text>
        <Text style={styles.headerTitle}>Get in Touch</Text>
        <Text style={styles.headerSubtitle}>We'd love to hear from you</Text>
      </View>

      {/* Contact Info */}
      <View style={styles.contactSection}>
        {contactLinks.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.contactCard}
            onPress={() => item.link && Linking.openURL(item.link)}
            disabled={!item.link}
          >
            <Text style={styles.contactEmoji}>{item.emoji}</Text>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>{item.title}</Text>
              <Text style={styles.contactValue}>{item.value}</Text>
            </View>
            {item.link && <Text style={styles.contactArrow}>→</Text>}
          </TouchableOpacity>
        ))}
      </View>

      {/* Social Media */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Follow Us</Text>
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialEmoji}>📘</Text>
            <Text style={styles.socialLabel}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialEmoji}>📷</Text>
            <Text style={styles.socialLabel}>Instagram</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialEmoji}>🐦</Text>
            <Text style={styles.socialLabel}>Twitter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialEmoji}>🎥</Text>
            <Text style={styles.socialLabel}>YouTube</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* FAQ Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Help</Text>
        <View style={styles.faqItem}>
          <Text style={styles.faqQ}>❓ How do I report a bug?</Text>
          <Text style={styles.faqA}>
            Email us at support@greenlegacy.org with details
          </Text>
        </View>
        <View style={styles.faqItem}>
          <Text style={styles.faqQ}>❓ How do donations work?</Text>
          <Text style={styles.faqA}>
            Your donation supports real tree planting projects worldwide
          </Text>
        </View>
        <View style={styles.faqItem}>
          <Text style={styles.faqQ}>❓ Can I volunteer?</Text>
          <Text style={styles.faqA}>
            Yes! Contact us to learn about volunteer opportunities
          </Text>
        </View>
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#E8F5E9" },
  contentContainer: { paddingBottom: 20 },
  headerSection: {
    alignItems: "center",
    paddingVertical: 32,
    backgroundColor: "#C8E6C9",
  },
  headerEmoji: { fontSize: 60 },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1B5E20",
    marginTop: 12,
  },
  headerSubtitle: { fontSize: 14, color: "#2E7D32", marginTop: 4 },
  contactSection: { paddingHorizontal: 16, paddingVertical: 16 },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  contactEmoji: { fontSize: 32, marginRight: 12 },
  contactInfo: { flex: 1 },
  contactTitle: { fontSize: 14, fontWeight: "700", color: "#1B5E20" },
  contactValue: { fontSize: 13, color: "#666", marginTop: 2 },
  contactArrow: { fontSize: 18, color: "#2E7D32", fontWeight: "700" },
  section: { paddingHorizontal: 16, paddingVertical: 12 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1B5E20",
    marginBottom: 12,
  },
  socialRow: { flexDirection: "row", justifyContent: "space-between" },
  socialButton: {
    width: "23%",
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C8E6C9",
  },
  socialEmoji: { fontSize: 28 },
  socialLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#1B5E20",
    marginTop: 4,
  },
  faqItem: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "#F1F8E9",
    borderRadius: 10,
    marginBottom: 10,
  },
  faqQ: { fontSize: 14, fontWeight: "700", color: "#1B5E20" },
  faqA: { fontSize: 12, color: "#666", marginTop: 6, lineHeight: 18 },
});

export default ContactScreen;
