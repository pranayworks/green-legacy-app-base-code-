import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OccasionSelectionScreen } from '../screens/donation/OccasionSelectionScreen';
import { TreeSelectionScreen } from '../screens/donation/TreeSelectionScreen';
import { RecipientDetailsScreen } from '../screens/donation/RecipientDetailsScreen';
import { SummaryScreen } from '../screens/donation/SummaryScreen';
import { SuccessScreen } from '../screens/donation/SuccessScreen';

const DonationStack = createNativeStackNavigator();

export const DonationNavigator = () => {
  return (
    <DonationStack.Navigator
      initialRouteName="OccasionSelection"
      screenOptions={{
        headerShown: true,
        headerTintColor: '#2E7D32', // Primary color
        headerTitleStyle: { fontWeight: 'bold' },
        headerBackTitleVisible: false,
      }}
    >
      <DonationStack.Screen
        name="OccasionSelection"
        component={OccasionSelectionScreen}
        options={{ title: 'Select Occasion' }}
      />
      <DonationStack.Screen
        name="TreeSelection"
        component={TreeSelectionScreen}
        options={{ title: 'Choose a Tree' }}
      />
      <DonationStack.Screen
        name="RecipientDetails"
        component={RecipientDetailsScreen}
        options={{ title: 'Details' }}
      />
      <DonationStack.Screen
        name="Summary"
        component={SummaryScreen}
        options={{ title: 'Confirm Donation' }}
      />
      <DonationStack.Screen
        name="Success"
        component={SuccessScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </DonationStack.Navigator>
  );
};
