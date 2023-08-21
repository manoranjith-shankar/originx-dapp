import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Moralis from 'moralis';
import BoredApeYachtClub from '../contracts/BoredApeYachtClub.json'
import InvisibleFriends from '../contracts/InvisibleFriends.json'
import Doodles from '../contracts/Doodles.json'
import clonex from '../contracts/clonex.json'
import mainNftRaffle from '../contracts/mainNftRaffle.json';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAccount, useNetwork } from 'wagmi';
import originxRaffler from '../contracts/originxRaffler.json';

const gradientStyle = {
  background: `linear-gradient(to right, var(--primary-color), var(--secondary-color))`,
  display: 'inline',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

const NFTSelect = () => {
  const { address } = useAccount();
  const [nftData, setNftData] = useState([]);
  const navigate = useNavigate();
  const { chain } = useNetwork();
  const networkId = chain.id;

  const contractAbis = {
    [BoredApeYachtClub.networks[networkId].address] : BoredApeYachtClub.abi,
    [InvisibleFriends.networks[networkId].address]: InvisibleFriends.abi,
    [Doodles.networks[networkId].address]: Doodles.abi,
    [clonex.networks[networkId].address]: clonex.abi,
  };

  useEffect(() => {
    
    const fetchData = async () => {
      await Moralis.start({
        apiKey: "3n9ve0Gtkrtcx4WAaessSXqWddDgv9LeEGjkUwpIRYRbGE0UNgB441XDlTArgcia",
      });
      try {
        const response = await Moralis.EvmApi.nft.getWalletNFTs({
          chain: chain.id,
          format: "decimal",
          mediaItems: false,
          normalizeMetadata: true,
          address: address,
        });
        setNftData(response.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleNftSelect = async (tokenId, tokenAddress, name, imageSource) => {
    toast.loading('Selecting this NFT, Please confirm in your wallet', {
      duration: 3000,
    });
    const tAddress = tokenAddress._value;
    let contractAddress;
    try {
      const contractAbi = contractAbis[tAddress];
      console.log('Contract ABI for token address:', tAddress);
      if (!contractAbi) {
        console.error('Contract ABI not found for token address:', tokenAddress);
        return;
      }
  
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      if(networkId === 11155111) {
         contractAddress = originxRaffler.networks[networkId].address
      }
      else {
         contractAddress = mainNftRaffle.networks[networkId].address
      }
      
      console.log(networkId, contractAddress, '1');
      const contract = new ethers.Contract(tAddress, contractAbi, signer);
      
      const approvalTx = await contract.setApprovalForAll(contractAddress, true);
      toast.loading("Approving NFT...Please wait");
      await approvalTx.wait();

      console.log('Approval transaction:', approvalTx.hash);
      navigate(`/create/${tokenId}/${tAddress}/${name}/${encodeURIComponent(imageSource)}`, {
        state: { preserveScroll: true },
      });
    } catch (error) {
      console.log(error);
      toast.error('Error Approving NFT, Please try again')
    }
  }

  console.log(nftData);

  return (
    <section className="expore-area">
    <div className="container">
      <div className="item-form card no-hover">
        <div className="d-flex justify-content-center">
            <h2>Select an <div style={gradientStyle}>NFT</div></h2>
        </div>
          <div className="row items">
            {nftData.map((item, idx) => (
              <div key={`edt_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                <div className="card" style={{background: '#191919', boxShadow:'#fff'}}>
                  <div className="image-over">
                    <a href={`${item.metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/')}`} target={'_blank'}>
                      <img className="card-img-top" src={item.metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/')} alt="" />
                    </a>
                  </div>
                  <div className="nft-name-container">
                    <h5>{item.name}</h5>
                    <p style={{marginTop: '-0.5rem'}}>#{item.tokenId}</p>
                  </div>
                  <div className="card-caption col-12 p-0">
                    <div className="card-body d-flex justify-content-center">
                    <div
                        className="btn btn-bordered-white btn-smaller mt-3"
                        onClick={() =>
                          handleNftSelect(
                            item.tokenId,
                            item.tokenAddress,
                            item.name,
                            item.metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/'),
                          )
                        }
                      >
                        <FontAwesomeIcon icon={faArrowRight} />
                        <i className="fa-solid fa-ticket mr-2" />
                        Select
                      </div>
                      {/* <div
                        className="btn btn-bordered-white btn-smaller mt-3"
                        onClick={() =>
                          hanldeApproveNft(
                            item.tokenAddress,
                          )
                        }
                      >
                        <FontAwesomeIcon icon={faArrowRight} />
                        <i className="fa-solid fa-ticket mr-2" />
                        Approve
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" reverseOrder={true} toastOptions={{ className: '', duration: 5000, style: { background: '#363636', color: '#fff' } }} />
    </section>
  );
};

export default NFTSelect;