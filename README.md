# OriginX &middot; [![npm](https://img.shields.io/npm/v/npm.svg?style=flat-square)](https://www.npmjs.com/package/npm) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/your/your-project/blob/master/LICENSE)

## originX

originX is a Charitable NFT Raffler, a decentralized application that allows users to 
participate in raffles where the prizes are non-fungible tokens (NFTs). The raffles are 
organized with the purpose of raising funds for charitable causes, making it a unique 
and impactful way to engage with the community and support philanthropic initiatives.

In simple words, originX is a combination of opensea for NFT ethusiasts and GoFundMe for donators who raise funds for a cause. By listing their assests, NFT owners get an incentive of 5% of their set selling price (no bidding nor bargaining). while, the users buys tickets for raffles to get a chance to be a random winner of the NFT. On an average of **0.3 ETH** goes to charity for every **1 ETH** being raffled.

- refer. [Raffle Information](https://originx-docs.0xc0d3rs.tech/overview/raffle-pool)

### How it works

- Connect your wallet, mint an NFT.
- select the NFT you want to sell/raffle from.
- fill out the create form, set total tickets, end date and yupp. your first raffle is created.
- spread the word and let the users buy tickets for it.
- pick a random winner aaaand boom! **you've sold your NFT** **while also supporting a cause.** ***(also got a 5% incentive)***

> Detailed information and example usage, please take a look at our [originX docs](https://originx-docs.0xc0d3rs.tech/getting-started/creating-a-raffle)

## Getting started

### Requirements

- nodeJs
- npm
- web3 provider private key
- Infura chain RPC API (optional)

### Installation

A quick introduction of the minimal setup you need to get a hello world up &
running.

```shell
npm install --save
```

### Backend Contracts
### Add priv_key
- In the backend directory, rename .env.example to .env and add your Private key of the provider.

### Deploy
After adding the private key in .env, you can deploy the contract.

```shell
cd backend
truffle compile
truffle deploy --network linea
```
This will deploy the contract in the linea testnet, you can also deploy in sepolia.

```shell
npm start
```
This should start the dApp at [localhost:3000](https://localhost:3000)

## Usage of multiple consensys products: Make a Dapp That Slaps, No Cap

- Infura (Rpc APIs)
- Linea (contract deployment)
- Truffle project