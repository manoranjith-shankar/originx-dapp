import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import '@rainbow-me/rainbowkit/styles.css';
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, polygonMumbai } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

export const SphinxBetanet = {
  id: 8082,
  name: 'Sphinx Testnet',
  network: 'Shardeum Sphinx 1.X',
  nativeCurrency: {
  decimals: 18,
  name: 'Shardeum Sphinx 1.X',
  symbol: 'SHM',
  },
    iconUrl: 'https://www.redwolf.in/image/catalog/marketplace/shardeum/shardeum-artist-image.png',
  rpcUrls: {
  public: { http: ['https://sphinx.shardeum.org'] },
  default: { http: ['https://sphinx.shardeum.org'] },
  },
  blockExplorers: {
  default: { name: 'Sphinx Betanet', url: 'https://explorer-sphinx.shardeum.org' },
  },
  }

const { chains, provider } = configureChains(
  [mainnet, polygonMumbai, polygon, SphinxBetanet, optimism, arbitrum],
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
