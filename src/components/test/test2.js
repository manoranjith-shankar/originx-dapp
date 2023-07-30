import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import BoredApeYachtClub from '../contracts/BoredApeYachtClub.json';
import { useAccount } from 'wagmi';
import { erc721mumbai } from './erc721mumbai';

const Test2 = () => {
  const [mintAmount, setMintAmount] = useState(1);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { account } = useAccount();

  const handleMinting = async () => {
    const networkId = await provider.getNetwork().then((network) => network.chainId);
        const contract = new ethers.Contract(
          BoredApeYachtClub.networks[networkId].address,
          BoredApeYachtClub.abi,
          provider.getSigner(account)
        );

        try {
          const totalMintedNfts = await contract.getmintCount();
          const totalMinted = totalMintedNfts._hex;

          const tx = await contract.mint(1,{
            value: ethers.utils.parseEther('0.1')
          });
          console.log(tx);
          console.log(totalMinted, '1')
        } catch (error) {
          console.log(error);
        }
  }

  return (
    <section className="expore-area">
      <div className="container">
        <div className="item-form card no-hover">
          <div className="d-flex justify-content-center">
            <h2>
              Mint Test <div className="gradientStyle">NFTs</div>
            </h2>
          </div>
          <div className="row items d-flex justify-content-center">
            <div className="col-12 col-sm-6 col-lg-3 item">
              <div className="card no-hover" style={{ background: '#191919', boxShadow: '#fff' }}>
                <div className="image-over">
                  <img className="card-img-top" src={`${erc721mumbai[1].pic}`} alt="" />
                </div>
                <div className="nft-name-container">
                  <h4>BoredApeNFT</h4>
                </div>
                <div className="d-flex justify-content-center">
                  <p>Volume: 1000</p>
                </div>
                <div className="d-flex justify-content-center">
                  <input type="number" min="1" max="2" value={mintAmount} onChange={(e) => setMintAmount(e.target.value)} />
                </div>
                <div className="card-body d-flex justify-content-center" onClick={handleMinting}>
                  <div className="btn btn-bordered-white btn-larger mt-3">
                    Mint
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="image-over">
                <img className="card-img-top" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Test2;