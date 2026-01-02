
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import DonateScreen from '../screens/DonateScreen';
import ImpactScreen from '../screens/ImpactScreen';
import MoreScreen from '../screens/MoreScreen';
import GetInvolvedScreen from '../screens/GetInvolvedScreen';
import ChatbotFloatingButton from '../components/ChatbotFloatingButton';
import { useAuth } from '../contexts/AuthContext';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const { isLoggedIn } = useAuth();

  // Debug logs to identify invalid component imports
  console.log('HomeScreen', HomeScreen);
  console.log('DonateScreen', DonateScreen);
  console.log('ImpactScreen', ImpactScreen);
  console.log('GetInvolvedScreen', GetInvolvedScreen);
  console.log('AboutScreen', AboutScreen);
  console.log('MoreScreen', MoreScreen);

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: '#16a34a',
          tabBarInactiveTintColor: '#999',
          tabBarLabelPosition: 'below-icon',
          tabBarIcon: ({ color, size }) => {
            let icon = '○';
            let label = '';

            if (route.name === 'Home') {
              icon = '🏠';
              label = 'Home';
            } else if (route.name === 'Donate') {
              icon = '❤️';
              label = 'Donate';
            } else if (route.name === 'Impact') {
              icon = '🌳';
              label = 'Impact';
            } else if (route.name === 'GetInvolved') {
              icon = '🤝';
              label = 'Get Involved';
            } else if (route.name === 'About') {
              icon = 'ℹ️';
              label = 'About';
            } else if (route.name === 'More') {
              icon = '⋯';
              label = 'More';
            }

            return (
              <View style={styles.tabIconContainer}>
                <Text style={{ fontSize: 24, marginBottom: 4 }}>{icon}</Text>
                <Text style={[styles.tabLabel, { color }]}>{label}</Text>
              </View>
            );
          },
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Tab.Screen 
          name="Donate" 
          component={DonateScreen}
          options={{ title: 'Donate' }}
        />
        <Tab.Screen 
          name="Impact" 
          component={ImpactScreen}
          options={{ title: 'Impact' }}
        />
        <Tab.Screen 
          name="GetInvolved" 
          component={GetInvolvedScreen}
          options={{ title: 'Get Involved' }}
        />
        <Tab.Screen 
          name="About" 
          component={AboutScreen}
          options={{ title: 'About' }}
        />
        <Tab.Screen 
          name="More" 
          component={MoreScreen}
          options={{ title: 'More' }}
        />
      </Tab.Navigator>
      
      {/* Floating Chatbot Button */}
      <ChatbotFloatingButton />
    </>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: Platform.OS === 'ios' ? 28 : 18,
    height: 70,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 8,
    paddingHorizontal: 8,
    paddingBottom: 4,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
});

export default MainTabNavigator;
