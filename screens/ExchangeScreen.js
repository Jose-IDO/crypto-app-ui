import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import Header from '../components/Header';
import AssetCard from '../components/AssetCard';
import DropdownList from '../components/DropdownList';
import FeeSummary from '../components/FeeSummary';
import BuySuccessModal from '../components/BuySuccessModal';
import SwapIconSvg from '../assets/icons/swap.svg';
import { COIN_OPTIONS, FIAT_OPTIONS } from '../constants/assets';
import { EXCHANGE_RATES, GAS_FEES } from '../constants/exchangeRates';
import theme from '../styles/theme';

const ExchangeScreen = ({ onOpenNotifications }) => {
  const [fromCoin, setFromCoin] = useState(COIN_OPTIONS[0]);
  const [toFiat, setToFiat] = useState(FIAT_OPTIONS[0]);
  const [fromAmount, setFromAmount] = useState('0');
  const [toAmount, setToAmount] = useState('0');
  const [activeField, setActiveField] = useState('from');
  const [fromError, setFromError] = useState('');
  const [toError, setToError] = useState('');
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const getRate = () => {
    const coinRates = EXCHANGE_RATES[fromCoin.id] || {};
    return coinRates[toFiat.id] || 0;
  };

  useEffect(() => {
    const rate = getRate();
    if (!rate) {
      return;
    }

    setFromError('');
    setToError('');

    if (activeField === 'from') {
      if (!fromAmount.trim()) {
        setFromError('Please enter an amount');
        setToAmount('');
        return;
      }

      const coinAmount = Number(fromAmount.replace(',', ''));
      if (isNaN(coinAmount)) {
        setFromError('Please enter numbers only');
        setToAmount('');
        return;
      }

      const fiatAmount = coinAmount * rate;
      setToAmount(fiatAmount.toFixed(2));
      
      if (fiatAmount > toFiat.balance) {
        setToError(`Insufficient balance. You have ${toFiat.balance.toFixed(2)} ${toFiat.label}`);
      }
    } 
    else if (activeField === 'to') {
      if (!toAmount.trim()) {
        setToError('Please enter an amount');
        setFromAmount('');
        return;
      }

      const fiatAmount = Number(toAmount.replace(',', ''));
      if (isNaN(fiatAmount)) {
        setToError('Please enter numbers only');
        setFromAmount('');
        return;
      }

      if (fiatAmount > toFiat.balance) {
        setToError(`Insufficient balance. You have ${toFiat.balance.toFixed(2)} ${toFiat.label}`);
        setFromAmount('');
        return;
      }

      const coinAmount = fiatAmount / rate;
      setFromAmount(coinAmount.toFixed(4));
    }
  }, [fromAmount, toAmount, fromCoin, toFiat, activeField]);

  const coinAmountNumber = Number(fromAmount.replace(',', '')) || 0;
  const fiatAmountNumber = Number(toAmount.replace(',', '')) || 0;
  
  const estimateFee = fiatAmountNumber * 0.01;
  const youWillReceive = fiatAmountNumber - estimateFee;
  const spreadPercent = 0.2;
  const gasFee = GAS_FEES[fromCoin.id] || 0;

  const notEnoughBalance = fiatAmountNumber > toFiat.balance;

  const canBuy =
    !fromError &&
    !toError &&
    fromAmount.trim().length > 0 &&
    toAmount.trim().length > 0 &&
    !notEnoughBalance;

  const handleSwap = () => {
    const tempFrom = fromAmount;
    const tempTo = toAmount;
    setFromAmount(tempTo);
    setToAmount(tempFrom);
    setActiveField('from');
  };

  const handleBuy = () => {
    if (!canBuy) {
      if (!fromAmount.trim()) {
        setFromError('Please enter an amount');
      }
      if (!toAmount.trim()) {
        setToError('Please enter an amount');
      }
      if (fiatAmountNumber > toFiat.balance) {
        setToError(`Insufficient balance. You have ${toFiat.balance.toFixed(2)} ${toFiat.label}`);
      }
      return;
    }

    setShowSuccessModal(true);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleSelectFromCoin = (coin) => {
    setFromCoin(coin);
    setShowFromDropdown(false);
  };

  const handleSelectToFiat = (fiat) => {
    setToFiat(fiat);
    setShowToDropdown(false);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Header
        title="Exchange"
        onPressLeft={() => {}}
        onPressRight={onOpenNotifications}
        showRightIcon
      />

      <View style={styles.mainCard}>
        <AssetCard
          asset={fromCoin}
          amount={fromAmount}
          onAmountChange={(text) => {
            setActiveField('from');
            setFromAmount(text);
          }}
          onPressAsset={() => {
            setShowFromDropdown((prev) => !prev);
            setShowToDropdown(false);
          }}
          balanceLabel="Balance"
          balanceText={fromCoin.balance.toFixed(4)}
          error={fromError}
        />

        {showFromDropdown && (
          <DropdownList
            options={COIN_OPTIONS}
            onSelect={handleSelectFromCoin}
          />
        )}

        <View style={styles.swapButtonContainer}>
          <View style={styles.dividerLine} />
          
          <Pressable
            style={({ pressed }) => [
              styles.swapButton,
              pressed && styles.swapButtonPressed,
            ]}
            onPress={handleSwap}
          >
            <View style={styles.swapIconWrapper}>
              <SwapIconSvg width={24} height={24} fill="#888888" stroke="#888888" />
            </View>
          </Pressable>
        </View>

        <AssetCard
          asset={toFiat}
          amount={toAmount}
          onAmountChange={(text) => {
            setActiveField('to');
            setToAmount(text);
          }}
          onPressAsset={() => {
            setShowToDropdown((prev) => !prev);
            setShowFromDropdown(false);
          }}
          balanceLabel="Balance"
          balanceText={toFiat.balance.toFixed(2)}
          error={toError}
          isBottom
        />

        {showToDropdown && (
          <DropdownList
            options={FIAT_OPTIONS}
            onSelect={handleSelectToFiat}
          />
        )}
      </View>

      <Text style={styles.rateText}>
        1 {fromCoin.label} = {getRate().toLocaleString()} {toFiat.label}
      </Text>

      <Pressable
        onPress={handleBuy}
        style={({ pressed }) => [
          styles.buyButton,
          !canBuy && styles.buyButtonDisabled,
          pressed && canBuy && styles.buyButtonPressed,
        ]}
      >
        <Text style={styles.buyButtonText}>Buy {fromCoin.label}</Text>
      </Pressable>

      <FeeSummary
        estimateFee={estimateFee}
        youWillReceive={youWillReceive}
        spreadPercent={spreadPercent}
        gasFee={gasFee}
        coinLabel={fromCoin.label}
        fiatLabel={toFiat.label}
      />

      <BuySuccessModal
        visible={showSuccessModal}
        onClose={closeSuccessModal}
        assetLabel={fromCoin.label}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 40,
  },
  mainCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 24,
    padding: 16,
    paddingBottom: 24,
    position: 'relative',
  },
  swapButtonContainer: {
    alignItems: 'center',
    marginVertical: 4,
    marginTop: 9,
    position: 'relative',
    height: 44,
    justifyContent: 'center',
  },
  dividerLine: {
    position: 'absolute',
    left: -16,
    right: -16,
    height: 1,
    backgroundColor: theme.colors.border,
    zIndex: 0,
    top: '50%',
  },
  swapButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#262134',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    position: 'relative',
  },
  swapButtonPressed: {
    backgroundColor: '#312a42',
  },
  swapIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rateText: {
    marginTop: 16,
    color: theme.colors.textMuted,
    fontSize: 12,
    textAlign: 'center',
  },
  buyButton: {
    marginTop: 16,
    alignSelf: 'center',
    width: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buyButtonDisabled: {
    opacity: 0.5,
  },
  buyButtonPressed: {
    backgroundColor: '#e0e0e0',
  },
  buyButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ExchangeScreen;

