import React from 'react';
import { TouchableOpacity, StyleSheet, Platform, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ChatbotFloatingButton: React.FC = () => {
  const navigation = useNavigation<any>();
  return (
    <View pointerEvents="box-none" style={styles.wrapper}>
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.button}
        onPress={() => navigation.navigate('Chatbot')}
        accessibilityLabel="chatbot-button"
      >
        <Text style={{ fontSize: 24 }}>💬</Text>
      </TouchableOpacity>
    </View>
  );
};

import { Text } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    right: 16,
    bottom: Platform.OS === 'ios' ? 36 : 20,
    zIndex: 50
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1B5E20',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 8
  }
});

export default ChatbotFloatingButton;
