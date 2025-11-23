import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import theme from '../styles/theme';

interface BuySuccessModalProps {
  visible: boolean;
  onClose: () => void;
  assetLabel: string;
}

const BuySuccessModal: React.FC<BuySuccessModalProps> = ({ visible, onClose, assetLabel }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Success</Text>
          <Text style={styles.message}>
            {assetLabel} has been purchased.
          </Text>
          <Pressable
            onPress={onClose}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '80%',
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  message: {
    color: '#cccccc',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#ffffff',
  },
  buttonPressed: {
    backgroundColor: '#e0e0e0',
  },
  buttonText: {
    color: '#000000',
    fontWeight: '600',
  },
});

export default BuySuccessModal;


