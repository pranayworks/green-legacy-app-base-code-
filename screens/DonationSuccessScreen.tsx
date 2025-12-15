import React from 'react';
import { View, Text, StyleSheet, Animated, ScrollView } from 'react-native';
import AnimatedButton from '../components/AnimatedButton';
import ShareOptions from '../components/ShareOptions';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any>;

const DonationSuccessScreen: React.FC<Props> = ({ navigation, route }) => {
  const scaleAnim = React.useRef(new Animated.Value(0)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true })
      ])
    ]).start();
  }, [scaleAnim, fadeAnim]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Animated.View style={[styles.successCard, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <Text style={styles.successEmoji}>🎉</Text>
        <Text style={styles.title}>Thank You!</Text>
        <Text style={styles.subtitle}>Your donation was successful</Text>
        
        <View style={styles.messageContainer}>
          <Text style={styles.message}>
            You've made a real difference! Trees will be planted in your name and you'll earn rewards for your contribution.
          </Text>
        </View>

        <View style={styles.impactBox}>
          <Text style={styles.impactTitle}>Your Impact</Text>
          <Text style={styles.impactEmoji}>🌳</Text>
          <Text style={styles.impactText}>Trees planted for environmental restoration</Text>
        </View>

        <View style={styles.checkmarkContainer}>
          <Text style={styles.checkmark}>✓</Text>
        </View>
      </Animated.View>

      {/* Share Options */}
      <ShareOptions
        title="I Just Planted Trees! 🌱"
        message="I just donated to Green Legacy and planted trees for environmental restoration. Join me in making a difference!"
        url="https://greenlegacy.org"
      />

      <View style={styles.buttonContainer}>
        <AnimatedButton 
          title="Back to Home" 
          onPress={() => navigation.navigate('Main' as any)} 
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8F5E9' },
  contentContainer: { alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 16, paddingBottom: 80 },
  successCard: { width: '100%', backgroundColor: '#fff', borderRadius: 20, paddingVertical: 40, paddingHorizontal: 20, alignItems: 'center', marginVertical: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  successEmoji: { fontSize: 80, marginBottom: 12 },
  title: { fontSize: 28, fontWeight: '800', color: '#1B5E20', textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#2E7D32', marginTop: 8, textAlign: 'center' },
  messageContainer: { marginTop: 20, paddingHorizontal: 12 },
  message: { fontSize: 14, color: '#666', lineHeight: 22, textAlign: 'center' },
  impactBox: { marginTop: 24, paddingVertical: 16, paddingHorizontal: 12, backgroundColor: '#F1F8E9', borderRadius: 12, width: '100%', alignItems: 'center', borderLeftWidth: 4, borderLeftColor: '#4CAF50' },
  impactTitle: { fontSize: 13, fontWeight: '700', color: '#1B5E20' },
  impactEmoji: { fontSize: 40, marginVertical: 8 },
  impactText: { fontSize: 12, color: '#666' },
  checkmarkContainer: { marginTop: 20, width: 60, height: 60, borderRadius: 30, backgroundColor: '#4CAF50', alignItems: 'center', justifyContent: 'center' },
  checkmark: { fontSize: 36, color: '#fff', fontWeight: '700' },
  buttonContainer: { position: 'absolute', bottom: 32, width: '90%' }
});

export default DonationSuccessScreen;
