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
    // Navigate to the CreateRaffle component with URL parameters
    navigate(`/create/${tokenId}/${tokenAddress}/${encodeURIComponent(imageSource)}`);
  };

  console.log(address);
  console.log(nftData);

  return (
    <section className="expore-area">
      <div className="item-form card no-hover">
        <div>
          <p>{JSON.stringify(nftData)}</p>
        </div>
        <div className="container">
          <div className="row items">
            {nftData.map((item, idx) => (
              <div key={`edt_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                <div className="card">
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
                    <div className="card-body">
                    <a
                        className="btn btn-bordered-white btn-smaller mt-3 justify-content-between"
                        href=""
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
                      </a>
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