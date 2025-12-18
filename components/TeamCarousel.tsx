import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { TeamMember, teamMembers } from '../data/teamData';

const { width, height } = Dimensions.get('window');

interface TeamCarouselProps {
  onMemberPress?: (member: TeamMember) => void;
}

export default function TeamCarousel({ onMemberPress }: TeamCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(teamMembers[0]);
  const scrollViewRef = useRef<ScrollView>(null);
  const autoSlideTimer = useRef<NodeJS.Timeout | null>(null);

  // Auto-slide every 5 seconds
  useEffect(() => {
    startAutoSlide();
    return () => {
      if (autoSlideTimer.current) {
        clearInterval(autoSlideTimer.current);
      }
    };
  }, [currentIndex]);

  const startAutoSlide = () => {
    if (autoSlideTimer.current) {
      clearInterval(autoSlideTimer.current);
    }
    autoSlideTimer.current = setInterval(() => {
      const nextIndex = (currentIndex + 1) % teamMembers.length;
      setCurrentIndex(nextIndex);
      setSelectedMember(teamMembers[nextIndex]);
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: (width - 40) * nextIndex,
          animated: true,
        });
      }
    }, 5000);
  };

  const handleMemberPress = (index: number, member: TeamMember) => {
    setCurrentIndex(index);
    setSelectedMember(member);
    if (autoSlideTimer.current) {
      clearInterval(autoSlideTimer.current);
    }
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: (width - 40) * index,
        animated: true,
      });
    }
    if (onMemberPress) {
      onMemberPress(member);
    }
    // Restart auto-slide after user interaction
    setTimeout(startAutoSlide, 3000);
  };

  const renderTeamMember = (member: TeamMember, index: number) => {
    const isSelected = currentIndex === index;
    const scale = isSelected ? 1 : 0.7;
    const opacity = isSelected ? 1 : 0.5;

    return (
      <TouchableOpacity
        key={member.id}
        onPress={() => handleMemberPress(index, member)}
        style={[styles.memberContainer, { opacity }]}
        activeOpacity={0.8}
      >
        {/* Rotated Square Container */}
        <View style={[styles.rotatedSquare, { transform: [{ scale }] }]}> 
          {/* Inner rotated image */}
          <View style={styles.imageWrapper}>
            <Image
              source={member.image}
              style={styles.memberImage}
              defaultSource={require('../assets/placeholder.jpg')}
            />
          </View>
        </View>

        {/* Name and Role */}
        <Text style={[styles.memberName, { opacity: isSelected ? 1 : 0.6 }]}>
          {member.name}
        </Text>
        <Text style={[styles.memberRole, { opacity: isSelected ? 0.8 : 0.5 }]}>
          {member.role}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.sectionTitle}>Our Amazing Team</Text>
      <Text style={styles.sectionSubtitle}>
        Meet the visionaries turning green dreams into reality
      </Text>

      {/* Carousel */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={styles.carouselContainer}
        onMomentumScrollEnd={(event) => {
          const contentOffsetX = event.nativeEvent.contentOffset.x;
          const currentPage = Math.round(contentOffsetX / (width - 40));
          setCurrentIndex(currentPage);
          setSelectedMember(teamMembers[currentPage]);
        }}
      >
        {teamMembers.map((member, index) => (
          <View key={member.id} style={{ width: width - 40, paddingHorizontal: 20 }}>
            {renderTeamMember(member, index)}
          </View>
        ))}
      </ScrollView>

      {/* Selected Member Details */}
      {selectedMember && (
        <View style={styles.detailsContainer}>
          <Text style={styles.selectedName}>{selectedMember.name}</Text>
          <Text style={styles.selectedRole}>{selectedMember.role}</Text>
          <Text style={styles.selectedBio}>{selectedMember.bio}</Text>
        </View>
      )}

      {/* Indicators (Dots) */}
      <View style={styles.indicatorsContainer}>
        {teamMembers.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.indicator,
              currentIndex === index && styles.indicatorActive,
            ]}
            onPress={() => handleMemberPress(index, teamMembers[index])}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B5E20',
    textAlign: 'center',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  carouselContainer: {
    paddingHorizontal: 0,
  },
  memberContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rotatedSquare: {
    width: 140,
    height: 140,
    borderRadius: 12,
    overflow: 'hidden',
    transform: [{ rotate: '45deg' }],
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 16,
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '-45deg' }],
  },
  memberImage: {
    width: 160,
    height: 160,
    resizeMode: 'cover',
  },
  memberName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1B5E20',
    textAlign: 'center',
    marginBottom: 4,
  },
  memberRole: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  detailsContainer: {
    marginTop: 24,
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#16a34a',
  },
  selectedName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 4,
  },
  selectedRole: {
    fontSize: 13,
    fontWeight: '600',
    color: '#16a34a',
    marginBottom: 8,
  },
  selectedBio: {
    fontSize: 13,
    color: '#333',
    lineHeight: 18,
  },
  indicatorsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
  },
  indicatorActive: {
    width: 24,
    height: 8,
    backgroundColor: '#16a34a',
  },
});