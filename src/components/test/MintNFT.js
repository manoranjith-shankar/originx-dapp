import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import BoredApeYachtClub from '../contracts/BoredApeYachtClub.json';

const ContractAddress = '0xb84fbf6C453ce419c9da83a5400dbA63B0aE76C9';

const ContractInfo = () => {
  const [contract, setContract] = useState(null);
  const [totalSupply, setTotalSupply] = useState(0);
  const [mintCount, setMintCount] = useState(0);
  const [ownedTokens, setOwnedTokens] = useState([]);

  useEffect(() => {
    const initialize = async () => {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(ContractAddress, BoredApeYachtClub.abi, signer);
        setContract(contractInstance);

        const totalSupply = await contractInstance.totalSupply();
        setTotalSupply(totalSupply.toNumber());

        const mintCount = await contractInstance.getmintCount();
        setMintCount(mintCount.toNumber());

        const walletAddress = await signer.getAddress();
        const ownedTokens = await contractInstance.walletOfOwner(walletAddress);
        setOwnedTokens(ownedTokens.map((tokenId) => tokenId.toNumber()));
      }
    };

    initialize();
  }, []);

  return (
    <div>
      <h2>Contract Information:</h2>
      <p>Total Supply: {totalSupply}</p>
      <p>Mint Count: {mintCount}</p>
      <p>Owned Tokens: {ownedTokens.join(', ')}</p>
    </div>
  );
};

export default ContractInfo;