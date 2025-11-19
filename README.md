# Crypto Trading App

A React Native (Expo) cryptocurrency exchange application with a modern dark-themed UI. This app allows users to exchange cryptocurrencies (ETH, BTC, ADA) for fiat currencies (USD, EUR, GBP) with real-time conversion, balance validation, and transaction fee calculations.

## Features Checklist

### Core Functionality
- [x] Exchange screen with coin and fiat currency selection
- [x] Real-time amount conversion between coins and fiat
- [x] Bidirectional conversion (edit coin amount or fiat amount)
- [x] Balance validation (prevents purchasing more than available balance)
- [x] Swap button to exchange the two amount values
- [x] Buy button with validation
- [x] Success modal after purchase

### UI Components
- [x] Dark theme with gradient background
- [x] Asset cards with coin/fiat icons (SVG)
- [x] Dropdown lists for coin and fiat selection
- [x] Header with back button and notifications bell icon
- [x] Horizontal divider line through swap button
- [x] Fee summary display
- [x] Error messages for invalid inputs
- [x] Responsive layout

### Currency Support
- [x] Cryptocurrencies: ETH, BTC, ADA
- [x] Fiat currencies: USD, EUR, GBP
- [x] Fixed exchange rates for all currency pairs
- [x] Gas fees for each cryptocurrency

### Data & Calculations
- [x] Exchange rate calculations
- [x] Fee estimation (1% transaction fee)
- [x] Spread percentage display (0.2%)
- [x] Gas fee display
- [x] Balance calculations (fiat balances match coin balances converted)

### Navigation
- [x] Exchange screen (main screen)
- [x] Notifications screen
- [x] Screen switching via local state

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (will be installed automatically)
- Expo Go app on your mobile device (for testing)

### Steps

1. **Clone or download the repository**
   ```bash
   cd Crypto-trading-ap
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the Expo development server**
   ```bash
   npm start
   ```
   
   Or with cache cleared:
   ```bash
   npx expo start --clear
   ```

4. **Run on your device**
   - Scan the QR code with Expo Go app (iOS) or Camera app (Android)
   - Or press `i` for iOS simulator, `a` for Android emulator, or `w` for web

## How to Use the App

### Main Exchange Screen

1. **Select Cryptocurrency (Top Card)**
   - Tap on the coin icon/label (default: ETH)
   - Choose from ETH, BTC, or ADA from the dropdown
   - The balance shows your available coin balance

2. **Enter Amount**
   - Type the amount of cryptocurrency you want to buy in the top input field
   - The bottom field automatically calculates the equivalent fiat amount
   - OR type the fiat amount in the bottom field to see how much coin you'll get

3. **Select Fiat Currency (Bottom Card)**
   - Tap on the fiat icon/label (default: USD)
   - Choose from USD, EUR, or GBP from the dropdown
   - The balance shows your available fiat balance

4. **Swap Amounts**
   - Tap the swap button (rounded square icon in the middle)
   - This exchanges the two amount values

5. **View Exchange Rate**
   - The current exchange rate is displayed below the main card
   - Format: "1 ETH = 3,461.02 USD"

6. **Review Fees**
   - Fee summary shows:
     - Estimate fee (1% of transaction)
     - You will receive (amount after fees)
     - Spread (0.2%)
     - Gas fee (varies by coin)

7. **Purchase**
   - Tap the "Buy [Coin]" button
   - The button is disabled if:
     - Amount fields are empty
     - There are validation errors
     - You don't have enough balance
   - On success, a confirmation modal appears

### Notifications Screen

- Tap the bell icon in the header to view notifications
- Currently shows "No notifications" message
- Tap the back arrow to return to Exchange screen

### Error Handling

- **Empty amount**: Shows "Please enter an amount"
- **Invalid input**: Shows "Please enter numbers only"
- **Insufficient balance**: Shows "Insufficient balance. You have X.XX [Currency]"

## Project Structure

```
Crypto-trading-ap/
├── App.js                    # Main app component with navigation
├── screens/
│   ├── ExchangeScreen.js     # Main exchange interface
│   └── NotificationsScreen.js # Notifications view
├── components/
│   ├── AssetCard.js          # Coin/fiat card with input
│   ├── AssetIcon.js          # Icon renderer for assets
│   ├── BuySuccessModal.js    # Success popup modal
│   ├── DropdownList.js       # Currency selection dropdown
│   ├── FeeSummary.js         # Fee breakdown display
│   └── Header.js             # App header with navigation
├── constants/
│   ├── assets.js             # Coin and fiat definitions
│   └── exchangeRates.js     # Exchange rates and gas fees
├── styles/
│   └── theme.js             # Color theme definitions
└── assets/
    ├── coins/               # Cryptocurrency SVG icons
    ├── fiat/                # Fiat currency SVG icons
    └── icons/               # UI icons (back, bell, swap, dropdown)
```

## Technologies Used

- **React Native** - Mobile app framework
- **Expo** - Development platform and tooling
- **expo-linear-gradient** - Gradient backgrounds
- **react-native-svg** - SVG icon rendering
- **react-native-svg-transformer** - SVG import support

## Configuration

### Exchange Rates
Exchange rates are defined in `constants/exchangeRates.js`. Current rates:
- ETH: $3,461.02 USD, €3,200.50 EUR, £2,800.33 GBP
- BTC: $68,000 USD, €63,000 EUR, £59,000 GBP
- ADA: $0.45 USD, €0.42 EUR, £0.38 GBP

### Balances
Initial balances are set in `constants/assets.js`:
- ETH: 293.0187
- BTC: 1.3456
- ADA: 12,890.12
- Fiat balances are automatically calculated based on ETH balance and exchange rates

### Fees
- Transaction fee: 1% of purchase amount
- Spread: 0.2%
- Gas fees: ETH (0.0045), BTC (0.00012), ADA (0.9)

## Development

### Running in Development Mode
```bash
npm start
```

### Clearing Cache
If you encounter issues, clear the Metro bundler cache:
```bash
npx expo start --clear
```

### Building for Production
For production builds, use Expo's build service:
```bash
expo build:android
expo build:ios
```

## Notes

- The app uses fixed exchange rates (not real-time)
- Balances are stored in local state (not persisted)
- SVG icons are used for all currency and UI icons
- The app features a dark theme with gradient background
- All calculations are performed client-side

## License

This project is for educational/demonstration purposes.

