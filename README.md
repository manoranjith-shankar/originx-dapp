# OriginX &middot; [![Build Status](https://img.shields.io/travis/npm/npm/latest.svg?style=flat-square)](https://travis-ci.org/npm/npm) [![npm](https://img.shields.io/npm/v/npm.svg?style=flat-square)](https://www.npmjs.com/package/npm) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/your/your-project/blob/master/LICENSE)

NFT Raffle Charity DApp empowers NFT creators and collectors to monetize their digital assets while supporting charitable causes. It provides a platform for NFT owners to list their digital assets for raffle tickets, and users can purchase these tickets for a chance to win unique NFTs. The DApp also ensures that part of the raffle pool goes to a chosen charity, allowing users to support a cause while participating in the raffle.

In simple words, By listing their NFTs for raffle tickets, NFT owners can generate more interest and excitement around their digital assets, while also contributing to a good cause.

## Getting started

> You must have [node.js](https://nodejs.org/en/download) installed

A quick introduction of the minimal setup you need to get a hello world up &
running.

```shell
npm install --save
npm start
```

This should start the dApp at [localhost](https://localhost:3000)

## Contracts

### Add Mnemonic

> In the backend directory, rename .env.example to .env and add your Private key.

### Deploy

After adding the private key in .env, you can deploy the contract.

```shell
cd backend
truffle compile
truffle deploy --network fantom
```

To deploy the contract on fantom mainnet forked private testnet (buildbear testnet).

```shell
truffle migrate --network testnet
```

### Approve NFT

> Deployed contract address of the ERC721 Standard is required.

Approve the deployed contract address in the Fantom network with the Id of the
ERC721 Standard, to create raffle.

After the raffle had been created successfully, it updates in [localhost/raffles](https://localhost:3000/raffles). You can buy tickets and use [localhost/raffle-owner](https://localhost:3000/raffle-owner), to pick a winner.

### Configure addresses

> /backend/contracts/mainNftRaffle.sol

Update the development team address with your own address.

> /src/components/Create/Create.js

Update the charity address with your own address.

### Built With

React
Solidity
Truffle
wagmi
DigitalOcean