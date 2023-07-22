import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Moralis from 'moralis';
import { Link, useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';

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
    navigate(`/create/${tokenId}/${tokenAddress}/${encodeURIComponent(imageSource)}`);
  };

  console.log(address);
  console.log(nftData);

  return (
    <section className="expore-area">
      <div className="item-form card no-hover">
        <div className="container">
          <div className="row items">
            {nftData.map((item, idx) => {
              try {
                const imageUrl = item.metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/');
                return (
                  <div key={`edt_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                    <div className="card">
                      <div className="image-over">
                        <a href={imageUrl} target={'_blank'}>
                          <img className="card-img-top" src={imageUrl} alt="" />
                        </a>
                      </div>
                      <div className="nft-name-container">
                        <h5>{item.name}</h5>
                        <p style={{ marginTop: '-0.5rem' }}>#{item.tokenId}</p>
                      </div>
                      <div className="card-caption col-12 p-0">
                        <div
                          className="btn btn-bordered-white btn-smaller mt-3 justify-content-between"
                          onClick={() =>
                            handleNftSelect(item.tokenId, item.tokenAddress, imageUrl)
                          }
                        >
                          <FontAwesomeIcon icon={faArrowRight} />
                          <i className="fa-solid fa-ticket mr-2" />
                          Select
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } catch (error) {
                console.error(error);
                return null; // Ignore the NFT with errors and proceed to the next one
              }
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NFTSelect;