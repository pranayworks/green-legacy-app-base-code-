import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { PrimaryButton } from '../../components/PrimaryButton';
import { TextInputField } from '../../components/TextInputField';

export const RegisterScreen = () => {
  const navigation = useNavigation<any>();

  const handleRegister = () => {
    // Navigate to Main stack after registration
    navigation.replace('Main');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join Green Legacy today</Text>
      </View>

      <View style={styles.form}>
        <TextInputField
          label="Full Name"
          placeholder="Enter your name"
        />
        <TextInputField
          label="Email"
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInputField
          label="Password"
          placeholder="Create a password"
          secureTextEntry
        />
        <TextInputField
          label="Confirm Password"
          placeholder="Confirm your password"
          secureTextEntry
        />

        <View style={styles.buttonContainer}>
          <PrimaryButton title="Sign Up" onPress={handleRegister} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Text style={styles.link} onPress={handleLogin}>Login</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: spacing.l,
    backgroundColor: colors.background,
  },
  header: {
    marginTop: spacing.xl,
    marginBottom: spacing.l,
  },
  title: {
    ...typography.header,
    color: colors.primary,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  form: {
    width: '100%',
  },
  buttonContainer: {
    marginTop: spacing.l,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.l,
  },
  footerText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  link: {
    ...typography.body,
    color: colors.primary,
    fontWeight: 'bold',
  },
});
