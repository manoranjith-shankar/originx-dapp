import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Moralis from 'moralis';
import { useAccount } from 'wagmi';

const NFTSelect = () => {
  const { address } = useAccount();
  const [nftData, setNftData] = useState([]);

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

  const hanldeNftSelect = () => {
    
  }
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
                      <a rel="noreferrer" target="_blank" href={item.tokenAddress}>
                        <h5 className="mb-0">{item.metadata.title}</h5>
                      </a>
                      <a className="btn btn-bordered-white btn-smaller mt-3 justify-content-between" href='' onClick={hanldeNftSelect}>
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