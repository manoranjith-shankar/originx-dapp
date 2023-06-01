import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import '@rainbow-me/rainbowkit/styles.css';
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, polygonMumbai, avalanche } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

export const testnet = {
  id: 9134,
  name: 'Mainnet fork',
  network: 'Ethereum',
  nativeCurrency: {
  decimals: 18,
  name: 'ethereum',
  symbol: 'ETH',
  },
    iconUrl: 'https://logowik.com/content/uploads/images/ethereum-eth-icon9411.logowik.com.webp',
  rpcUrls: {
  public: { http: ['https://rpc.buildbear.io/hollow-ackbar-14753b14'] },
  default: { http: ['https://rpc.buildbear.io/hollow-ackbar-14753b14'] },
  },
  blockExplorers: {
  etherscan: { name: 'explorer', url: 'https://explorer.buildbear.io/hollow-ackbar-14753b14/transactions' },
  default: { name: 'explorer', url: 'https://explorer.buildbear.io/hollow-ackbar-14753b14/transactions' },
  },
  contracts: {
  multicall3: {
  address: '0xca11bde05977b3631167028862be2a173976ca11',
  blockCreated: 1,
  },
  },
  }

const { chains, provider } = configureChains(
  [mainnet, testnet, polygonMumbai, polygon, optimism, arbitrum, avalanche],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'originX',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        theme={darkTheme({
        accentColor: '#4f14af',
        accentColorForeground: 'white',
        overlayBlur: 'small',
          })} chains={chains}>
            <App />
      </RainbowKitProvider>
    </WagmiConfig>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
