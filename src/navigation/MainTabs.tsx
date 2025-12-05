import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/home/HomeScreen';
import { GiftTreeScreen } from '../screens/donation/GiftTreeScreen';
import { DonationHistoryScreen } from '../screens/donation/DonationHistoryScreen';
import { VolunteerDashboardScreen } from '../screens/volunteer/VolunteerDashboardScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

export const MainTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="GiftTree" component={GiftTreeScreen} options={{ title: 'Gift a Tree' }} />
      <Tab.Screen name="History" component={DonationHistoryScreen} options={{ title: 'My Donations' }} />
      <Tab.Screen name="Volunteer" component={VolunteerDashboardScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
