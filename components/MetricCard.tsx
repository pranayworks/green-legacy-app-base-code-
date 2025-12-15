import React from 'react';
import { Animated, Text, StyleSheet } from 'react-native';

const MetricCard: React.FC<{ title: string; value: string; accent?: string }> = ({ title, value, accent }) => {
  const anim = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(anim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, [anim]);

  return (
    <Animated.View style={[styles.card, { borderLeftColor: accent || '#2E8B57', opacity: anim, transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }) }] }]}> 
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginRight: 10,
    minWidth: 120,
    borderLeftWidth: 6,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2
  },
  value: { fontSize: 18, fontWeight: '700', color: '#2E8B57' },
  title: { fontSize: 12, color: '#444', marginTop: 6 }
});

export default MetricCard;
