import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Moralis from 'moralis';
import BoredApeYachtClub from '../contracts/BoredApeYachtClub.json'
import InvisibleFriends from '../contracts/InvisibleFriends.json'
import Doodles from '../contracts/Doodles.json'
import clonex from '../contracts/clonex.json'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';

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

  const contractAbis = {
    '0xF1bC4eF3e193983e4DF78106e854583348b55B95': BoredApeYachtClub.abi,
    '0xE1348248a5c4E7073382Ec50E8CcD8B64620Cd1c': InvisibleFriends.abi,
    '0x00F219B49160CeA9A00bA8856CC1544db2c92de7': Doodles.abi,
    '0x1F4A47AF4f27dd89D466BBEF4946F1179377Dc11': clonex.abi,
  };

  useEffect(() => {
    const fetchData = async () => {
      await Moralis.start({
        apiKey: "3n9ve0Gtkrtcx4WAaessSXqWddDgv9LeEGjkUwpIRYRbGE0UNgB441XDlTArgcia",
      });
      try {
        const response = await Moralis.EvmApi.nft.getWalletNFTs({
          chain: "0x13881",
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

  const handleNftSelect = async (tokenId, tokenAddress, imageSource) => {
    toast.loading('Please confirm in your wallet', {
      duration: 3000,
    });
    const tAddress = tokenAddress._value;
    try {
      const contractAbi = contractAbis[tAddress];
      console.log('Contract ABI for token address:', tAddress);
      if (!contractAbi) {
        console.error('Contract ABI not found for token address:', tokenAddress);
        return;
      }
  
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tAddress, contractAbi, signer);
  
      const approvalTx = await contract.setApprovalForAll('0x3B99e6D692298c83E8143c7FC353AF24DbfE7736', true);
      await approvalTx.wait();

      console.log('Approval transaction:', approvalTx.hash);
      navigate(`/create/${tokenId}/${tAddress}/${encodeURIComponent(imageSource)}`, {
        state: { preserveScroll: true },
      });
    } catch (error) {
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