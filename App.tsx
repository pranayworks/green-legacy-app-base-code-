import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './contexts/AuthContext';
import { DonationsProvider } from './contexts/DonationsContext';
import RootNavigator from './navigation/RootNavigator';

const LoadingScreen = () => (
  <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
    <ActivityIndicator size="large" color="#2E8B57" />
    <Text style={{ marginTop: 12, color: '#2E8B57' }}>Loading Green Legacy...</Text>
  </View>
);

const App = () => {
  const [appIsReady, setAppIsReady] = React.useState(false);

  React.useEffect(() => {
    // Give the app time to initialize
    const timer = setTimeout(() => {
      setAppIsReady(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (!appIsReady) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <DonationsProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </DonationsProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6FFF7'
  }
});

export default App;
