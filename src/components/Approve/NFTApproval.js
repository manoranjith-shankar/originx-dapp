import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';

const NFTApproval = () => {
  const raffleContractAddress = "0x2Be21151Ea927ff465768e635cad99C9Ef51E105"
  const [nftContractAddress, setNFTContractAddress] = useState('');
  const [nftId, setNFTId] = useState('');
  const [approving, setApproving] = useState(false);
  const [nftContract, setNFTContract] = useState(null);

  useEffect(() => {
    const fetchContractABI = async () => {
      try {
        // Get the provider from the current Ethereum provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // Fetch the contract ABI using the contract address
        const abi = await provider.getCode(nftContractAddress);
        console.log(abi);

        // Check if the contract ABI is valid
        if (abi === '0x') {
          console.log('Invalid contract address');
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
    try {
      setApproving(true);

      if (!nftContract) {
        throw new Error('Contract not available');
      }

      // Approve the raffle contract address to spend the NFT
      const approvalTx = await nftContract.approve(raffleContractAddress, nftId);

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
        <label htmlFor="nftId">NFT ID:</label>
        <input
          type="text"
          id="nftId"
          value={nftId}
          onChange={(e) => setNFTId(e.target.value)}
        />
      </div>
      <button
        className="btn btn-primary"
        onClick={handleNFTApproval}
        disabled={approving || !nftContract || !nftId}
      >
        {approving ? 'Approving NFT...' : 'Approve NFT'}
      </button>
    </div>
  );
};

export default NFTApproval;