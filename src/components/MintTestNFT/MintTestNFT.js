import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import BoredApeYachtClub from '../contracts/BoredApeYachtClub.json';
import Doodles from '../contracts/Doodles.json';
import InvisibleFriends from '../contracts/InvisibleFriends.json';
import clonex from '../contracts/clonex.json';
import { useAccount } from 'wagmi';
import { erc721mumbai } from '../test/erc721mumbai';
import toast, { Toaster } from 'react-hot-toast';
import Modal1 from './modal'

const MintTestNFT = () => {
  const [mintAmount, setMintAmount] = useState(1);
  const [nftsMinted, setNftsMinted] = useState([]);
  const [ownedNFTs, setOwnedNFTs] = useState([]);
  const [mintedImageURI, setMintedImageURI] = useState('');
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { account, address } = useAccount();
  console.log(mintedImageURI, '0')

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
          clonex.networks[networkId].address,
          clonex.abi,
          provider.getSigner(account)
        );

        try {
          const nftsBoredApe = await contractBoredApe.totalSupply();
          const nftsDoodles = await contractDoodles.totalSupply();
          const nftsIF = await contractIF.totalSupply();
          const nftsCloneX = await contractCloneX.totalSupply();
          setNftsMinted([nftsBoredApe,nftsDoodles,nftsIF,nftsCloneX]);

          const ownedNFTsBA = await contractBoredApe.mintCount(address)
          const ownedNFTsDD = await contractDoodles.mintCount(address)
          const ownedNFTsIF = await contractIF.mintCount(address)
          const ownedNFTsCX = await contractCloneX.mintCount(address)
          setOwnedNFTs([ownedNFTsBA,ownedNFTsDD,ownedNFTsIF,ownedNFTsCX]);

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

          const imageURI = await erc721mumbai[0].pic;
          setMintedImageURI(imageURI);
          toast.success('Minted Successfully.')
          console.log(tx);
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

  const handleMintingIF = async () => {
    toast.loading('Minting your NFT', {
      duration: 2500
    })
    const networkId = await provider.getNetwork().then((network) => network.chainId);
        const contract = new ethers.Contract(
          InvisibleFriends.networks[networkId].address,
          InvisibleFriends.abi,
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
                  <h4>BoredApe NFT</h4>
                </div>
                <div className="d-flex justify-content-center">
                  <p>Total Minted: {`${nftsMinted[0]}`}/10000</p>
                </div>
                <div className="d-flex justify-content-center">
                  <p className='p-override'>owned: {`${ownedNFTs[0]}/10`}</p>
                </div>
                <div className="form-group">
                    <input
                      type="number"
                      className="form-control-overide"
                      min="1"
                      max="2"
                      required="required"
                      value={mintAmount}
                      onChange={(e) => setMintAmount(e.target.value)}
                    />
                  </div>
                <div className="card-body d-flex justify-content-center" style={{padding:'12px'}}>
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
                  <p>Total Minted: {`${nftsMinted[1]}`}/10000</p>
                </div>
                <div className="d-flex justify-content-center">
                  <p className='p-override'>owned: {`${ownedNFTs[1]}/10`}</p>
                </div>
                <div className="form-group">
                    <input
                      type="number"
                      className='form-control-overide'
                      min="1"
                      max="2"
                      required="required"
                      value={mintAmount}
                      onChange={(e) => setMintAmount(e.target.value)}
                    />
                  </div>
                <div className="card-body d-flex justify-content-center" style={{padding:'12px'}}>
                  <button className="btn btn-bordered-white btn-larger mt-3" onClick={handleMintingDoodles}>
                    Mint
                  </button>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3 item">
              <div className="card no-hover" style={{ background: '#191919', boxShadow: '#fff' }}>
                <div className="image-over">
                  <img className="card-img-top" src={`${erc721mumbai[5].pic}`} alt="" />
                </div>
                <div className="nft-name-container">
                  <h4>Invisible Friends</h4>
                </div>
                <div className="d-flex justify-content-center">
                  <p>Total Minted: {`${nftsMinted[2]}`}/10000</p>
                </div>
                <div className="d-flex justify-content-center">
                  <p className='p-override'>owned: {`${ownedNFTs[2]}/10`}</p>
                </div>
                <div className="form-group">
                    <input
                      type="number"
                      className='form-control-overide'
                      min="1"
                      max="2"
                      required="required"
                      value={mintAmount}
                      onChange={(e) => setMintAmount(e.target.value)}
                    />
                  </div>
                <div className="card-body d-flex justify-content-center"  style={{padding:'12px'}}>
                  <button className="btn btn-bordered-white btn-larger mt-3" onClick={handleMintingIF}>
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
                  <p>Total Minted: {`${nftsMinted[3]}`}/10000</p>
                </div>
                <div className="d-flex justify-content-center">
                  <p className='p-override'>owned: {`${ownedNFTs[3]}/10`}</p>
                </div>
                <div className="form-group">
                    <input
                      type="number"
                      className='form-control-overide'
                      min="1"
                      max="2"
                      required="required"
                      value={mintAmount}
                      onChange={(e) => setMintAmount(e.target.value)}
                    />
                  </div>
                <div className="card-body d-flex justify-content-center" style={{padding:'12px'}}>
                  <button className="btn btn-bordered-white btn-larger mt-3" onClick={handleMintingCloneX}>
                    Mint
                  </button>
                </div>
              </div>
            </div>

            {mintedImageURI && <Modal1 imageURI={mintedImageURI} />}
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" reverseOrder={true} toastOptions={{ className: '', duration: 5000, style: { background: '#363636', color: '#fff' } }} />
    </section>
  );
};

export default MintTestNFT;