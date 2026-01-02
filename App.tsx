import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContextProvider } from './contexts/AuthContext';
import { DonationsContextProvider } from './contexts/DonationsContext';
import RootNavigator from './navigation/RootNavigator';
import './utils/i18n';
import { initializeLanguage } from './utils/i18n';

export default function App() {
  useEffect(() => {
    initializeLanguage();
  }, []);

  return (
    <AuthContextProvider>
      <DonationsContextProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </DonationsContextProvider>
    </AuthContextProvider>
  );
}
