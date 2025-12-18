import React, { useState } from "react";
import { useScrollToTop } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  ToastAndroid,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { authButtonStyles } from "../styles/AuthButtons";
import { useAuth } from "../contexts/AuthContext";
import { useDonations } from "../contexts/DonationsContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import ScreenWrapper from "../components/ScreenWrapper";

const DonateScreen: React.FC = () => {
  const auth = useAuth();
  const { addDonation } = useDonations();
  const nav = useNavigation<NativeStackNavigationProp<any>>();
  const scrollRef = React.useRef<any>(null);
  useScrollToTop(scrollRef);

  const [form, setForm] = useState({
    name: auth.user?.name || "",
    occasion: "",
    treeType: "Neem",
    trees: "1",
    recipient: "",
    date: new Date().toISOString(),
    message: "",
    photo: null as string | null,
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [processing, setProcessing] = useState(false);

  if (!auth.isLoggedIn) {
    return (
      <ScreenWrapper scrollRef={scrollRef}>
        <Text style={styles.notLoggedInTitle}>
          Create a living memory—sponsor a tree today.
        </Text>
        <Text style={styles.notLoggedInText}>
          Log in to track certificates, locations, and impact.
        </Text>

        <View style={{ flexDirection: "row", marginTop: 14 }}>
          <TouchableOpacity
            style={[
              authButtonStyles.primaryButton,
              { flex: 1, marginRight: 8 },
            ]}
            onPress={() => nav.navigate("Login" as any)}
          >
            <Text style={authButtonStyles.primaryButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              authButtonStyles.secondaryButton,
              { flex: 1, marginLeft: 8 },
            ]}
            onPress={() => nav.navigate("Signup" as any)}
          >
            <Text style={authButtonStyles.secondaryButtonText}>Sign up</Text>
          </TouchableOpacity>
        </View>

        {/* Minimal form preview (disabled) */}
        <View style={styles.previewCard}>
          <Text style={styles.previewTitle}>Donation form preview</Text>
          <Text style={styles.previewText}>
            Name • Occasion • Quantity • Message
          </Text>
          <Text style={styles.previewNote}>
            Sign in to fill the form and submit your donation.
          </Text>
        </View>
      </ScreenWrapper>
    );
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setForm({ ...form, photo: result.assets[0].uri });
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setForm({ ...form, photo: result.assets[0].uri });
    }
  };

  const handleSubmit = async () => {
    setSubmitError("");
    const trees = Number(form.trees) || 1;
    if (trees <= 0) {
      setSubmitError("Please enter a valid number of trees");
      return;
    }
    if (!acceptedTerms) {
      setSubmitError("Please accept the Terms & Conditions to continue");
      return;
    }

    try {
      setProcessing(true);

      // Simulate payment flow (mock)
      await new Promise((res) => setTimeout(res, 1200));

      const payload = {
        occasion: form.occasion || "Donation",
        treeType: form.treeType,
        trees,
        recipient: form.recipient,
        date: form.date,
        message: form.message,
        photo: form.photo,
        donorName: form.name,
      };
      const donation = await addDonation(payload);

      if (donation) {
        const cert = {
          id: `CERT-${Date.now()}`,
          donationId: donation.id,
          name: form.name || auth.user?.name || "Supporter",
          trees,
        };
        if (Platform.OS === "android")
          ToastAndroid.show(
            "Payment successful! Generating certificate…",
            ToastAndroid.SHORT,
          );
        else
          Alert.alert("Success", "Payment successful! Generating certificate…");

        nav.navigate("DonationSuccess" as any, {
          donationId: donation.id,
          certificate: cert,
        });
      } else {
        setSubmitError("Failed to record donation. Please try again.");
      }
    } catch (err) {
      setSubmitError("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ScreenWrapper scrollRef={scrollRef}>
      <Text style={styles.headerEmoji}>🎁</Text>
      <Text style={styles.title}>Plant a Tree</Text>
      <Text style={styles.subtitle}>Create lasting environmental impact</Text>
      {/* Header */}
      <View style={styles.headerSection}>
        <Text style={styles.headerEmoji}>🎁</Text>
        <Text style={styles.title}>Plant a Tree</Text>
        <Text style={styles.subtitle}>Create lasting environmental impact</Text>
      </View>

      {/* Form Fields */}
      <View style={styles.formSection}>
        <Text style={styles.fieldLabel}>Occasion</Text>
        <TextInput
          placeholder="e.g., Birthday, Anniversary, Memorial"
          style={styles.input}
          value={form.occasion}
          onChangeText={(t) => setForm({ ...form, occasion: t })}
          placeholderTextColor="#AAA"
        />

        <Text style={styles.fieldLabel}>Your Name (for certificate)</Text>
        <TextInput
          placeholder="How should the certificate be addressed?"
          style={styles.input}
          value={form.name}
          onChangeText={(t) => setForm({ ...form, name: t })}
          placeholderTextColor="#AAA"
        />

        <Text style={styles.fieldLabel}>Tree Type</Text>
        <TextInput
          placeholder="e.g., Neem, Oak, Mango"
          style={styles.input}
          value={form.treeType}
          onChangeText={(t) => setForm({ ...form, treeType: t })}
          placeholderTextColor="#AAA"
        />

        <Text style={styles.fieldLabel}>Number of Trees</Text>
        <TextInput
          placeholder="1"
          keyboardType="number-pad"
          style={styles.input}
          value={form.trees}
          onChangeText={(t) => setForm({ ...form, trees: t })}
          placeholderTextColor="#AAA"
        />

        <Text style={styles.fieldLabel}>Recipient Name (Optional)</Text>
        <TextInput
          placeholder="Who is this for?"
          style={styles.input}
          value={form.recipient}
          onChangeText={(t) => setForm({ ...form, recipient: t })}
          placeholderTextColor="#AAA"
        />

        <Text style={styles.fieldLabel}>Message (Optional)</Text>
        <TextInput
          placeholder="Add a personal message..."
          style={[styles.input, { height: 100, textAlignVertical: "top" }]}
          value={form.message}
          multiline
          onChangeText={(t) => setForm({ ...form, message: t })}
          placeholderTextColor="#AAA"
        />

        {/* Photo Upload */}
        <Text style={styles.fieldLabel}>Photo (Optional)</Text>
        {form.photo ? (
          <View style={styles.photoPreview}>
            <Image source={{ uri: form.photo }} style={styles.photoImage} />
            <TouchableOpacity
              style={styles.removePhotoBtn}
              onPress={() => setForm({ ...form, photo: null })}
            >
              <Text style={styles.removePhotoText}>✕ Remove</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.photoOptions}>
            <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
              <Text style={styles.photoIcon}>📷</Text>
              <Text style={styles.photoButtonText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
              <Text style={styles.photoIcon}>🖼️</Text>
              <Text style={styles.photoButtonText}>Choose Photo</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Impact Preview */}
        <View style={styles.impactCard}>
          <Text style={styles.impactTitle}>Your Impact</Text>
          <View style={styles.impactRow}>
            <View style={styles.impactItem}>
              <Text style={styles.impactEmoji}>🌳</Text>
              <Text style={styles.impactValue}>{form.trees}</Text>
              <Text style={styles.impactLabel}>Trees</Text>
            </View>
            <View style={styles.impactItem}>
              <Text style={styles.impactEmoji}>💨</Text>
              <Text style={styles.impactValue}>
                {(Number(form.trees) * 260).toLocaleString()}
              </Text>
              <Text style={styles.impactLabel}>Lbs O₂/yr</Text>
            </View>
            <View style={styles.impactItem}>
              <Text style={styles.impactEmoji}>🔄</Text>
              <Text style={styles.impactValue}>
                {(Number(form.trees) * 48).toLocaleString()}
              </Text>
              <Text style={styles.impactLabel}>Lbs CO₂</Text>
            </View>
          </View>
        </View>

        {submitError ? (
          <Text style={{ color: "#B00020", marginTop: 12 }}>{submitError}</Text>
        ) : null}

        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", marginTop: 16 }}
          onPress={() => setAcceptedTerms(!acceptedTerms)}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 4,
              borderWidth: 1,
              borderColor: "#4CAF50",
              backgroundColor: acceptedTerms ? "#4CAF50" : "#fff",
              marginRight: 10,
            }}
          />
          <Text style={{ color: "#333" }}>
            I agree to the{" "}
            <Text
              style={{ color: "#1B5E20", fontWeight: "700" }}
              onPress={() => nav.navigate("Terms" as any)}
            >
              Terms & Conditions
            </Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={!acceptedTerms || processing ? undefined : handleSubmit}
          activeOpacity={0.8}
          disabled={!acceptedTerms || processing}
          style={{
            marginTop: 20,
            opacity: !acceptedTerms || processing ? 0.6 : 1,
            backgroundColor: "#1B5E20",
            paddingVertical: 14,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "700" }}>
            {processing ? "Processing…" : "🎉 Submit Donation"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#E8F5E9" },
  container: { paddingBottom: 20 },
  notLoggedInTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1B5E20",
    marginBottom: 8,
  },
  notLoggedInText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    marginBottom: 4,
  },
  previewCard: {
    marginTop: 18,
    padding: 12,
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1B5E20",
    marginBottom: 6,
  },
  previewText: { fontSize: 13, color: "#444" },
  previewNote: { fontSize: 12, color: "#777", marginTop: 8 },
  headerSection: {
    alignItems: "center",
    paddingVertical: 32,
    backgroundColor: "#C8E6C9",
  },
  headerEmoji: { fontSize: 60 },
  title: { fontSize: 28, fontWeight: "800", color: "#1B5E20", marginTop: 12 },
  subtitle: { fontSize: 14, color: "#2E7D32", marginTop: 4 },
  formSection: { paddingHorizontal: 16, paddingTop: 20 },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1B5E20",
    marginTop: 16,
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#C8E6C9",
  },
  photoOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
  },
  photoButton: {
    width: "45%",
    paddingVertical: 12,
    backgroundColor: "#F1F8E9",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#4CAF50",
    alignItems: "center",
  },
  photoIcon: { fontSize: 32 },
  photoButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1B5E20",
    marginTop: 6,
  },
  photoPreview: { marginTop: 12, alignItems: "center" },
  photoImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  removePhotoBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#FF6B6B",
    borderRadius: 8,
  },
  removePhotoText: { color: "#fff", fontWeight: "600", fontSize: 12 },
  impactCard: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "#F1F8E9",
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  impactTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1B5E20",
    marginBottom: 12,
  },
  impactRow: { flexDirection: "row", justifyContent: "space-around" },
  impactItem: { alignItems: "center" },
  impactEmoji: { fontSize: 32 },
  impactValue: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1B5E20",
    marginTop: 6,
  },
  impactLabel: { fontSize: 11, color: "#666", marginTop: 2 },
});

export default DonateScreen;
