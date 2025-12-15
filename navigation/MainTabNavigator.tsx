import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import DonateScreen from '../screens/DonateScreen';
import ImpactScreen from '../screens/ImpactScreen';
import MediaScreen from '../screens/MediaScreen';
import MoreScreen from '../screens/MoreScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
// Chatbot is handled as a floating button that navigates to a root screen
import ChatbotFloatingButton from '../components/ChatbotFloatingButton';
import { useAuth } from '../contexts/AuthContext';

const Tab = createBottomTabNavigator();

// Simple icon components (emoji + text)
const TabIcon: React.FC<{ icon: string; label: string; color: string }> = ({ icon, label, color }) => (
  <View style={styles.tabIcon}>
    <Text style={{ fontSize: 20 }}>{icon}</Text>
    <Text style={[styles.tabLabel, { color }]}>{label}</Text>
  </View>
);

// Custom floating Chatbot button used as the central tab button
const ChatbotButton: React.FC<{ children: React.ReactNode; onPress?: (...args: any[]) => void }> = ({ children, onPress }) => (
  <View style={styles.chatbotWrapper} pointerEvents="box-none">
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={styles.chatbotButton}>
      {children}
    </TouchableOpacity>
  </View>
);

const MainTabNavigator = () => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#2E8B57',
        tabBarInactiveTintColor: '#999',
        tabBarLabel: ({ color }) => {
          const tabIcons: Record<string, { icon: string; label: string }> = {
            Home: { icon: '🏠', label: 'Home' },
            Donate: { icon: '🤝', label: 'Donate' },
            Impact: { icon: '🌳', label: 'Impact' },
            Media: { icon: '📷', label: 'Media' },
            More: { icon: '⋯', label: 'More' }
          };
          const config = tabIcons[route.name];
          return config ? <TabIcon icon={config.icon} label={config.label} color={color} /> : null;
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Donate" component={DonateScreen} />
      <Tab.Screen name="Impact" component={ImpactScreen} />
      <Tab.Screen name="Media" component={MediaScreen} />
      {/* Chatbot is a floating button, not a tab */}
      <Tab.Screen name="More" component={MoreScreen} />
      {/* Floating chatbot button rendered on top */}
      </Tab.Navigator>
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
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 8,
    paddingHorizontal: 8
  },
  tabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 56
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4
  }
  ,
  chatbotWrapper: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 40 : 28,
    alignSelf: 'center',
    zIndex: 20
  },
  chatbotButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#1B5E20',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 10,
    elevation: 12
  }
});

export default MainTabNavigator;
