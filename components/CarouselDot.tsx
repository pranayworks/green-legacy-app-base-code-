import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const CarouselDot: React.FC<{ animatedValue: Animated.Value; index: number; pageWidth: number }> = ({ animatedValue, index, pageWidth }) => {
  const inputRange = [(index - 1) * pageWidth, index * pageWidth, (index + 1) * pageWidth];
  const width = animatedValue.interpolate({ inputRange, outputRange: [8, 18, 8], extrapolate: 'clamp' });
  const opacity = animatedValue.interpolate({ inputRange, outputRange: [0.4, 1, 0.4], extrapolate: 'clamp' });

  return (
    <Animated.View style={[styles.dot, { width, opacity }]} />
  );
};

const styles = StyleSheet.create({
  dot: { height: 8, borderRadius: 4, backgroundColor: '#2E8B57', marginHorizontal: 4 }
});

export default CarouselDot;
