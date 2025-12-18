import React from "react";
import { Text, StyleSheet } from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";

const TermsScreen: React.FC = () => (
  <ScreenWrapper>
    <Text style={styles.title}>Terms & Conditions</Text>
    <Text style={styles.p}>
      Open the TermsScreen component. Replace its content with a simple,
      readable Terms & Conditions page for the Green Legacy NGO app. Use
      headings and short paragraphs, not legal language. Structure: 1) Title:
      “Terms of Use” 2) Section: “About Green Legacy” - Explain that Green
      Legacy is a non‑profit initiative that lets people sponsor tree
      plantations, receive digital certificates, and track basic impact of their
      contributions. 3) Section: “Using this app” - State that users should
      provide correct information, use the app only for lawful and genuine
      donations, and are responsible for keeping their login details safe. -
      Mention that they should tell Green Legacy if they notice any unauthorised
      use of their account. 4) Section: “Donations and services” - Explain that
      donations support tree‑planting and related environmental projects run by
      Green Legacy and its partners. - Clarify that the team will try its best
      to plant and care for trees, but cannot guarantee a specific planting
      location for each donor, or the survival of every individual tree. -
      Mention that payment processing is handled through third‑party gateways.
      5) Section: “Changes to the app and terms” - Say that features or these
      terms may be updated from time to time. - Using the app after changes
      means the user accepts the latest version shown in the app. 6) Section:
      “Governing law and contact” - State that these terms are governed by the
      laws of India. - Add a simple contact line, for example: “If you have
      questions about these Terms, please email us at
      greenlegacy.org@gmail.com.” Layout: - Use a ScrollView with padding. - Use
      clear headings (e.g., larger, bold text) and short paragraphs for mobile
      readability. .
    </Text>
    <Text style={styles.p}>
      Use of app, Donations, No guarantee, Accounts, Content, Changes & Indian
      law apply.
    </Text>
  </ScreenWrapper>
);

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: "800", color: "#1B5E20", marginBottom: 8 },
  p: { color: "#444", marginBottom: 8 },
});

export default TermsScreen;
