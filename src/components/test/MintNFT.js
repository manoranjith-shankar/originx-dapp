import React, { useState } from 'react';
import { ethers } from 'ethers';

const gradientStyle = {
  background: `linear-gradient(to right, var(--primary-color), var(--secondary-color))`,
  display: 'inline',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

const MintNFT = () => {
  // const [mintAmount, setMintAmount] = useState(1);
  // const [transactionStatus, setTransactionStatus] = useState('');

  // const handleMintAmountChange = (event) => {
  //   setMintAmount(parseInt(event.target.value, 10));
  // };

  // const handleMintNFT = async (collectionName) => {
  //   try {
  //     if (!window.ethereum) {
  //       throw new Error('Metamask not detected. Please install Metamask to use this feature.');
  //     }

  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();
  //     const contract = new ethers.Contract(contractAddress, abi, signer);

  //     const tx = await contract.mint(collectionName, mintAmount, {
  //       value: ethers.utils.parseEther((0.01 * mintAmount).toString()), // Mint cost is 0.01 ether per NFT
  //     });

  //     setTransactionStatus('Transaction submitted. Please wait for confirmation...');

  //     const receipt = await tx.wait();
  //     if (receipt.status === 1) {
  //       setTransactionStatus('NFT minted successfully!');
  //     } else {
  //       setTransactionStatus('Transaction failed.');
  //     }
  //   } catch (error) {
  //     setTransactionStatus(error.message);
  //   }
  // };

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
                  <div className="card-body d-flex justify-content-center">
                    <div
                      className="btn btn-bordered-white btn-smaller mt-3"
                    >
                      <i className="fa-solid fa-ticket mr-2" />
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
                      className="btn btn-bordered-white btn-smaller mt-3"
                    >
                      <i className="fa-solid fa-ticket mr-2" />
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