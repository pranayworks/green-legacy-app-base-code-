import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './navigation/RootNavigator';
import { DonationProvider } from './context/DonationContext';

const App = () => {
  return (
    <SafeAreaProvider>
      <DonationProvider>
        <RootNavigator />
      </DonationProvider>
    </SafeAreaProvider>
  );
};

export default App;
