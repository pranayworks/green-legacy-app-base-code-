import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import AppHeader from "../components/AppHeader";
import { useAuth } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen: React.FC = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const nav = useNavigation<any>();

  const handleLogout = async () => {
    await logout();
    nav.goBack();
  };

  const handleNavigateTo = (screen: string) => {
    nav.navigate(screen as never);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
  <AppHeader />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.headerCard}>
          <Text style={styles.icon}>👤</Text>
          <Text style={styles.userName}>
            {isLoggedIn ? user?.name || "User" : "Guest"}
          </Text>
          {isLoggedIn && user?.email && (
            <Text style={styles.userEmail}>{user.email}</Text>
          )}
        </View>

        {/* Dashboard */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => nav.navigate("Dashboard" as never)}
        >
          <Text style={styles.menuIcon}>📊</Text>
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>Dashboard</Text>
            <Text style={styles.menuDesc}>View your tree planting stats</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        {/* Get Involved */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleNavigateTo("GetInvolved")}
        >
          <Text style={styles.menuIcon}>🤝</Text>
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>Get Involved</Text>
            <Text style={styles.menuDesc}>
              Volunteer or CSR partnership options
            </Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        {/* Rewards - only if logged in */}
        {isLoggedIn && (
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleNavigateTo("Rewards")}
          >
            <Text style={styles.menuIcon}>⭐</Text>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Rewards</Text>
              <Text style={styles.menuDesc}>
                Check your points and achievements
              </Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        )}

        {/* Notifications */}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => nav.navigate("Main" as never)}
        >
          <Text style={styles.menuIcon}>🔔</Text>
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>Notifications</Text>
            <Text style={styles.menuDesc}>Stay updated on campaigns</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        {/* Auth Button */}
        <View style={styles.authSection}>
          {isLoggedIn ? (
            <TouchableOpacity style={styles.signOutBtn} onPress={handleLogout}>
              <Text style={styles.signOutBtnText}>🚪 Sign Out</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.signInBtn}
              onPress={() => nav.navigate("Login" as never)}
            >
              <Text style={styles.signInBtnText}>🔐 Sign In</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 80,
    backgroundColor: "#F6FFF7",
  },
  headerCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E6F4EA",
  },
  icon: {
    fontSize: 48,
    marginBottom: 12,
  },
  userName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1B5E20",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 12,
    color: "#666",
  },
  menuItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E6F4EA",
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1B5E20",
    marginBottom: 2,
  },
  menuDesc: {
    fontSize: 12,
    color: "#999",
  },
  arrow: {
    fontSize: 18,
    color: "#2E7D32",
  },
  authSection: {
    marginTop: 24,
    marginBottom: 40,
  },
  signOutBtn: {
    backgroundColor: "#FF6B6B",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  signOutBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  signInBtn: {
    backgroundColor: "#2E8B57",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  signInBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default ProfileScreen;
