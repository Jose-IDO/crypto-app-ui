import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../styles/theme';

interface FeeSummaryProps {
  estimateFee: number;
  youWillReceive: number;
  spreadPercent: number;
  gasFee: number;
  coinLabel: string;
  fiatLabel: string;
}

const FeeSummary: React.FC<FeeSummaryProps> = ({
  estimateFee,
  youWillReceive,
  spreadPercent,
  gasFee,
  coinLabel,
  fiatLabel,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Estimate fee</Text>
        <Text style={styles.value}>
          {estimateFee.toFixed(2)} {fiatLabel.toLowerCase()}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>You will receive</Text>
        <Text style={styles.value}>
          {youWillReceive.toFixed(2)} {fiatLabel}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Spread</Text>
        <Text style={styles.value}>{spreadPercent}%</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Gas fee</Text>
        <Text style={styles.value}>
          {gasFee.toFixed(4)} {coinLabel}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    color: theme.colors.textMuted,
    fontSize: 12,
  },
  value: {
    color: theme.colors.textPrimary,
    fontSize: 12,
  },
});

export default FeeSummary;


