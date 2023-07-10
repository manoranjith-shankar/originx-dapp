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
import { mainnet, polygon, polygonMumbai } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

export const linea = {
  id: 59140,
  name: 'Linea',
  network: 'Linea',
  nativeCurrency: {
  decimals: 18,
  name: 'Linea',
  symbol: 'ETH',
  },
    iconUrl: 'https://pbs.twimg.com/profile_images/1639402103486521344/erDLnbwE_400x400.jpg',
  rpcUrls: {
  public: { http: ['https://rpc.goerli.linea.build'] },
  default: { http: ['https://rpc.goerli.linea.build'] },
  },
  blockExplorers: {
  etherscan: { name: 'explorer', url: 'https://explorer.goerli.linea.build/' },
  default: { name: 'explorer', url: 'https://explorer.goerli.linea.build/' },
  },
  contracts: {
  multicall3: {
  address: '0xca11bde05977b3631167028862be2a173976ca11',
  blockCreated: 1,
  },
  },
  }

  export const testnet = {
    id: 9816,
    name: 'Buildbear Network',
    network: 'Buildbear Network',
    nativeCurrency: {
    decimals: 18,
    name: 'Buildbear Testnet',
    symbol: 'ETH',
    },
      iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZsG2HQt3pYcu8zI-oZtc7CxF3gbdn906Bmr0lfTiREwxTD15yH4hBC1nOF4t8ZtHHTQY&usqp=CAU',
    rpcUrls: {
    public: { http: ['https://rpc.buildbear.io/experimental-shmi-skywalker-ea650ee3'] },
    default: { http: ['https://rpc.buildbear.io/experimental-shmi-skywalker-ea650ee3'] },
    },
    blockExplorers: {
    etherscan: { name: 'explorer', url: 'https://explorer.buildbear.io/experimental-shmi-skywalker-ea650ee3/' },
    default: { name: 'explorer', url: 'https://explorer.buildbear.io/experimental-shmi-skywalker-ea650ee3/' },
    },
    contracts: {
    multicall3: {
    address: '0xca11bde05977b3631167028862be2a173976ca11',
    blockCreated: 1,
    },
    },
    }

const { chains, provider } = configureChains(
  [mainnet,linea, polygon, polygonMumbai, testnet],
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