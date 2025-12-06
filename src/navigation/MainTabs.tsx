import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/home/HomeScreen';
import { DonationNavigator } from './DonationNavigator'; // Updated import
import { DonationHistoryScreen } from '../screens/donation/DonationHistoryScreen';
import { VolunteerDashboardScreen } from '../screens/volunteer/VolunteerDashboardScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

export const MainTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      {/* Replaced GiftTreeScreen with DonationNavigator */}
      <Tab.Screen
        name="GiftTree"
        component={DonationNavigator}
        options={{ title: 'Gift a Tree' }}
      />
      <Tab.Screen name="History" component={DonationHistoryScreen} options={{ title: 'My Donations', headerShown: true }} />
      <Tab.Screen name="Volunteer" component={VolunteerDashboardScreen} options={{ headerShown: true }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: true }} />
    </Tab.Navigator>
  );
};
