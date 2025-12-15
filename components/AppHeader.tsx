import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';

const AppHeader: React.FC<{ 
  onProfilePress?: () => void
  onNotifPress?: () => void
  onSearchPress?: () => void
  onOverflowPress?: () => void
  unread?: number 
}> = ({ 
  onProfilePress, 
  onNotifPress,
  onSearchPress,
  onOverflowPress,
  unread = 0 
}) => {
  const { isLoggedIn, user } = useAuth();
  const displayName = isLoggedIn ? (user?.name || 'User') : 'Guest';

  // Get first letter of display name for avatar
  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']} accessibilityRole="header">
      <View style={styles.container}>
      {/* Left: Avatar Button */}
      <TouchableOpacity 
        onPress={onProfilePress} 
        style={styles.avatarButton}
        accessibilityLabel="profile-button"
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{avatarLetter}</Text>
        </View>
      </TouchableOpacity>

      {/* Center: Title (absolutely centered to avoid overlap with icons) */}
      <Text style={styles.title} numberOfLines={1} accessible accessibilityRole="header">Green Legacy</Text>

      {/* Right: Notifications only (search/overflow removed per design) */}
      <View style={styles.rightSection}>
        <TouchableOpacity 
          onPress={onNotifPress} 
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
  },
  container: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E6F4EA',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3
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
    position: 'absolute',
    left: 56,
    right: 56,
    fontSize: 16,
    fontWeight: '800',
    color: '#1B5E20',
    textAlign: 'center',
    marginHorizontal: 8
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
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
    fontSize: 18,
    color: '#1B5E20'
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
