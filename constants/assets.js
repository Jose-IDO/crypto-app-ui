import EthIcon from '../assets/coins/eth.svg';
import BtcIcon from '../assets/coins/btc.svg';
import AdaIcon from '../assets/coins/ada.svg';
import UsdIcon from '../assets/fiat/usd.svg';
import EurIcon from '../assets/fiat/eur.svg';
import GbpIcon from '../assets/fiat/gbp.svg';
import { EXCHANGE_RATES } from './exchangeRates';

const ETH_BALANCE = 293.0187;
const BTC_BALANCE = 1.3456;
const ADA_BALANCE = 12890.12;

export const COIN_OPTIONS = [
  {
    id: 'eth',
    label: 'ETH',
    name: 'Ethereum',
    icon: EthIcon,
    balance: ETH_BALANCE,
  },
  {
    id: 'btc',
    label: 'BTC',
    name: 'Bitcoin',
    icon: BtcIcon,
    balance: BTC_BALANCE,
  },
  {
    id: 'ada',
    label: 'ADA',
    name: 'Cardano',
    icon: AdaIcon,
    balance: ADA_BALANCE,
  },
];

const USD_BALANCE = ETH_BALANCE * EXCHANGE_RATES.eth.usd;
const EUR_BALANCE = ETH_BALANCE * EXCHANGE_RATES.eth.eur;
const GBP_BALANCE = ETH_BALANCE * EXCHANGE_RATES.eth.gbp;

export const FIAT_OPTIONS = [
  {
    id: 'usd',
    label: 'USD',
    name: 'US Dollar',
    icon: UsdIcon,
    balance: USD_BALANCE,
  },
  {
    id: 'eur',
    label: 'EUR',
    name: 'Euro',
    icon: EurIcon,
    balance: EUR_BALANCE,
  },
  {
    id: 'gbp',
    label: 'GBP',
    name: 'British Pound',
    icon: GbpIcon,
    balance: GBP_BALANCE,
  },
];

