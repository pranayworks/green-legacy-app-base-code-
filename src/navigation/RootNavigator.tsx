import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthNavigator } from './AuthNavigator';
import { MainTabs } from './MainTabs';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  // TODO: Add logic to switch between Auth and Main based on user session
  // For now, defaulting to AuthNavigator, but user can change initialRouteName to test MainTabs
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
