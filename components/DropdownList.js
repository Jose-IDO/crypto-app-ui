import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import AssetIcon from './AssetIcon';
import theme from '../styles/theme';

const DropdownList = ({ options, onSelect }) => {
  return (
    <View style={styles.dropdown}>
      {options.map((item) => (
        <Pressable
          key={item.id}
          style={({ pressed }) => [
            styles.item,
            pressed && styles.itemPressed,
          ]}
          onPress={() => onSelect(item)}
        >
          <AssetIcon IconComponent={item.icon} size={20} />
          <Text style={styles.itemText}>
            {item.label} — {item.name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    marginTop: 8,
    backgroundColor: '#252033',
    borderRadius: 14,
    paddingVertical: 4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  itemPressed: {
    backgroundColor: '#302a42',
  },
  itemText: {
    color: theme.colors.textPrimary,
    fontSize: 13,
    marginLeft: 8,
  },
});

export default DropdownList;

