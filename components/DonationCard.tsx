import React from 'react';
import { Animated, Text, StyleSheet, Pressable } from 'react-native';
import { Donation } from '../contexts/DonationsContext';

const DonationCard: React.FC<{ item: Donation }> = ({ item }) => {
  const anim = React.useRef(new Animated.Value(0)).current;
  const pressScale = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.timing(anim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
  }, [anim]);

  const onPressIn = () => Animated.spring(pressScale, { toValue: 0.97, useNativeDriver: true }).start();
  const onPressOut = () => Animated.spring(pressScale, { toValue: 1, useNativeDriver: true }).start();

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View style={[styles.card, { opacity: anim, transform: [{ scale: pressScale }] }]}>
        <Text style={styles.title}>{item.occasion} • {item.treeType}</Text>
        <Text style={styles.meta}>{item.trees} tree(s) • {new Date(item.date).toLocaleDateString()}</Text>
        {item.message ? <Text style={styles.msg}>{item.message}</Text> : null}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 10 },
  title: { fontWeight: '700', color: '#2E8B57' },
  meta: { color: '#666', marginTop: 6 },
  msg: { marginTop: 8 }
});

export default DonationCard;
