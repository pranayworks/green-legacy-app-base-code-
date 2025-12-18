import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";

const API_BASE = (() => {
  try {
    const dbg =
      (Constants as any).manifest?.debuggerHost ||
      (Constants as any).manifest2?.debuggerHost;
    if (dbg && typeof dbg === "string") {
      const host = dbg.split(":")[0];
      return `http://${host}:4000/api`;
    }
  } catch (e) {}
  return "http://localhost:4000/api";
})();

const CSRForm = () => {
  const [company, setCompany] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!company || !contactName || !email) {
      Alert.alert(
        "Please fill required fields",
        "Company, contact name and email are required.",
      );
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/involvement/csr`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, contactName, email, phone, message }),
      });
      if (!res.ok) throw new Error("Server error");
      Alert.alert(
        "Thanks!",
        "Your enquiry has been submitted. We will reach out with partnership options.",
      );
      setCompany("");
      setContactName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err) {
      console.warn(err);
      Alert.alert(
        "Submission failed",
        "Unable to send your enquiry. Please try again later.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>CSR Partnership</Text>
      <Text style={styles.blurb}>
        Interested in partnering? Fill this form and we'll reach out to discuss
        options for employee volunteering, giving, or matched donations.
      </Text>

      <TextInput
        value={company}
        onChangeText={setCompany}
        placeholder="Company name *"
        style={styles.input}
      />
      <TextInput
        value={contactName}
        onChangeText={setContactName}
        placeholder="Contact person *"
        style={styles.input}
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Business email *"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone"
        keyboardType="phone-pad"
        style={styles.input}
      />
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Message / partnership ideas"
        style={[styles.input, { height: 120 }]}
        multiline
      />

      <TouchableOpacity
        style={styles.submitBtn}
        onPress={submit}
        disabled={loading}
      >
        <Text style={styles.submitText}>
          {loading ? "Submitting…" : "Contact Us"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#F6FFF7", flexGrow: 1 },
  title: { fontSize: 20, fontWeight: "800", color: "#1B5E20", marginBottom: 8 },
  blurb: { color: "#4B4B4B", marginBottom: 12 },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E6F4EA",
    marginBottom: 12,
  },
  submitBtn: {
    backgroundColor: "#2E8B57",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  submitText: { color: "#fff", fontWeight: "700" },
});

export default CSRForm;
