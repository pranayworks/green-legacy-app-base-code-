import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';

interface ProfileMenuProps {
  visible: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  user?: { name?: string; email?: string };
  onLogin: () => void;
  onSignup: () => void;
  onDashboard: () => void;
  onSubscriptions: () => void;
  onLogout: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  visible,
  onClose,
  isLoggedIn,
  user,
  onLogin,
  onSignup,
  onDashboard,
  onSubscriptions,
  onLogout,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.backdrop} onPress={onClose}>
        <View style={styles.card} pointerEvents="box-none">
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
          {isLoggedIn ? (
            <>
              <Text style={styles.name}>{user?.name || 'User'}</Text>
              {user?.email && <Text style={styles.email}>{user.email}</Text>}
              <TouchableOpacity style={styles.menuBtn} onPress={() => { onClose(); onDashboard(); }}>
                <Text style={styles.menuText}>View Dashboard</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuBtn} onPress={() => { onClose(); onSubscriptions(); }}>
                <Text style={styles.menuText}>My Subscriptions</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuBtn} onPress={() => { onClose(); onLogout(); }}>
                <Text style={[styles.menuText, { color: '#C62828' }]}>Logout</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity style={styles.menuBtn} onPress={() => { onClose(); onLogin(); }}>
                <Text style={styles.menuText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuBtn} onPress={() => { onClose(); onSignup(); }}>
                <Text style={styles.menuText}>Sign up</Text>
              </TouchableOpacity>
              {/* Get Involved removed for both states */}
            </>
          )}
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  card: {
    marginTop: 60,
    marginLeft: 18,
    width: 260,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 12,
    alignItems: 'stretch',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  closeBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 2,
    padding: 4,
  },
  closeText: {
    fontSize: 22,
    color: '#1B5E20',
    fontWeight: '700',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1B5E20',
    marginBottom: 2,
    marginTop: 8,
  },
  email: {
    fontSize: 13,
    color: '#666',
    marginBottom: 10,
  },
  menuBtn: {
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 6,
    backgroundColor: '#F1F8E9',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 15,
    color: '#1B5E20',
    fontWeight: '600',
  },
});

export default ProfileMenu;
