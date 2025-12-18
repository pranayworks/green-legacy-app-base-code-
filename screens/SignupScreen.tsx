
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

const SignupScreen: React.FC = () => {
  const auth = useAuth();
  const navigation = useNavigation<any>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert("Please enter email and password");
      return;
    }
    setLoading(true);
    try {
      await auth.signupWithCredentials(email.trim(), password, {
        name: name || undefined,
        phone: phone || undefined,
        age: age ? Number(age) : undefined,
      });
      Alert.alert("Welcome", `Welcome ${auth.user?.name || ""}`);
      navigation.navigate("Main");
    } catch (err) {
      console.warn("Signup error:", err);
      Alert.alert("Signup failed", "Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* LEFT PANEL */}
      <View style={styles.leftPanel}>
        <Text style={styles.leftTitle}>Already have an account?</Text>
        <Text style={styles.leftSubtitle}>
          Log in to track your impact, manage your donations, and grow your legacy with Green Legacy.
        </Text>
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.signupButtonText}>LOG IN</Text>
        </TouchableOpacity>
      </View>

      {/* RIGHT PANEL */}
      <View style={styles.rightPanel}>
        <Text style={styles.loginTitle}>SIGN UP</Text>
        <TextInput
          style={styles.input}
          placeholder="Full name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
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
          placeholder="Phone (optional)"
          placeholderTextColor="#999"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Age (optional)"
          placeholderTextColor="#999"
          value={age}
          onChangeText={setAge}
          keyboardType="number-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleSignup}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>{loading ? "SIGNING UP..." : "SIGN UP"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  leftPanel: {
    flex: 1,
    backgroundColor: '#3a3a3a',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  leftTitle: {
    fontSize: 28,
    fontWeight: '300',
    color: '#fff',
    marginBottom: 16,
    lineHeight: 35,
  },
  leftSubtitle: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 32,
    lineHeight: 20,
  },
  signupButton: {
    borderWidth: 1,
    borderColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 4,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
  },
  rightPanel: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: '300',
    color: '#1B5E20',
    marginBottom: 32,
    letterSpacing: 2,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 12,
    fontSize: 14,
    marginBottom: 24,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#1B5E20',
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },
});

export default SignupScreen;
