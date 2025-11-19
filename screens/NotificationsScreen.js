import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import theme from '../styles/theme';

const NotificationsScreen = ({ onBack }) => {
  return (
    <View style={styles.container}>
      <Header
        title="Notifications"
        onPressLeft={onBack}
        showRightIcon={false}
      />

      <View style={styles.emptyState}>
        <Text style={styles.title}>No notifications</Text>
        <Text style={styles.subtitle}>
          You do not have any notifications yet.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    backgroundColor: 'transparent',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default NotificationsScreen;

