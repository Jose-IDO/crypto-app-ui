import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ExchangeScreen from './screens/ExchangeScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import theme from './styles/theme';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('exchange');

  const goToNotifications = () => setCurrentScreen('notifications');
  const goToExchange = () => setCurrentScreen('exchange');

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={[theme.colors.background, '#1f0714']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        {currentScreen === 'exchange' ? (
          <ExchangeScreen onOpenNotifications={goToNotifications} />
        ) : (
          <NotificationsScreen onBack={goToExchange} />
        )}
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  gradient: {
    flex: 1,
  },
});

