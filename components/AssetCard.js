import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';
import AssetIcon from './AssetIcon';
import DropdownIconSvg from '../assets/icons/dropdown.svg';
import theme from '../styles/theme';

const AssetCard = ({
  asset,
  amount,
  onAmountChange,
  onPressAsset,
  balanceLabel,
  balanceText,
  error,
  isBottom = false,
}) => {
  return (
    <View style={[styles.section, isBottom && styles.sectionBottom]}>
      <View style={styles.topRow}>
        <Pressable
          onPress={onPressAsset}
          style={styles.assetSelector}
        >
          <AssetIcon IconComponent={asset.icon} size={28} />
          <Text style={styles.assetLabel}>{asset.label}</Text>
          <View style={styles.dropdownIconContainer}>
            <DropdownIconSvg width={12} height={12} fill="#888888" />
          </View>
        </Pressable>
      </View>

      <View style={styles.amountContainer}>
        <TextInput
          style={styles.amountInput}
          value={amount}
          onChangeText={onAmountChange}
          keyboardType="numeric"
          placeholder="0.0"
          placeholderTextColor={theme.colors.placeholder}
        />
        <Text style={styles.balanceText}>{balanceText}</Text>
        <Text style={styles.balanceLabel}>{balanceLabel}</Text>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    padding: 12,
    borderRadius: 18,
  },
  sectionBottom: {
    marginTop: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  assetSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assetLabel: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
    marginRight: 4,
  },
  dropdownIconContainer: {
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    position: 'relative',
  },
  amountInput: {
    color: theme.colors.textPrimary,
    fontSize: 32,
    fontWeight: '600',
    flexShrink: 1,
    minWidth: 0,
  },
  balanceText: {
    marginLeft: 8,
    color: theme.colors.textMuted,
    fontSize: 12,
    lineHeight: 32,
  },
  balanceLabel: {
    position: 'absolute',
    bottom: 6,
    right: 0,
    color: theme.colors.textMuted,
    fontSize: 12,
  },
  errorText: {
    marginTop: 4,
    color: '#ff6b6b',
    fontSize: 12,
  },
});

export default AssetCard;

