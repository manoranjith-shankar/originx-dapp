import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';

const NFTApproval = () => {
  const [nftContractAddress, setNFTContractAddress] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [nftContract, setNFTContract] = useState(null);
  const [approving, setApproving] = useState(false);

  useEffect(() => {
    const fetchContractABI = async () => {
      try {
        // Get the provider from the current Ethereum provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // Fetch the contract ABI using the contract address
        const abi = await provider.getContractAbi(nftContractAddress);

        // Check if the contract ABI is valid
        if (!abi) {
          throw new Error('Invalid contract address');
        }

        // Create the contract instance for the NFT
        const contract = new ethers.Contract(nftContractAddress, abi, provider);
        setNFTContract(contract);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch contract ABI');
      }
    };

    if (nftContractAddress) {
      fetchContractABI();
    } else {
      setNFTContract(null);
    }
  }, [nftContractAddress]);

  const handleNFTApproval = async () => {
    
    const raffleContractAddress = "0xB059d9EDd4255aa20372471ce7F3ECf5376dF444";
    
    try {
      setApproving(true);

      if (!nftContract) {
        throw new Error('Contract not available');
      }

      // Approve the raffle contract address to spend the NFT
      const approvalTx = await nftContract.approve(raffleContractAddress, tokenId);

      // Wait for the approval transaction to be mined
      await approvalTx.wait();

      toast.success('NFT Approved successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to approve NFT');
    } finally {
      setApproving(false);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="nftContractAddress">NFT Contract Address:</label>
        <input
          type="text"
          id="nftContractAddress"
          value={nftContractAddress}
          onChange={(e) => setNFTContractAddress(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="tokenId">Token ID:</label>
        <input
          type="text"
          id="tokenId"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
        />
      </div>
      <button
        className="btn btn-primary"
        onClick={handleNFTApproval}
        disabled={!nftContract || !tokenId || approving}
      >
        {approving ? 'Approving NFT...' : 'Approve NFT'}
      </button>
    </div>
  );
};

export default NFTApproval;