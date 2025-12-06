import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

const AppHeader: React.FC<{ onProfilePress?: () => void; onNotifPress?: () => void; unread?: number }> = ({ onProfilePress, onNotifPress, unread = 0 }) => {
  const { isLoggedIn } = useAuth();
  const anim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (unread > 0) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, { toValue: 1, duration: 700, useNativeDriver: true }),
          Animated.timing(anim, { toValue: 0, duration: 700, useNativeDriver: true })
        ])
      ).start();
    }
  }, [unread, anim]);

  const dotScale = anim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.5] });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onProfilePress} style={styles.side}>
        <Text style={styles.link}>{isLoggedIn ? 'Profile' : 'Guest'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Green Legacy</Text>
      <TouchableOpacity onPress={onNotifPress} style={styles.side}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.link}>🔔</Text>
          {unread > 0 && (
            <Animated.View style={[styles.unreadDot, { transform: [{ scale: dotScale }] }]} />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    backgroundColor: '#fff'
  },
  title: { fontSize: 18, fontWeight: '700', color: '#2E8B57' },
  side: { width: 80, alignItems: 'center' },
  link: { color: '#2E8B57' },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF6B6B', marginLeft: 4 }
});

export default AppHeader;
