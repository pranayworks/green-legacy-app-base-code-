import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { PrimaryButton } from '../../components/PrimaryButton';
import { TextInputField } from '../../components/TextInputField';

export const LoginScreen = () => {
  const navigation = useNavigation<any>(); // Typing ignored for speed

  const handleLogin = () => {
    // Navigate to Main stack
    navigation.replace('Main');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <Text style={styles.brandTitle}>Green Legacy</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>

      <View style={styles.form}>
        <TextInputField
          label="Email"
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInputField
          label="Password"
          placeholder="Enter your password"
          secureTextEntry
        />

        <View style={styles.buttonContainer}>
          <PrimaryButton title="Login" onPress={handleLogin} />
        </View>

        <PrimaryButton
          title="Create account"
          onPress={handleRegister}
          variant="outline"
          style={styles.secondaryButton}
        />

        <PrimaryButton
          title="Forgot password"
          onPress={() => Alert.alert('Forgot Password', 'Reset flow not implemented')}
          variant="secondary"
          style={styles.textButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.l,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  brandTitle: {
    ...typography.header,
    color: colors.primary,
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
  },
  form: {
    width: '100%',
  },
  buttonContainer: {
    marginTop: spacing.m,
  },
  secondaryButton: {
    marginTop: spacing.m,
  },
  textButton: {
    marginTop: spacing.s,
    backgroundColor: 'transparent',
  },
});
