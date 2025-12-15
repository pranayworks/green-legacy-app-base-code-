import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
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

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.warn('App Error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <SafeAreaProvider>
          <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={{ fontSize: 18, color: '#d32f2f', marginBottom: 12 }}>⚠️ App Error</Text>
            <Text style={{ color: '#666', textAlign: 'center' }}>There was an error loading the app. Please restart and try again.</Text>
          </View>
        </SafeAreaProvider>
      );
    }

    return this.props.children;
  }
}

const navigationRef = createNavigationContainerRef();

const App = () => {
  React.useEffect(() => {
    try {
      // expose a lightweight global navigation helper used by header/menu to trigger navigation
      (global as any).__NAVIGATION__ = navigationRef;
    } catch (e) {
      // ignore in environments where global cannot be written
    }
  }, []);
  // render immediately without delay to avoid runtime not ready errors
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <AuthProvider>
          <DonationsProvider>
            <NavigationContainer ref={navigationRef}>
              <RootNavigator />
            </NavigationContainer>
          </DonationsProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6FFF7'
  }
});

export default App;
