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
import { mainnet, polygon, polygonMumbai, avalanche } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

export const Fantom = {
  id: 4002,
  name: 'Fantom Network',
  network: 'Fantom Network',
  nativeCurrency: {
  decimals: 18,
  name: 'Fantom Testnet',
  symbol: 'FTM',
  },
    iconUrl: 'https://seeklogo.com/images/F/fantom-ftm-logo-3566C53917-seeklogo.com.png',
  rpcUrls: {
  public: { http: ['https://eth-rpc-api.thetatoken.org/rpc'] },
  default: { http: ['https://eth-rpc-api.thetatoken.org/rpc'] },
  },
  blockExplorers: {
  etherscan: { name: 'explorer', url: 'https://testnet.ftmscan.com/' },
  default: { name: 'explorer', url: 'https://testnet.ftmscan.com/' },
  },
  contracts: {
  multicall3: {
  address: '0xca11bde05977b3631167028862be2a173976ca11',
  blockCreated: 1,
  },
  },
  }

const { chains, provider } = configureChains(
  [mainnet, Fantom, polygonMumbai, polygon, avalanche],
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