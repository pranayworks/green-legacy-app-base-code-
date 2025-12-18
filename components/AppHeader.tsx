import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProfileMenu from './ProfileMenu';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

const AppHeader: React.FC<{ unread?: number; title?: string }> = ({ unread = 0, title }) => {
  const navigation = useNavigation<any>();
  const { isLoggedIn, user, logout } = useAuth();
  const displayName = isLoggedIn ? (user?.name || 'User') : 'Guest';
  const avatarLetter = displayName.charAt(0).toUpperCase();
  const [isProfileMenuVisible, setIsProfileMenuVisible] = useState(false);

  const handleProfilePress = () => {
    if (isLoggedIn) {
      navigation.navigate('Profile');
    } else {
      setIsProfileMenuVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']} accessibilityRole="header">
      <View style={styles.header}>
        {/* Left: Avatar Button */}
        <TouchableOpacity
          onPress={handleProfilePress}
          style={styles.avatarButton}
          accessibilityLabel="profile-button"
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{avatarLetter}</Text>
          </View>
        </TouchableOpacity>

        {/* Center: Title */}
        <Text style={styles.title} numberOfLines={1} accessible accessibilityRole="header">{title || 'Green Legacy'}</Text>

        {/* Right: Notifications only */}
        <View style={styles.rightSection}>
          <TouchableOpacity
            onPress={() => navigation.navigate('NotificationsScreen')}
            style={styles.iconBtn}
            accessibilityLabel="notifications-button"
          >
            <Text style={styles.icon}>🔔</Text>
            {unread > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unread}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
      {!isLoggedIn && (
        <ProfileMenu
          visible={isProfileMenuVisible}
          onClose={() => setIsProfileMenuVisible(false)}
          isLoggedIn={isLoggedIn}
          user={user}
          onLogin={() => navigation.navigate('Login')}
          onSignup={() => navigation.navigate('Signup')}
          onDashboard={() => navigation.navigate('Dashboard')}
          onSubscriptions={() => navigation.navigate('Subscriptions')}
          onLogout={logout}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'transparent',
    position: 'relative',
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 1000,
  },
  avatarButton: {
    paddingRight: 8
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E0F2E9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#C8E6C9'
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1B5E20'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B5E20',
    textAlign: 'center',
    marginLeft: 8,
    flex: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    position: 'relative'
  },
  icon: {
    fontSize: 22,
    color: '#1f2933', // dark for contrast
  },
  badge: {
    position: 'absolute',
    right: -2,
    top: -2,
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center'
  },
  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '700'
  }
});

export default AppHeader;
