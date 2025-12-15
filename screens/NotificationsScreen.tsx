import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import AppHeader from '../components/AppHeader';

const NotificationsScreen: React.FC = () => {
  const [notifications, setNotifications] = React.useState([
    { id: '1', emoji: '🎉', title: 'Donation Confirmed', message: 'Your 5 trees have been planted!', time: '2 hours ago', read: false },
    { id: '2', emoji: '🏆', title: 'New Badge Unlocked', message: 'You earned the Sprout badge!', time: '5 hours ago', read: false },
    { id: '3', emoji: '📈', title: 'Impact Milestone', message: 'You\'ve helped plant 50 trees!', time: '1 day ago', read: true },
    { id: '4', emoji: '👥', title: 'Friend Joined', message: 'John joined Green Legacy!', time: '2 days ago', read: true },
    { id: '5', emoji: '🌱', title: 'Project Update', message: 'New planting project in Kenya started', time: '3 days ago', read: true }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.contentContainer}>
      <AppHeader />

      {/* Header */}
      <View style={styles.headerSection}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Notifications</Text>
          {unreadCount > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{unreadCount}</Text></View>}
        </View>
      </View>

      {/* Notifications List */}
      {notifications.length > 0 ? (
        <View style={styles.notificationsList}>
          <FlatList
            data={notifications}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.notificationItem, !item.read && styles.notificationUnread]}
                onPress={() => markAsRead(item.id)}
              >
                <View style={styles.notificationIcon}>
                  <Text style={styles.notificationEmoji}>{item.emoji}</Text>
                </View>
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>{item.title}</Text>
                  <Text style={styles.notificationMessage}>{item.message}</Text>
                  <Text style={styles.notificationTime}>{item.time}</Text>
                </View>
                {!item.read && <View style={styles.unreadDot} />}
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>📭</Text>
          <Text style={styles.emptyTitle}>No Notifications</Text>
          <Text style={styles.emptyMessage}>You're all caught up! Check back later for updates.</Text>
        </View>
      )}

      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#E8F5E9' },
  contentContainer: { paddingBottom: 20 },
  headerSection: { backgroundColor: '#C8E6C9', paddingHorizontal: 16, paddingVertical: 20 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#1B5E20' },
  badge: { backgroundColor: '#FF6B6B', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  notificationsList: { paddingHorizontal: 16, paddingVertical: 12 },
  notificationItem: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 12, paddingHorizontal: 12, backgroundColor: '#fff', borderRadius: 10, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#C8E6C9' },
  notificationUnread: { backgroundColor: '#F0FAFF', borderLeftColor: '#4CAF50' },
  notificationIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#F1F8E9', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  notificationEmoji: { fontSize: 24 },
  notificationContent: { flex: 1 },
  notificationTitle: { fontSize: 14, fontWeight: '700', color: '#1B5E20' },
  notificationMessage: { fontSize: 13, color: '#666', marginTop: 4, lineHeight: 18 },
  notificationTime: { fontSize: 11, color: '#999', marginTop: 6 },
  unreadDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#FF6B6B', marginLeft: 8 },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  emptyEmoji: { fontSize: 80, marginBottom: 20 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: '#1B5E20', marginBottom: 8 },
  emptyMessage: { fontSize: 14, color: '#666' }
});

export default NotificationsScreen;
