
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

const LoginScreen: React.FC = () => {
  const auth = useAuth();
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Please enter email and password");
      return;
    }
    setLoading(true);
    try {
      await auth.loginWithCredentials(email.trim(), password);
      Alert.alert("Welcome", `Welcome ${auth.user?.name || ""}`);
      navigation.navigate("Main");
    } catch (err) {
      console.warn("Login error:", err);
      Alert.alert("Login Failed", "Check your credentials and try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* LEFT PANEL */}
      <View style={styles.leftPanel}>
        <Text style={styles.leftTitle}>Don't have an account?</Text>
        <Text style={styles.leftSubtitle}>
          Join Green Legacy and plant trees for special occasions. Track your impact and grow your legacy.
        </Text>
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.signupButtonText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>

      {/* RIGHT PANEL */}
      <View style={styles.rightPanel}>
        <Text style={styles.loginTitle}>LOGIN</Text>
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
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>{loading ? "LOGGING IN..." : "LOG IN"}</Text>
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
  forgotPassword: {
    color: '#ccc',
    fontSize: 13,
    marginBottom: 32,
    textDecorationLine: 'underline',
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

export default LoginScreen;
