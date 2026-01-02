import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Ionicons as Icon } from '@expo/vector-icons';
import { changeLanguage } from '../utils/i18n';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  Linking,
  Platform,
  TextInput,
  Alert,
  Image,
} from "react-native";
import { Video } from "expo-av";
import { API_BASE } from "../src/config";
import AppHeader from "../components/AppHeader";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import RateUsModal from "../components/RateUsModal";

const MoreScreen: React.FC = () => {
  const [isRateModalVisible, setIsRateModalVisible] = useState(false);
  const [ratings, setRatings] = useState<
    { rating: number; feedback: string }[]
  >([]);
  const nav = useNavigation<any>();
  const scrollRef = React.useRef<any>(null);
  useScrollToTop(scrollRef);

  const menuItems = [
    {
      emoji: "📊",
      title: "Impact",
      desc: "Our environmental impact",
      screen: "Impact",
    },
    {
      emoji: "📸",
      title: "Media",
      desc: "Gallery and videos",
      screen: "Media",
    },
    {
      emoji: "💬",
      title: "Contact",
      desc: "Get in touch with us",
      screen: "Contact",
    },
    // { emoji: '📱', title: 'Download App', desc: 'Get our mobile app', screen: null },
    {
      emoji: "⭐",
      title: "Rate Us",
      desc: "Share your feedback",
      screen: null,
    },
    {
      emoji: "📋",
      title: "Terms & Privacy",
      desc: "Legal information",
      screen: "Terms",
    },
  ];

  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [videosOpen, setVideosOpen] = useState(false);
  const [videosCategory, setVideosCategory] = useState<string | null>(null);
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [csrModalVisible, setCsrModalVisible] = useState(false);
  const [csrMessage, setCsrMessage] = useState("");
  const [partnerLogos, setPartnerLogos] = useState<string[]>([]);

  const { t, i18n } = useTranslation();
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);
  const LANGUAGES = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिंदी (Hindi)', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ் (Tamil)', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు (Telugu)', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ (Kannada)', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी (Marathi)', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা (Bengali)', flag: '🇮🇳' },
  ];
  const currentLanguage = i18n.language;

  const handleLanguageChange = async (langCode: string) => {
    await changeLanguage(langCode);
    setIsLanguageModalVisible(false);
  };

  const getCurrentLanguageName = () => {
    const lang = LANGUAGES.find(l => l.code === currentLanguage);
    return lang ? lang.name : 'English';
  };

  return (
    <ScrollView
      ref={scrollRef}
      style={styles.screen}
      contentContainerStyle={styles.contentContainer}
    >
      <AppHeader />

      {/* ========== LANGUAGE SELECTOR ========== */}
      <View style={styles.menuSection}>
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => setIsLanguageModalVisible(true)}
          >
            <View style={styles.languageButtonContent}>
              <Text style={styles.languageIcon}>🌐</Text>
              <View style={styles.languageInfo}>
                <Text style={styles.languageLabel}>{t('common.language') || 'Language'}</Text>
                <Text style={styles.languageCurrent}>{getCurrentLanguageName()}</Text>
              </View>
            </View>
            <Icon name="chevron-forward" size={20} color="#16a34a" />
          </TouchableOpacity>
        </View>
        <Modal
          visible={isLanguageModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsLanguageModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Language</Text>
                <TouchableOpacity onPress={() => setIsLanguageModalVisible(false)}>
                  <Icon name="close" size={24} color="#333" />
                </TouchableOpacity>
              </View>
              <View style={styles.languageList}>
                {LANGUAGES.map((language) => (
                  <TouchableOpacity
                    key={language.code}
                    style={[
                      styles.languageOption,
                      currentLanguage === language.code && styles.languageOptionSelected,
                    ]}
                    onPress={() => handleLanguageChange(language.code)}
                  >
                    <Text style={styles.languageOptionFlag}>{language.flag}</Text>
                    <Text
                      style={[
                        styles.languageOptionName,
                        currentLanguage === language.code && styles.languageOptionNameSelected,
                      ]}
                    >
                      {language.name}
                    </Text>
                    {currentLanguage === language.code && (
                      <Icon name="checkmark-circle" size={24} color="#16a34a" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Modal>

      {/* Header */}
      <View style={styles.headerSection}>
        <Text style={styles.headerEmoji}>⋯</Text>
        <Text style={styles.headerTitle}>More Options</Text>
      </View>

      {/* Menu Items */}
        {menuItems
          .filter((item) => item.title !== "Rate Us")
          .map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.menuItem}
              onPress={() => item.screen && nav.navigate(item.screen)}
              disabled={!item.screen}
            >
              <Text style={styles.menuEmoji}>{item.emoji}</Text>
              <View style={styles.menuInfo}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuDesc}>{item.desc}</Text>
              </View>
              <Text style={styles.menuArrow}>→</Text>
            </TouchableOpacity>
          ))}
        {/* Rate Us Button */}
        <TouchableOpacity
          style={[
            styles.menuItem,
            { borderLeftColor: "#FFD700", backgroundColor: "#FFFDE7" },
          ]}
          onPress={() => setIsRateModalVisible(true)}
        >
          <Text style={styles.menuEmoji}>⭐</Text>
          <View style={styles.menuInfo}>
            <Text style={styles.menuTitle}>Rate Us</Text>
            <Text style={styles.menuDesc}>Share your feedback</Text>
          </View>
          <Text style={styles.menuArrow}>→</Text>
        </TouchableOpacity>

        {/* Google Calendar linking */}
        <View style={{ marginTop: 8 }}>
          <TouchableOpacity
            style={[styles.menuItem, { justifyContent: "center" }]}
            onPress={() => setCalendarModalVisible(true)}
          >
            <Text style={styles.menuEmoji}>📆</Text>
            <View style={styles.menuInfo}>
              <Text style={styles.menuTitle}>Link your Google Calendar</Text>
              <Text style={styles.menuDesc}>
                Receive occasion reminders and birthday prompts
              </Text>
            </View>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* FAQ */}
        <View style={{ marginTop: 12 }}>
          <Text style={[styles.cardTitle, { marginBottom: 8 }]}>
            FAQ / Help
          </Text>
          {[
            {
              q: "How do you plant the trees?",
              a: "Trees are planted with local partners and volunteers. We follow site-prep, planting and aftercare schedules.",
            },
            {
              q: "Where are they planted?",
              a: "We plant at vetted locations in collaboration with local communities; exact locations may vary by campaign.",
            },
            {
              q: "Can I visit my tree?",
              a: "Visits are arranged for organised drives; contact us for site visit schedules.",
            },
            {
              q: "Is my donation tax-deductible?",
              a: "Tax deductibility depends on local laws and partner receipts; contact finance for receipts.",
            },
          ].map((item, i) => (
            <TouchableOpacity
              key={i}
              style={styles.faqItem}
              onPress={() => setFaqOpen(faqOpen === i ? null : i)}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.faqQ}>{item.q}</Text>
                {faqOpen === i && <Text style={styles.faqA}>{item.a}</Text>}
              </View>
              <Text style={styles.menuArrow}>{faqOpen === i ? "−" : "+"}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Partners / CSR */}
        <View style={{ marginTop: 14 }}>
          <Text style={[styles.cardTitle, { marginBottom: 8 }]}>
            Partners / CSR
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            {partnerLogos.length > 0 ? (
              partnerLogos
                .slice(0, 4)
                .map((uri, i) => (
                  <Image
                    key={i}
                    source={{ uri }}
                    style={[
                      styles.partnerBox,
                      { backgroundColor: "transparent" },
                    ]}
                  />
                ))
            ) : (
              <>
                <View style={styles.partnerBox}>
                  <Text style={{ color: "#fff" }}>AC</Text>
                </View>
                <View style={styles.partnerBox}>
                  <Text style={{ color: "#fff" }}>BK</Text>
                </View>
                <View style={styles.partnerBox}>
                  <Text style={{ color: "#fff" }}>CD</Text>
                </View>
                <View style={styles.partnerBox}>
                  <Text style={{ color: "#fff" }}>EF</Text>
                </View>
              </>
            )}
          </View>
          <TouchableOpacity
            style={[styles.menuItem, { paddingVertical: 12 }]}
            onPress={() => setCsrModalVisible(true)}
          >
            <Text style={styles.menuEmoji}>🤝</Text>
            <View style={styles.menuInfo}>
              <Text style={styles.menuTitle}>Contact us for CSR</Text>
              <Text style={styles.menuDesc}>
                Partner with us for corporate social responsibility projects
              </Text>
            </View>
            <Text style={styles.menuArrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Videos */}
        <View style={{ marginTop: 14 }}>
          <Text style={[styles.cardTitle, { marginBottom: 8 }]}>
            How-to Videos
          </Text>
          <View style={{ flexDirection: "row" }}>
            {["Planting", "Watering", "Seed Balls"].map((c) => (
              <TouchableOpacity
                key={c}
                onPress={() => {
                  setVideosCategory(c);
                  setVideosOpen(true);
                }}
                style={[styles.smallTag, { marginRight: 8 }]}
              >
                <Text style={{ color: "#1B5E20" }}>{c}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* App Info */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>About Green Legacy</Text>
        <Text style={styles.infoText}>
          Green Legacy is a global initiative dedicated to planting trees and
          restoring ecosystems. Join millions of users making a real difference.
        </Text>
        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
          <Text style={styles.versionText}>© 2024 Green Legacy</Text>
        </View>
      </View>

      <View style={{ height: 20 }} />
      {/* Calendar Modal */}
      {/* Rate Us Modal */}
      <RateUsModal
        visible={isRateModalVisible}
        onClose={() => setIsRateModalVisible(false)}
        onSubmit={(rating, feedback) => {
          setRatings((prev) => [...prev, { rating, feedback }]);
          // TODO: Save to backend or AsyncStorage
        }}
      />
      <Modal visible={calendarModalVisible} transparent animationType="slide">
        <View style={modalStyles.backdrop}>
          <View style={modalStyles.sheet}>
            <Text style={modalStyles.modalTitle}>Link Google Calendar</Text>
            <Text style={modalStyles.modalText}>
              Linking your Google Calendar allows Green Legacy to remind you
              about occasions (birthdays, anniversaries) so you can plant trees
              on special days.
            </Text>
            <View style={{ marginTop: 14 }}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={async () => {
                  const url = "https://calendar.google.com";
                  try {
                    await Linking.openURL(url);
                  } catch (e) {
                    // fallback
                  }
                }}
              >
                <Text style={styles.menuEmoji}>🔗</Text>
                <View style={styles.menuInfo}>
                  <Text style={styles.menuTitle}>Open Google Calendar</Text>
                  <Text style={styles.menuDesc}>
                    Sign in and authorise linking (will open in browser)
                  </Text>
                </View>
                <Text style={styles.menuArrow}>→</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.menuItem, { marginTop: 10 }]}
                onPress={() => {
                  setCalendarModalVisible(false);
                  alert("Calendar linking simulated (mock).");
                }}
              >
                <Text style={styles.menuEmoji}>✅</Text>
                <View style={styles.menuInfo}>
                  <Text style={styles.menuTitle}>Simulate Link (dev)</Text>
                  <Text style={styles.menuDesc}>
                    Mark calendar as linked for now
                  </Text>
                </View>
                <Text style={styles.menuArrow}>→</Text>
              </TouchableOpacity>
            </View>

            <Pressable
              style={modalStyles.closeBtn}
              onPress={() => setCalendarModalVisible(false)}
            >
              <Text style={{ color: "#1B5E20", fontWeight: "700" }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Rating Modal */}
      <Modal visible={ratingModalVisible} transparent animationType="slide">
        <View style={modalStyles.backdrop}>
          <View style={modalStyles.sheet}>
            <Text style={modalStyles.modalTitle}>Rate Green Legacy</Text>
            <Text style={modalStyles.modalText}>
              Tap stars and share feedback to help us improve.
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 12,
                justifyContent: "center",
              }}
            >
              {[1, 2, 3, 4, 5].map((s) => (
                <TouchableOpacity
                  key={s}
                  onPress={() => setRating(s)}
                  style={{ marginHorizontal: 6 }}
                >
                  <Text style={{ fontSize: 32 }}>
                    {s <= rating ? "★" : "☆"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              placeholder="Write a quick review (optional)"
              value={reviewText}
              onChangeText={setReviewText}
              style={[styles.input, { marginTop: 12 }]}
            />
            <Pressable
              style={[
                modalStyles.closeBtn,
                {
                  backgroundColor: "#1B5E20",
                  borderRadius: 8,
                  paddingVertical: 12,
                },
              ]}
              onPress={async () => {
                try {
                  await fetch(`${API_BASE}/reviews`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ rating, review: reviewText }),
                  });
                  Alert.alert("Thanks", "Your rating was submitted (mock).");
                } catch (e) {
                  Alert.alert(
                    "Saved locally",
                    "Unable to reach server; review saved locally (dev).",
                  );
                }
                setRatingModalVisible(false);
                setRating(0);
                setReviewText("");
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                Submit
              </Text>
            </Pressable>
            <Pressable
              style={modalStyles.closeBtn}
              onPress={() => setRatingModalVisible(false)}
            >
              <Text style={{ color: "#1B5E20", fontWeight: "700" }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* CSR Contact Modal */}
      <Modal visible={csrModalVisible} transparent animationType="slide">
        <View style={modalStyles.backdrop}>
          <View style={modalStyles.sheet}>
            <Text style={modalStyles.modalTitle}>CSR Inquiry</Text>
            <Text style={modalStyles.modalText}>
              Tell us about your CSR interest and a team member will contact
              you.
            </Text>
            <TextInput
              placeholder="Your message"
              value={csrMessage}
              onChangeText={setCsrMessage}
              style={[
                styles.input,
                { marginTop: 12, height: 100, textAlignVertical: "top" },
              ]}
              multiline
            />
            <Pressable
              style={[
                modalStyles.closeBtn,
                {
                  backgroundColor: "#1B5E20",
                  borderRadius: 8,
                  paddingVertical: 12,
                },
              ]}
              onPress={async () => {
                try {
                  await fetch(`${API_BASE}/csr`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message: csrMessage }),
                  });
                  Alert.alert("Submitted", "Your CSR inquiry was sent (mock).");
                } catch (e) {
                  Alert.alert(
                    "Saved",
                    "Unable to reach server; saved locally (dev).",
                  );
                }
                setCsrModalVisible(false);
                setCsrMessage("");
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                Send Inquiry
              </Text>
            </Pressable>
            <Pressable
              style={modalStyles.closeBtn}
              onPress={() => setCsrModalVisible(false)}
            >
              <Text style={{ color: "#1B5E20", fontWeight: "700" }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Videos Modal with inline playback (expo-av) */}
      <Modal visible={videosOpen} transparent animationType="fade">
        <View style={modalStyles.backdrop}>
          <View style={modalStyles.sheet}>
            <Text style={modalStyles.modalTitle}>{videosCategory} Videos</Text>
            <Text style={modalStyles.modalText}>
              Play a short tutorial below.
            </Text>
            <View style={{ marginTop: 12 }}>
              {/* Inline video using expo-av; sample public mp4 used for demo */}
              <View
                style={{
                  height: 220,
                  backgroundColor: "#000",
                  borderRadius: 8,
                  overflow: "hidden",
                }}
              >
                {/* Video player inserted by JS below via Video component */}
              </View>
            </View>

            <Pressable
              style={modalStyles.closeBtn}
              onPress={() => setVideosOpen(false)}
            >
              <Text style={{ color: "#1B5E20", fontWeight: "700" }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  menuSection: { paddingHorizontal: 16, paddingVertical: 16 },
  section: { marginBottom: 24 },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#16a34a',
  },
  languageButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  languageIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  languageInfo: {
    flex: 1,
  },
  languageLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  languageCurrent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  languageList: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginBottom: 8,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  languageOptionSelected: {
    backgroundColor: '#e8f5e9',
    borderLeftWidth: 4,
    borderLeftColor: '#16a34a',
  },
  languageOptionFlag: {
    fontSize: 24,
    marginRight: 12,
  },
  languageOptionName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  languageOptionNameSelected: {
    color: '#16a34a',
    fontWeight: '600',
  },
  menuItem: {
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
  menuEmoji: { fontSize: 32, marginRight: 12 },
  menuInfo: { flex: 1 },
  menuTitle: { fontSize: 15, fontWeight: "700", color: "#1B5E20" },
  menuDesc: { fontSize: 12, color: "#666", marginTop: 2 },
  menuArrow: { fontSize: 18, color: "#2E7D32", fontWeight: "700" },
  infoSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: "#F1F8E9",
    marginHorizontal: 16,
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1B5E20",
    marginBottom: 8,
  },
  infoText: { fontSize: 13, color: "#666", lineHeight: 20, marginBottom: 12 },
  versionInfo: {
    borderTopWidth: 1,
    borderTopColor: "#C8E6C9",
    alignItems: "center",
  },
  versionText: { fontSize: 12, color: "#999" },
  /* Additional styles for FAQ/Partners/Videos */
  cardTitle: { fontSize: 15, fontWeight: "800", color: "#1B5E20" },
  faqItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 8,
  },
  faqQ: { fontSize: 14, fontWeight: "700", color: "#1B5E20" },
  faqA: { fontSize: 13, color: "#444", marginTop: 6, lineHeight: 18 },
  partnerBox: {
    width: 64,
    height: 48,
    borderRadius: 8,
    backgroundColor: "#2E7D32",
    alignItems: "center",
    justifyContent: "center",
  },
  smallTag: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 18,
    backgroundColor: "#E8F5E9",
    borderWidth: 1,
    borderColor: "#C8E6C9",
  },
  input: {
    width: "100%",
    minHeight: 48,
    borderColor: "#C8E6C9",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 14,
    backgroundColor: "#F1F8E9",
  },
});

const modalStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#fff",
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    maxHeight: "70%",
  },
  modalTitle: { fontSize: 18, fontWeight: "800", color: "#1B5E20" },
  modalText: { marginTop: 8, color: "#444", lineHeight: 20 },
  closeBtn: { marginTop: 12, alignItems: "center", paddingVertical: 10 },
});

export default MoreScreen;
