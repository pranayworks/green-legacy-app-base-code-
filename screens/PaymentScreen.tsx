import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { StripeProvider, CardField } from "@stripe/stripe-react-native";
import AnimatedButton from "../components/AnimatedButton";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";

interface PaymentScreenProps {
  route?: any;
  navigation?: any;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({
  route,
  navigation: nav,
}) => {
  const [cardDetails, setCardDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");

  const treeCount = route?.params?.trees || 1;
  const totalAmount = Number(amount) * treeCount;

  const handlePayment = async () => {
    if (!cardDetails?.complete) {
      alert("Please complete card details");
      return;
    }
    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setLoading(true);
    try {
      // This is a mock implementation
      // In production, you would:
      // 1. Call your backend to create a payment intent
      // 2. Use the Stripe SDK to confirm the payment
      // 3. Handle success/failure responses

      console.log("Processing payment:", {
        amount: totalAmount,
        currency: "USD",
        email,
        trees: treeCount,
      });

      // Mock success after 2 seconds
      setTimeout(() => {
        alert("Payment successful!");
        nav?.navigate("DonationSuccess", {
          donationId: "payment_" + Date.now(),
        });
      }, 2000);
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StripeProvider publishableKey="pk_test_YOUR_KEY_HERE">
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.contentContainer}
      >
        <AppHeader />

        {/* Header */}
        <View style={styles.headerSection}>
          <Text style={styles.headerEmoji}>💳</Text>
          <Text style={styles.headerTitle}>Secure Payment</Text>
          <Text style={styles.headerSubtitle}>Plant {treeCount} tree(s)</Text>
        </View>

        {/* Order Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Trees:</Text>
            <Text style={styles.summaryValue}>{treeCount}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Price per tree:</Text>
            <Text style={styles.summaryValue}>${amount || "0.00"}</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>${totalAmount.toFixed(2)}</Text>
          </View>
        </View>

        {/* Payment Form */}
        <View style={styles.formSection}>
          <Text style={styles.fieldLabel}>Email Address</Text>
          <TextInput
            placeholder="your@email.com"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor="#AAA"
          />

          <Text style={styles.fieldLabel}>Amount per Tree ($)</Text>
          <TextInput
            placeholder="10.00"
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            placeholderTextColor="#AAA"
          />

          <Text style={styles.fieldLabel}>Card Details</Text>
          <View style={styles.cardContainer}>
            <CardField
              postalCodeEnabled={true}
              placeholders={{
                number: "4242 4242 4242 4242",
              }}
              cardStyle={{
                backgroundColor: "#FFFFFF",
                textColor: "#000000",
              }}
              style={{ height: 50, marginVertical: 30 }}
              onCardChange={(cardDetails) => setCardDetails(cardDetails)}
            />
          </View>

          {/* Security Info */}
          <View style={styles.securityInfo}>
            <Text style={styles.securityIcon}>🔒</Text>
            <Text style={styles.securityText}>
              Your payment information is encrypted and secure
            </Text>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.payButton, loading && styles.payButtonDisabled]}
            onPress={handlePayment}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.payButtonText}>
                💳 Pay ${totalAmount.toFixed(2)}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => nav?.goBack()}
            style={styles.cancelButton}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </StripeProvider>
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
  summaryCard: {
    marginHorizontal: 16,
    marginVertical: 20,
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  summaryLabel: { fontSize: 14, color: "#666" },
  summaryValue: { fontSize: 14, fontWeight: "600", color: "#1B5E20" },
  totalRow: { borderTopWidth: 1, borderTopColor: "#E0E0E0", paddingTop: 12 },
  totalLabel: { fontSize: 16, fontWeight: "700", color: "#1B5E20" },
  totalValue: { fontSize: 18, fontWeight: "800", color: "#2E7D32" },
  formSection: { paddingHorizontal: 16 },
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
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#C8E6C9",
    marginVertical: 12,
  },
  securityInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "#F1F8E9",
    borderRadius: 8,
  },
  securityIcon: { fontSize: 20, marginRight: 8 },
  securityText: { fontSize: 12, color: "#666", flex: 1 },
  payButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  payButtonDisabled: { opacity: 0.6 },
  payButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  cancelButton: {
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    alignItems: "center",
  },
  cancelButtonText: { color: "#666", fontWeight: "600", fontSize: 14 },
});

export default PaymentScreen;
