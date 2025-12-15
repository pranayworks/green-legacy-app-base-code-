import React from 'react';
import { View, Text, Animated, Dimensions, ScrollView, StyleSheet } from 'react-native';
import AnimatedButton from '../components/AnimatedButton';
import CarouselDot from '../components/CarouselDot';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const slides = [
  { title: 'Welcome to Green Legacy', subtitle: 'Plant trees, restore nature, inspire others.' },
  { title: 'Track Impact', subtitle: 'See oxygen & CO₂ estimates and your points.' },
  { title: 'Gift a Tree', subtitle: 'Donate trees to celebrate occasions.' }
];

const OnboardingScreen: React.FC = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const nav = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View style={{ flex: 1, backgroundColor: '#F6FFF7' }}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
      >
        {slides.map((s, i) => (
          <View key={i} style={[styles.slide, { width }]}>
            <Text style={styles.title}>{s.title}</Text>
            <Text style={styles.subtitle}>{s.subtitle}</Text>
            {i === slides.length - 1 && (
              <AnimatedButton title="Get Started" onPress={() => nav.replace('Main')} style={{ marginTop: 20 }} />
            )}
          </View>
        ))}
      </Animated.ScrollView>

      <View style={styles.dotsRow}>
        {slides.map((_, i) => (
          <CarouselDot key={i} animatedValue={scrollX} index={i} pageWidth={width} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: '800', color: '#2E8B57', textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#444', marginTop: 12, textAlign: 'center' },
  dotsRow: { position: 'absolute', bottom: 48, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center' }
});

export default OnboardingScreen;
