import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, ViewStyle, View } from 'react-native';
import AppHeader from './AppHeader';

export const HEADER_HEIGHT = 64;

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
  scrollEnabled?: boolean;
  onProfilePress?: () => void;
  onNotifPress?: () => void;
  // optional ref so parent screens can control scroll-to-top behavior
  scrollRef?: React.RefObject<any>;
};

const ScreenWrapper: React.FC<Props> = ({ 
  children, 
  style, 
  scrollEnabled = true,
  onProfilePress, 
  onNotifPress,
  scrollRef
}) => {
  const content = (
    <View style={{ paddingHorizontal: 16, paddingBottom: 80 }}>
      {children}
    </View>
  );

  return (
    <SafeAreaView style={[styles.safe, style] as any}>
  <AppHeader />
      {scrollEnabled ? (
        <ScrollView ref={scrollRef} contentContainerStyle={{ paddingBottom: 20 }} keyboardShouldPersistTaps="handled">
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#E8F5E9' }
});

export default ScreenWrapper;
