import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Moralis from 'moralis';

const NFTSelect = () => {
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
          mediaItems: true,
          address: "0xEE8062a19bF3B9a66A222F9bc15aC8b97f56A2FA",
        });

        console.log(response.result, '0');
        setNftData(response.result);
        console.log(typeof(response), '1');
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="expore-area">
      <div className="item-form card no-hover">
        <div>
          <p>{JSON.stringify(nftData)}</p>
        </div>
        {/* <div className="container">
          <div className="row items">
            {nftData.map((item, idx) => (
              <div key={`edt_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                <div className="card">
                  <div className="image-over">
                    <a href="/">
                      <img className="card-img-top" src={item.metadata.image} alt="" />
                    </a>
                  </div>
                  <div className="justify-content-center">
                    <h2>{item.metadata.name}</h2>
                    <div className="justify-content-center">
                      <p>#{item.token_id}</p>
                    </div>
                  </div>
                  <div className="card-caption col-12 p-0">
                    <div className="card-body">
                      <a rel="noreferrer" target="_blank" href={item.metadata.external_url}>
                        <h5 className="mb-0">{item.metadata.title}</h5>
                      </a>
                      <Link
                        className="btn btn-bordered-white btn-smaller mt-3 justify-content-between"
                        to={`/buytickets/${idx + 1}`}
                      >
                        <FontAwesomeIcon icon={faTicket} />
                        <i className="fa-solid fa-ticket mr-2" />
                        {item.btnText}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default NFTSelect;