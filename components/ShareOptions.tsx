import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Share } from 'react-native';

interface ShareOptionsProps {
  title: string;
  message: string;
  url?: string;
}

const ShareOptions: React.FC<ShareOptionsProps> = ({ title, message, url }) => {
  const shareMessage = `${title}\n\n${message}\n\n${url ? `Learn more: ${url}` : ''}`;

  const shareOptions = [
    {
      name: 'WhatsApp',
      emoji: '💬',
      onPress: async () => {
        try {
          await Share.share({
            message: shareMessage,
            url,
            title,
          });
        } catch (error) {
          console.log('Share error:', error);
        }
      },
    },
    {
      name: 'Copy Link',
      emoji: '�',
      onPress: async () => {
        // Copy to clipboard would require additional library
        alert('Share message:\n' + shareMessage);
      },
    },
    {
      name: 'Email',
      emoji: '�',
      onPress: async () => {
        try {
          await Share.share({
            message: shareMessage,
            title,
          });
        } catch (error) {
          console.log('Share error:', error);
        }
      },
    },
    {
      name: 'More',
      emoji: '📤',
      onPress: async () => {
        try {
          await Share.share({
            message: shareMessage,
            url,
            title,
          });
        } catch (error) {
          console.log('Share error:', error);
        }
      },
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Share Your Impact</Text>
      <View style={styles.buttonsRow}>
        {shareOptions.map((option, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.shareButton}
            onPress={option.onPress}
          >
            <Text style={styles.shareEmoji}>{option.emoji}</Text>
            <Text style={styles.shareName}>{option.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 20, paddingHorizontal: 16 },
  title: { fontSize: 16, fontWeight: '700', color: '#1B5E20', marginBottom: 12, textAlign: 'center' },
  buttonsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  shareButton: { alignItems: 'center', paddingVertical: 12, paddingHorizontal: 8 },
  shareEmoji: { fontSize: 32 },
  shareName: { fontSize: 11, fontWeight: '600', color: '#1B5E20', marginTop: 4 },
});

export default ShareOptions;
