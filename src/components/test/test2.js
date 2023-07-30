import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import BoredApeYachtClub from '../contracts/BoredApeYachtClub.json';
import Doodles from '../contracts/Doodles.json';
import InvisibleFriends from '../contracts/InvisibleFriends.json';
import CloneX from '../contracts/clonex.json';
import { useAccount } from 'wagmi';
import { erc721mumbai } from './erc721mumbai';
import toast, { Toaster } from 'react-hot-toast';

const Test2 = () => {
  const [mintAmount, setMintAmount] = useState(1);
  const [nftsMinted, setNftsMinted] = useState([]);
  const [ownedNFTs, setOwnedNFTs] = useState(0);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { account, address } = useAccount();
  console.log(nftsMinted, '0')
  console.log(address, '1')

  useEffect(() => {
    const fetchNftData = async () => {
      const networkId = await provider.getNetwork().then((network) => network.chainId);

        const contractBoredApe = new ethers.Contract(
          BoredApeYachtClub.networks[networkId].address,
          BoredApeYachtClub.abi,
          provider.getSigner(account)
        );

        const contractDoodles = new ethers.Contract(
          Doodles.networks[networkId].address,
          Doodles.abi,
          provider.getSigner(account)
        );

        const contractIF = new ethers.Contract(
          InvisibleFriends.networks[networkId].address,
          InvisibleFriends.abi,
          provider.getSigner(account)
        );

        const contractCloneX = new ethers.Contract(
          CloneX.networks[networkId].address,
          CloneX.abi,
          provider.getSigner(account)
        );

        try {
          const nftsBoredApe = await contractBoredApe.totalSupply();
          const nftsDoodles = await contractDoodles.totalSupply();
          const nftsIF = await contractIF.totalSupply();
          const nftsCloneX = await contractCloneX.totalSupply();
          setNftsMinted(nftsBoredApe,nftsDoodles,nftsIF,nftsCloneX);

          const ownedNFTs = await contractBoredApe.mintCount(address)
          setOwnedNFTs(ownedNFTs, '1');
          console.log(ownedNFTs, '2');
        } catch (error) {
          console.log(error)
        }

      }
      fetchNftData();
  },[provider, account, address])

  const handleMinting = async () => {
    toast.loading('Minting your NFT', {
      duration: 2500
    })
    const networkId = await provider.getNetwork().then((network) => network.chainId);
        const contract = new ethers.Contract(
          BoredApeYachtClub.networks[networkId].address,
          BoredApeYachtClub.abi,
          provider.getSigner(account)
        );

        try {
          const tx = await contract.mint(1,{
            value: ethers.utils.parseEther('0.1')
          });
          console.log(tx);
          toast.success('Minted Successfully.')
        } catch (error) {
          console.log(error);
        }
  }

  const handleMintingDoodles = async () => {
    toast.loading('Minting your NFT', {
      duration: 2500
    })
    const networkId = await provider.getNetwork().then((network) => network.chainId);
        const contract = new ethers.Contract(
          Doodles.networks[networkId].address,
          Doodles.abi,
          provider.getSigner(account)
        );

        try {
          const tx = await contract.mint(1,{
            value: ethers.utils.parseEther('0.1')
          });
          console.log(tx);
          toast.success('Minted Successfully.')
        } catch (error) {
          console.log(error);
        }
  }

  const handleMintingCloneX = async () => {
    toast.loading('Minting your NFT', {
      duration: 2500
    })
    const networkId = await provider.getNetwork().then((network) => network.chainId);
        const contract = new ethers.Contract(
          BoredApeYachtClub.networks[networkId].address,
          BoredApeYachtClub.abi,
          provider.getSigner(account)
        );

        try {
          const tx = await contract.mint(1,{
            value: ethers.utils.parseEther('0.1')
          });
          console.log(tx);
          toast.success('Minted Successfully.')
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
                  <p>Total Minted: {`${1}`}/10000</p>
                </div>
                <div className="d-flex justify-content-center">
                  <p>owned: {`${ownedNFTs}/10`}</p>
                </div>
                <div className="form-group">
                    <input
                      type="number"
                      min="1"
                      max="2"
                      required="required"
                      value={mintAmount}
                      onChange={(e) => setMintAmount(e.target.value)}
                    />
                  </div>
                <div className="card-body d-flex justify-content-center">
                  <button className="btn btn-bordered-white btn-larger mt-3" onClick={handleMinting}>
                    Mint
                  </button>
                </div>
              </div>
            </div>


            <div className="col-12 col-sm-6 col-lg-3 item">
              <div className="card no-hover" style={{ background: '#191919', boxShadow: '#fff' }}>
                <div className="image-over">
                  <img className="card-img-top" src={`${erc721mumbai[3].pic}`} alt="" />
                </div>
                <div className="nft-name-container">
                  <h4>Doodles</h4>
                </div>
                <div className="d-flex justify-content-center">
                  <p>Total Minted: {`${1}`}/10000</p>
                </div>
                <div className="d-flex justify-content-center">
                  <p>owned: {`${ownedNFTs}/10`}</p>
                </div>
                <div className="form-group">
                    <input
                      type="number"
                      min="1"
                      max="2"
                      required="required"
                      value={mintAmount}
                      onChange={(e) => setMintAmount(e.target.value)}
                    />
                  </div>
                <div className="card-body d-flex justify-content-center">
                  <button className="btn btn-bordered-white btn-larger mt-3" onClick={handleMintingDoodles}>
                    Mint
                  </button>
                </div>
              </div>
            </div>


            <div className="col-12 col-sm-6 col-lg-3 item">
              <div className="card no-hover" style={{ background: '#191919', boxShadow: '#fff' }}>
                <div className="image-over">
                  <img className="card-img-top" src={`${erc721mumbai[2].pic}`} alt="" />
                </div>
                <div className="nft-name-container">
                  <h4>CloneX</h4>
                </div>
                <div className="d-flex justify-content-center">
                  <p>Total Minted: {`${1}`}/10000</p>
                </div>
                <div className="d-flex justify-content-center">
                  <p>owned: {`${ownedNFTs}/10`}</p>
                </div>
                <div className="form-group">
                    <input
                      type="number"
                      min="1"
                      max="2"
                      required="required"
                      value={mintAmount}
                      onChange={(e) => setMintAmount(e.target.value)}
                    />
                  </div>
                <div className="card-body d-flex justify-content-center">
                  <button className="btn btn-bordered-white btn-larger mt-3" onClick={handleMintingCloneX}>
                    Mint
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" reverseOrder={true} toastOptions={{ className: '', duration: 5000, style: { background: '#363636', color: '#fff' } }} />
    </section>
  );
};

export default Test2;