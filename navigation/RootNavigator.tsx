import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import MainTabNavigator from './MainTabNavigator';
import DonationSuccessScreen from '../screens/DonationSuccessScreen';
import ImpactScreen from '../screens/ImpactScreen';
import ContactScreen from '../screens/ContactScreen';
import MediaScreen from '../screens/MediaScreen';
import GetInvolvedScreen from '../screens/GetInvolvedScreen';
import VolunteerForm from '../screens/VolunteerForm';
import CSRScreen from '../screens/CSRScreen';
import AboutScreen from '../screens/AboutScreen';
import DashboardScreen from '../screens/DashboardScreen';
import CertificateScreen from '../screens/CertificateScreen';
import SubscriptionsScreen from '../screens/SubscriptionsScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import TermsScreen from '../screens/TermsScreen';
import PrivacyScreen from '../screens/PrivacyScreen';

import RewardsScreen from '../screens/RewardsScreen';

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  Profile: undefined;
  NotificationsScreen: undefined;
  Main: undefined;
  DonationSuccess: { donationId?: string } | undefined;
  Impact: undefined;
  Contact: undefined;
  Media: undefined;
  GetInvolved: undefined;
  Volunteer: undefined;
  CSR: undefined;
  About: undefined;
  Dashboard: undefined;
  Certificate: { donation: any } | undefined;
  Rewards: undefined;
  Chatbot: undefined;
  Subscriptions: undefined;
  Leaderboard: undefined;
  Terms: undefined;
  Privacy: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
    <Stack.Screen name="Main" component={MainTabNavigator} />
    <Stack.Screen name="DonationSuccess" component={DonationSuccessScreen} />
  <Stack.Screen name="Certificate" component={CertificateScreen} />
    <Stack.Screen name="Impact" component={ImpactScreen} />
    <Stack.Screen name="Contact" component={ContactScreen} />
    <Stack.Screen name="Media" component={MediaScreen} />
    <Stack.Screen name="About" component={AboutScreen} />
    <Stack.Screen name="GetInvolved" component={GetInvolvedScreen} />
    <Stack.Screen name="Volunteer" component={VolunteerForm} />
  <Stack.Screen name="CSR" component={CSRScreen} />
  <Stack.Screen name="Dashboard" component={DashboardScreen} />
  <Stack.Screen name="Rewards" component={RewardsScreen} />
    <Stack.Screen name="Subscriptions" component={SubscriptionsScreen} />
    <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
    <Stack.Screen name="Terms" component={TermsScreen} />
    <Stack.Screen name="Privacy" component={PrivacyScreen} />
  </Stack.Navigator>
);

export default RootNavigator;
