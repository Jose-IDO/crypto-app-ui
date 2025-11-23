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
import { COIN_OPTIONS, FIAT_OPTIONS, AssetOption } from '../constants/assets';
import { EXCHANGE_RATES, GAS_FEES } from '../constants/exchangeRates';
import theme from '../styles/theme';

interface ExchangeScreenProps {
  onOpenNotifications: () => void;
  onBackPress: () => void;
}

const ExchangeScreen: React.FC<ExchangeScreenProps> = ({ onOpenNotifications, onBackPress }) => {
  const [fromCoin, setFromCoin] = useState<AssetOption>(COIN_OPTIONS[0]);
  const [toFiat, setToFiat] = useState<AssetOption>(FIAT_OPTIONS[0]);
  const [fromAmount, setFromAmount] = useState<string>('0');
  const [toAmount, setToAmount] = useState<string>('0');
  const [activeField, setActiveField] = useState<'from' | 'to'>('from');
  const [fromError, setFromError] = useState<string>('');
  const [toError, setToError] = useState<string>('');
  const [showFromDropdown, setShowFromDropdown] = useState<boolean>(false);
  const [showToDropdown, setShowToDropdown] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const isCrypto = (assetId: string): boolean => {
    return assetId in EXCHANGE_RATES;
  };

  const getRate = (): number => {
    const coinRates = EXCHANGE_RATES[fromCoin.id as keyof typeof EXCHANGE_RATES];
    if (coinRates) {
      return (coinRates as Record<string, number>)[toFiat.id] || 0;
    }
    
    const fiatRates = EXCHANGE_RATES[toFiat.id as keyof typeof EXCHANGE_RATES];
    if (fiatRates) {
      const invertedRate = (fiatRates as Record<string, number>)[fromCoin.id];
      return invertedRate ? 1 / invertedRate : 0;
    }
    
    return 0;
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
  
  const cryptoAsset = isCrypto(fromCoin.id) ? fromCoin : toFiat;
  const fiatAsset = isCrypto(fromCoin.id) ? toFiat : fromCoin;
  
  const estimateFee = fiatAmountNumber * 0.01;
  const youWillReceive = fiatAmountNumber - estimateFee;
  const spreadPercent = 0.2;
  const gasFee = GAS_FEES[cryptoAsset.id as keyof typeof GAS_FEES] || 0;

  const notEnoughBalance = fiatAmountNumber > toFiat.balance;

  const canBuy =
    !fromError &&
    !toError &&
    fromAmount.trim().length > 0 &&
    toAmount.trim().length > 0 &&
    !notEnoughBalance;

  const handleSwap = () => {
    const tempCoin = fromCoin;
    const tempFiat = toFiat;
    setFromCoin(tempFiat);
    setToFiat(tempCoin);
    
    const tempFromAmount = fromAmount;
    const tempToAmount = toAmount;
    setFromAmount(tempToAmount);
    setToAmount(tempFromAmount);
    
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

  const handleSelectFromCoin = (coin: AssetOption) => {
    setFromCoin(coin);
    setShowFromDropdown(false);
  };

  const handleSelectToFiat = (fiat: AssetOption) => {
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
        onPressLeft={onBackPress}
        onPressRight={onOpenNotifications}
        showRightIcon
      />

      <View style={styles.mainCard}>
        <AssetCard
          asset={fromCoin}
          amount={fromAmount}
          onAmountChange={(text: string) => {
            setActiveField('from');
            setFromAmount(text);
          }}
          onPressAsset={() => {
            setShowFromDropdown((prev) => !prev);
            setShowToDropdown(false);
          }}
          balanceLabel="Balance"
          balanceText={isCrypto(fromCoin.id) ? fromCoin.balance.toFixed(4) : fromCoin.balance.toFixed(2)}
          error={fromError}
        />

        {showFromDropdown && (
          <DropdownList
            options={isCrypto(fromCoin.id) ? COIN_OPTIONS : FIAT_OPTIONS}
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
          onAmountChange={(text: string) => {
            setActiveField('to');
            setToAmount(text);
          }}
          onPressAsset={() => {
            setShowToDropdown((prev) => !prev);
            setShowFromDropdown(false);
          }}
          balanceLabel="Balance"
          balanceText={isCrypto(toFiat.id) ? toFiat.balance.toFixed(4) : toFiat.balance.toFixed(2)}
          error={toError}
          isBottom
        />

        {showToDropdown && (
          <DropdownList
            options={isCrypto(toFiat.id) ? COIN_OPTIONS : FIAT_OPTIONS}
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
        <Text style={styles.buyButtonText}>Buy {cryptoAsset.label}</Text>
      </Pressable>

      <FeeSummary
        estimateFee={estimateFee}
        youWillReceive={youWillReceive}
        spreadPercent={spreadPercent}
        gasFee={gasFee}
        coinLabel={cryptoAsset.label}
        fiatLabel={fiatAsset.label}
      />

      <BuySuccessModal
        visible={showSuccessModal}
        onClose={closeSuccessModal}
        assetLabel={cryptoAsset.label}
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

