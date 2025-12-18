import { StyleSheet } from 'react-native';

export const authButtonStyles = StyleSheet.create({
  primaryButton: {
    backgroundColor: '#1B5E20',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#1B5E20',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
  secondaryButtonText: {
    color: '#1B5E20',
    fontSize: 16,
    fontWeight: '600',
  },
});
