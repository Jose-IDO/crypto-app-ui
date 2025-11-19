import React from 'react';
import { View, StyleSheet } from 'react-native';

const AssetIcon = ({ IconComponent, size = 28 }) => {
  if (!IconComponent) {
    return (
      <View style={[styles.container, { width: size, height: size, backgroundColor: '#3f3a52', borderRadius: size / 2 }]} />
    );
  }

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <IconComponent width={size} height={size} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AssetIcon;

