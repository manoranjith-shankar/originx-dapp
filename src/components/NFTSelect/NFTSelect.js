import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Moralis from 'moralis';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';

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

  const handleNftSelect = (tokenId, tokenAddress, imageSource) => {
    const tAddress = tokenAddress._value;
    navigate(`/create/${tokenId}/${tAddress}/${encodeURIComponent(imageSource)}`, {
      state: { preserveScroll: true },
    });
  };
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
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NFTSelect;