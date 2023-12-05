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
  name: 'Linea Testnet',
  network: 'Linea',
  nativeCurrency: {
  decimals: 18,
  symbol: 'ETH',
  },
    iconUrl: 'https://pbs.twimg.com/profile_images/1639402103486521344/erDLnbwE_400x400.jpg',
  rpcUrls: {
  public: { http: ['https://sepolia.infura.io/v3/569707d18f6749d78d01b7342e91db2e'] },
  default: { http: ['https://sepolia.infura.io/v3/569707d18f6749d78d01b7342e91db2e'] },
  },
  blockExplorers: {
  etherscan: { name: 'explorer', url: 'https://sepolia.etherscan.io' },
  default: { name: 'explorer', url: 'https://sepolia.etherscan.io' },
  },
  contracts: {
  multicall3: {
  address: '0xca11bde05977b3631167028862be2a173976ca11',
  blockCreated: 1,
  },
  },
  }

  export const sepolia = {
    id: 11155111,
    name: 'Sepolia',
    network: 'sepolia',
    nativeCurrency: {
    decimals: 18,
    symbol: 'ETH',
    },
      iconUrl: 'https://cryptologos.cc/logos/versions/ethereum-eth-logo-diamond-purple.svg?v=026',
    rpcUrls: {
    public: { http: ['https://sepolia.infura.io/v3/569707d18f6749d78d01b7342e91db2e'] },
    default: { http: ['https://sepolia.infura.io/v3/569707d18f6749d78d01b7342e91db2e'] },
    },
    blockExplorers: {
    etherscan: { name: 'explorer', url: 'https://sepolia.etherscan.io' },
    default: { name: 'explorer', url: 'https://sepolia.etherscan.io' },
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
    public: { http: ['https://rpc.buildbear.io/wily-wicket-systri-warrick-cbc4fb67'] },
    default: { http: ['https://rpc.buildbear.io/wily-wicket-systri-warrick-cbc4fb67'] },
    },
    blockExplorers: {
    etherscan: { name: 'explorer', url: 'https://explorer.buildbear.io/wily-wicket-systri-warrick-cbc4fb67/transactions' },
    default: { name: 'explorer', url: 'https://explorer.buildbear.io/wily-wicket-systri-warrick-cbc4fb67/transactions' },
    },
    contracts: {
    multicall3: {
    address: '0xca11bde05977b3631167028862be2a173976ca11',
    blockCreated: 1,
    },
    },
    }

const { chains, provider } = configureChains(
  [ linea, sepolia, polygonMumbai ],
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