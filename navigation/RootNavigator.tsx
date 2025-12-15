import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import MainTabNavigator from './MainTabNavigator';
import DonationSuccessScreen from '../screens/DonationSuccessScreen';
import ImpactScreen from '../screens/ImpactScreen';
import ContactScreen from '../screens/ContactScreen';
import MediaScreen from '../screens/MediaScreen';

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Main: undefined;
  DonationSuccess: { donationId?: string } | undefined;
  Impact: undefined;
  Contact: undefined;
  Media: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Main" component={MainTabNavigator} />
    <Stack.Screen name="DonationSuccess" component={DonationSuccessScreen} />
    <Stack.Screen name="Impact" component={ImpactScreen} />
    <Stack.Screen name="Contact" component={ContactScreen} />
    <Stack.Screen name="Media" component={MediaScreen} />
  </Stack.Navigator>
);

export default RootNavigator;
