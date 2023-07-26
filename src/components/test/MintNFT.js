import React, { useState } from 'react';
import { ethers } from 'ethers';
import  BoredApeYachtClub  from '../contracts/BoredApeYachtClub.json'
import { useAccount } from 'wagmi';

const gradientStyle = {
  background: `linear-gradient(to right, var(--primary-color), var(--secondary-color))`,
  display: 'inline',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

const MintNFT = () => {
  const account = useAccount();
  const [mintAmount, setMintAmount] = useState(1);
  const [transactionStatus, setTransactionStatus] = useState('');
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const handleBoredApeNft = async () => {
    try {
      const contract = new ethers.Contract(
        BoredApeYachtClub.networks['8001'].address,
        BoredApeYachtClub.abi,
        provider.getSigner(account)
      );
      
      const totalPayable = 0.1 * mintAmount;
      const result = await contract.mint(mintAmount, {
        value: totalPayable
      });
    } catch (error) {
      console.log(error);
    }
  }

  const hanldeMintAmountChange = async (event) => {
    
  }

  const handleMintNFT = async (collectionName) => {
    try {
      if (!window.ethereum) {
        throw new Error('Metamask not detected. Please install Metamask to use this feature.');
      }
      const contract = new ethers.Contract(
        BoredApeYachtClub.networks['8001'].address,
        BoredApeYachtClub.abi,
        provider.getSigner(account)
      );

      const tx = await contract.mint(collectionName, mintAmount, {
        value: ethers.utils.parseEther((0.01 * mintAmount).toString()), // Mint cost is 0.01 ether per NFT
      });

      setTransactionStatus('Transaction submitted. Please wait for confirmation...');

      const receipt = await tx.wait();
      if (receipt.status === 1) {
        setTransactionStatus('NFT minted successfully!');
      } else {
        setTransactionStatus('Transaction failed.');
      }
    } catch (error) {
      setTransactionStatus(error.message);
    }
  };

  return (
    <section className="expore-area">
      <div className="container">
        <div className="item-form card no-hover">
          <div className="d-flex justify-content-center">
            <h3>Mint Test <div style={gradientStyle}>NFT</div></h3>
          </div>
          <div className="row items d-flex justify-content-center">
            <div className="col-12 col-sm-6 col-lg-3 item">
              <div className="card" style={{ background: '#191919', boxShadow: '#fff' }}>
                <div className="image-over">
                  <img className="card-img-top" src="boredApeNftImageLink" alt="" />
                </div>
                <div className="nft-name-container">
                  <h5>BoredApeNFT</h5>
                </div>
                <div className="row items">
                  <div className="card no-hover">
                    <h6 className="mt-0 mb-2">Mint amount</h6>
                      <input type="number" min="1" max="2" value={mintAmount} onChange={hanldeMintAmountChange} />
                  </div>
              </div>
                  <div className="card-body d-flex justify-content-center">
                    <div
                      className="btn btn-bordered-white btn-smaller mt-3" onClick={handleBoredApeNft}>
                      Mint
                    </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3 item">
              <div className="card" style={{ background: '#191919', boxShadow: '#fff' }}>
                <div className="image-over">
                  <img className="card-img-top" src="doodlesImageLink" alt="" />
                </div>
                <div className="nft-name-container">
                  <h5>Doodles</h5>
                </div>
                <div className="card-caption col-12 p-0">
                  <div className="card-body d-flex justify-content-center">
                    <div
                      className="btn btn-bordered-white btn-smaller mt-3">
                      Mint
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MintNFT;