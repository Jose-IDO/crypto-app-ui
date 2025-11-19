import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import BackIconSvg from '../assets/icons/back.svg';
import BellIconSvg from '../assets/icons/bell.svg';
import theme from '../styles/theme';

const Header = ({ title, onPressLeft, onPressRight, showRightIcon = true }) => {
  return (
    <View style={styles.header}>
      <Pressable
        onPress={onPressLeft}
        style={({ pressed }) => [
          styles.iconButton,
          pressed && styles.iconButtonPressed,
        ]}
      >
        <BackIconSvg width={18} height={18} fill="#888888" />
      </Pressable>

      <Text style={styles.title}>{title}</Text>

      {showRightIcon ? (
        <Pressable
          onPress={onPressRight}
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.iconButtonPressed,
          ]}
        >
          <BellIconSvg width={18} height={18} stroke="#888888" fill="none" strokeWidth="2" />
        </Pressable>
      ) : (
        <View style={styles.iconSpacer} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonPressed: {
    backgroundColor: '#2b2738',
  },
  iconSpacer: {
    width: 36,
    height: 36,
  },
});

export default Header;

