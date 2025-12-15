import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure how notifications are handled
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const registerPushNotifications = async () => {
  try {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#4CAF50',
      });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return null;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Push Notification Token:', token);
    return token;
  } catch (error) {
    console.error('Error registering for push notifications:', error);
    return null;
  }
};

export const sendLocalNotification = async (title: string, body: string) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: { notificationId: Date.now().toString() },
      },
      trigger: { type: 'time', seconds: 2 } as any,
    });
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

export const sendDonationNotification = async (trees: number, donor: string) => {
  const title = '🎉 Donation Received!';
  const body = `Thank you ${donor}! You just planted ${trees} tree(s)`;
  await sendLocalNotification(title, body);
};

export const sendMilestoneNotification = async (milestone: number) => {
  const title = '🏆 Milestone Reached!';
  const body = `Congratulations! You've planted ${milestone} trees!`;
  await sendLocalNotification(title, body);
};

export const sendRewardNotification = async (reward: string) => {
  const title = '⭐ New Reward Unlocked!';
  const body = `You've earned the ${reward} badge!`;
  await sendLocalNotification(title, body);
};

export const listenToNotifications = (callback: (notification: any) => void) => {
  // Listen for notifications received while app is in foreground
  const subscription1 = Notifications.addNotificationReceivedListener((notification) => {
    callback(notification);
  });

  // Listen for notifications that are tapped
  const subscription2 = Notifications.addNotificationResponseReceivedListener((response) => {
    callback(response.notification);
  });

  // Return unsubscribe function
  return () => {
    subscription1.remove();
    subscription2.remove();
  };
};

export default {
  registerPushNotifications,
  sendLocalNotification,
  sendDonationNotification,
  sendMilestoneNotification,
  sendRewardNotification,
  listenToNotifications,
};
