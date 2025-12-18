import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet, Pressable } from 'react-native';

interface RateUsModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (rating: number, feedback: string) => void;
}

const RateUsModal: React.FC<RateUsModalProps> = ({ visible, onClose, onSubmit }) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [thankYou, setThankYou] = useState(false);

  const handleStarPress = (star: number) => {
    setSelectedRating(star);
  };

  const handleSubmit = () => {
    onSubmit(selectedRating, feedbackText);
    setThankYou(true);
    setSelectedRating(0);
    setFeedbackText('');
    setTimeout(() => {
      setThankYou(false);
      onClose();
    }, 2000);
  };

  const handleCancel = () => {
    setSelectedRating(0);
    setFeedbackText('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.modalContent}>
          {thankYou ? (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <Text style={styles.thankYouText}>Thank you for your feedback! 🌱</Text>
            </View>
          ) : (
            <>
              <Text style={styles.title}>Rate Green Legacy</Text>
              <Text style={styles.subtitle}>Help us improve! Share your feedback.</Text>
              <View style={styles.starsRow}>
                {[1,2,3,4,5].map((star) => (
                  <TouchableOpacity
                    key={star}
                    onPress={() => handleStarPress(star)}
                    style={styles.starTouchable}
                  >
                    <Text style={[styles.star, { color: star <= selectedRating ? '#FFD700' : '#BDBDBD' }]}>
                      {star <= selectedRating ? '★' : '☆'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {selectedRating > 0 && (
                <Text style={styles.ratingText}>You rated {selectedRating}/5 stars</Text>
              )}
              <TextInput
                style={styles.input}
                placeholder="What should we improve?"
                value={feedbackText}
                onChangeText={setFeedbackText}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
              <View style={styles.buttonRow}>
                <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                  <Text style={[styles.buttonText, { color: '#1B5E20' }]}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    elevation: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1B5E20',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#444',
    marginBottom: 18,
    textAlign: 'center',
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  starTouchable: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  star: {
    fontSize: 40,
  },
  ratingText: {
    fontSize: 14,
    color: '#388E3C',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    minHeight: 60,
    borderColor: '#C8E6C9',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 18,
    fontSize: 14,
    backgroundColor: '#F1F8E9',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  submitButton: {
    backgroundColor: '#388E3C',
  },
  cancelButton: {
    backgroundColor: '#E8F5E9',
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  thankYouText: {
    fontSize: 18,
    color: '#1B5E20',
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 30,
  },
});

export default RateUsModal;
