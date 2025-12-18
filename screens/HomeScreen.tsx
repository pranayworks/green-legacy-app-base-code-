import React from "react";
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { authButtonStyles } from "../styles/AuthButtons";
import AnimatedButton from "../components/AnimatedButton";
import { useAuth } from "../contexts/AuthContext";
import { useScrollToTop } from "@react-navigation/native";
import { useDonations } from "../contexts/DonationsContext";
import { useNavigation } from "@react-navigation/native";
import ScreenWrapper from "../components/ScreenWrapper";

const HomeScreen: React.FC = () => {
  const auth = useAuth();
  const nav = useNavigation<any>();
  const scrollRef = React.useRef<any>(null);
  useScrollToTop(scrollRef);

  // Entrance animations for welcome text, button and banner
  const welcomeOpacity = React.useRef(new Animated.Value(0)).current;
  const welcomeY = React.useRef(new Animated.Value(12)).current;
  const buttonOpacity = React.useRef(new Animated.Value(0)).current;
  const buttonY = React.useRef(new Animated.Value(16)).current;
  const bannerOpacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(welcomeOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(welcomeY, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(buttonY, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Show banner slightly after button
    const t = setTimeout(() => {
      Animated.timing(bannerOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, 600);
    return () => clearTimeout(t);
  }, [welcomeOpacity, welcomeY, buttonOpacity, buttonY, bannerOpacity]);

  const { t } = useTranslation();

  return (
    <ScreenWrapper
      scrollRef={scrollRef}
      onProfilePress={() => nav.navigate("Profile" as never)}
      onNotifPress={() => nav.navigate("NotificationsScreen" as never)}
    >
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.heroEmoji}>🌱</Text>
        <Text style={styles.heroTitle}>{t('common.appName')}</Text>
        <Text style={styles.heroSubtitle}>{t('home.heroHeadline')}</Text>
      </View>

      {/* Welcome Message */}
      <Animated.View
        style={{
          transform: [{ translateY: welcomeY }],
          opacity: welcomeOpacity,
        }}
      >
        <Text style={styles.welcome}>
          {t('home.title')}{auth.user ? `, ${auth.user.name}` : ""} 👋
        </Text>
        <Text style={styles.subtitle}>
          {t('home.heroSubtext')}
        </Text>
      </Animated.View>

      {/* CTA Button */}
      <Animated.View
        style={{
          marginTop: 28,
          transform: [{ translateY: buttonY }],
          opacity: buttonOpacity,
        }}
      >
        <AnimatedButton
          title={t('home.donateButton')}
          onPress={() => nav.navigate("Donate")}
        />
      </Animated.View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.quickStat}>
          <Text style={styles.statEmoji}>🌳</Text>
          <Text style={styles.statValue}>1.5M+</Text>
          <Text style={styles.statLabel}>{t('home.impactCounters.treesPlanted', 'Trees')}</Text>
        </View>
        <View style={styles.quickStat}>
          <Text style={styles.statEmoji}>🌍</Text>
          <Text style={styles.statValue}>75</Text>
          <Text style={styles.statLabel}>Countries</Text>
        </View>
        <View style={styles.quickStat}>
          <Text style={styles.statEmoji}>👥</Text>
          <Text style={styles.statValue}>500K+</Text>
          <Text style={styles.statLabel}>Users</Text>
        </View>
      </View>

      {/* Why planting trees matters */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Why planting trees matters</Text>
        <View style={styles.bullets}>
          <Text style={styles.bullet}>
            • Trees clean the air by absorbing pollution and carbon dioxide.
          </Text>
          <Text style={styles.bullet}>
            • Their roots hold soil together and reduce flooding and erosion.
          </Text>
          <Text style={styles.bullet}>
            • Tree shade cools cities and lowers extreme heat.
          </Text>
          <Text style={styles.bullet}>
            • Trees provide homes and food for birds, insects, and other
            wildlife.
          </Text>
          <Text style={styles.bullet}>
            • Green spaces improve our mental health and reduce stress.
          </Text>
          <Text style={styles.bullet}>
            • A single tree can make a neighborhood feel alive and welcoming.
          </Text>
        </View>
      </View>

      {/* Origin / Mission */}
      <View style={[styles.card, { marginTop: 18 }]}>
        <Text style={styles.cardTitle}>Where this idea came from</Text>
        <Text style={{ marginTop: 10, color: "#444", lineHeight: 20 }}>
          On a birthday we asked: what if every celebration left a gift for the
          planet? Green Legacy was born from that question — a way to turn
          milestones into living legacies. Instead of material gifts that fade,
          we plant trees that grow, store carbon, provide shade, and create
          habitats for decades.
        </Text>
        <Text style={[styles.cardTitle, { marginTop: 12 }]}>Our mission</Text>
        <Text style={{ marginTop: 8, color: "#444", lineHeight: 20 }}>
          To make tree planting simple, transparent, and community-driven. We
          enable donors to sponsor trees, volunteers to join drives, and
          organizations to partner — all while tracking impact in a way anyone
          can understand.
        </Text>
      </View>

      {/* Motivation corner */}
      <View style={[styles.card, styles.quoteCard]}>
        <Text style={styles.cardTitle}>Grow your legacy</Text>
        <View style={{ marginTop: 8 }}>
          <Text style={styles.quote}>
            “Every tree you plant is a small promise to the future.”
          </Text>
          <Text style={styles.quote}>
            “Turn your birthday, festival, or milestone into a living memory.”
          </Text>
          <Text style={styles.quote}>
            “Instead of gifting things that fade, gift a tree that grows.”
          </Text>
        </View>
      </View>

      {/* Leaderboard preview */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Top Planters this month</Text>
        <View style={{ marginTop: 10 }}>
          {/* Small table-like list */}
          <View style={styles.leaderHeader}>
            <Text style={[styles.leaderCell, { flex: 0.2 }]}>#</Text>
            <Text style={[styles.leaderCell, { flex: 0.6 }]}>Name</Text>
            <Text
              style={[styles.leaderCell, { flex: 0.2, textAlign: "right" }]}
            >
              Trees
            </Text>
          </View>
          {/** Hard-coded entries with user's own count included */}
          <View style={styles.leaderRow}>
            <Text style={[styles.leaderCell, { flex: 0.2 }]}>1</Text>
            <Text style={[styles.leaderCell, { flex: 0.6 }]}>Aarav</Text>
            <Text
              style={[styles.leaderCell, { flex: 0.2, textAlign: "right" }]}
            >
              24
            </Text>
          </View>
          <View style={styles.leaderRow}>
            <Text style={[styles.leaderCell, { flex: 0.2 }]}>2</Text>
            <Text style={[styles.leaderCell, { flex: 0.6 }]}>Diya</Text>
            <Text
              style={[styles.leaderCell, { flex: 0.2, textAlign: "right" }]}
            >
              18
            </Text>
          </View>
          <View style={styles.leaderRow}>
            <Text style={[styles.leaderCell, { flex: 0.2 }]}>3</Text>
            <Text style={[styles.leaderCell, { flex: 0.6 }]}>Rahul</Text>
            <Text
              style={[styles.leaderCell, { flex: 0.2, textAlign: "right" }]}
            >
              15
            </Text>
          </View>
          <View style={styles.leaderRow}>
            <Text style={[styles.leaderCell, { flex: 0.2 }]}>4</Text>
            <Text style={[styles.leaderCell, { flex: 0.6 }]}>Sneha</Text>
            <Text
              style={[styles.leaderCell, { flex: 0.2, textAlign: "right" }]}
            >
              12
            </Text>
          </View>
          {/* User row - compute below */}
          <UserTreesRow />

          <TouchableOpacity
            style={styles.viewFullBtn}
            onPress={() => nav.navigate("Leaderboard" as never)}
          >
            <Text style={styles.viewFullText}>View full leaderboard</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Login Banner */}
      {!auth.isLoggedIn && (
        <Animated.View style={[styles.banner, { opacity: bannerOpacity }]}>
          <Text style={styles.bannerTitle}>🔒 Login to Save Your Impact</Text>
          <Text style={styles.bannerText}>
            Login to track donations, earn rewards, and see your donation
            certificates and impact map.
          </Text>
          <View style={{ flexDirection: "row", marginTop: 12 }}>
            <TouchableOpacity
              style={[
                authButtonStyles.primaryButton,
                { flex: 1, marginRight: 8 },
              ]}
              onPress={() => nav.navigate("Login")}
            >
              <Text style={authButtonStyles.primaryButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                authButtonStyles.secondaryButton,
                { flex: 1, marginLeft: 8 },
              ]}
              onPress={() => nav.navigate("Signup")}
            >
              <Text style={authButtonStyles.secondaryButtonText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </ScreenWrapper>
  );
};

const UserTreesRow: React.FC = () => {
  const { donations } = useDonations();
  const auth = useAuth();
  const userId = auth.user?.id;
  const userTrees = (donations || [])
    .filter((d) => d.userId === userId)
    .reduce((s, d) => s + (d.trees || 0), 0);
  const displayName = auth.user ? auth.user.name : "You?";

  return (
    <View style={styles.leaderRow}>
      <Text style={[styles.leaderCell, { flex: 0.2 }]}>5</Text>
      <Text style={[styles.leaderCell, { flex: 0.6 }]}>{displayName}</Text>
      <Text style={[styles.leaderCell, { flex: 0.2, textAlign: "right" }]}>
        {userTrees}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#E8F5E9" },
  container: { flex: 1, padding: 16 },
  heroSection: {
    alignItems: "center",
    paddingVertical: 24,
    backgroundColor: "#C8E6C9",
    borderRadius: 16,
    marginBottom: 28,
  },
  heroEmoji: { fontSize: 64 },
  heroTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1B5E20",
    marginTop: 12,
  },
  heroSubtitle: { fontSize: 14, color: "#2E7D32", marginTop: 4 },
  welcome: { fontSize: 24, fontWeight: "800", color: "#1B5E20" },
  subtitle: { fontSize: 14, color: "#555", marginTop: 8 },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 24,
    paddingVertical: 16,
    backgroundColor: "#F1F8E9",
    borderRadius: 12,
  },
  quickStat: { alignItems: "center" },
  statEmoji: { fontSize: 32 },
  statValue: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1B5E20",
    marginTop: 6,
  },
  statLabel: { fontSize: 11, color: "#666", marginTop: 2 },
  banner: {
    backgroundColor: "#2E7D32",
    padding: 18,
    borderRadius: 12,
    marginTop: 24,
  },
  bannerTitle: { fontSize: 16, fontWeight: "700", color: "#fff" },
  bannerText: { fontSize: 13, color: "#E8F5E9", marginTop: 8, lineHeight: 20 },

  /* New cards and leaderboard styles */
  card: {
    backgroundColor: "#F7FFF7",
    padding: 14,
    borderRadius: 12,
    marginTop: 18,
  },
  cardTitle: { fontSize: 16, fontWeight: "800", color: "#1B5E20" },
  bullets: { marginTop: 10 },
  bullet: { fontSize: 13, color: "#2E7D32", marginBottom: 6, lineHeight: 18 },
  quoteCard: { backgroundColor: "#E8F5E9" },
  quote: {
    fontStyle: "italic",
    color: "#2E7D32",
    fontSize: 14,
    marginBottom: 6,
  },

  leaderHeader: {
    flexDirection: "row",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#E6F4EA",
  },
  leaderRow: {
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
  },
  leaderCell: { fontSize: 14, color: "#1B5E20" },
  viewFullBtn: {
    marginTop: 12,
    alignSelf: "flex-start",
    backgroundColor: "#1B5E20",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  viewFullText: { color: "#fff", fontWeight: "700" },
});

export default HomeScreen;
