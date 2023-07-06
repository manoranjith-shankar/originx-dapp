import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import mainNftRaffle from '../contracts/mainNftRaffle.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const OpenRaffles = () => {
  const [initData] = useState({
    preHeading: "Explore",
    heading: "Open Raffles",
    btnText: "Explore More"
  });
  const [exploreData, setExploreData] = useState([]);
  const { account } = useAccount();

  const shortenAddress = (address) => {
    if (address.length <= 8) {
      return address;
    }
    return `${address.slice(0, 5)}...${address.slice(-3)}`;
  };

  const parseEther = (amount) => {
    return ethers.utils.formatEther(amount);
  };

  useEffect(() => {
    const fetchRaffles = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      try {
        const networkId = await provider.getNetwork().then((network) => network.chainId);
        // Initialize ethers provider and contract instance
        const contract = new ethers.Contract(
          mainNftRaffle.networks[networkId].address,
          mainNftRaffle.abi,
          provider.getSigner(account)
        );

        // Retrieve the total number of raffles from the contract
        const totalRaffles = await contract.getTotalRaffles();
      
        // Fetch raffle details for each raffle
        const exploreData = [];
        for (let i = 1; i <= totalRaffles; i++) {
          const raffleInfo = await contract.raffleInfo(i);
          
          const owner = shortenAddress(raffleInfo.raffleCreator);
          const price = parseEther(raffleInfo.ticketPrice);
          const availableTickets = `${raffleInfo.totalVolumeofTickets - raffleInfo.totalSoldTickets} of ${raffleInfo.totalVolumeofTickets}`;

          exploreData.push({
            id: raffleInfo.raffleID,
            img: raffleInfo.nftSourceLink,
            title: raffleInfo.raffleName,
            owner: owner,
            price: price.slice(0,8),
            availableTickets: availableTickets,
            btnText: "Buy Tickets"
          });
        }

        setExploreData(exploreData);
        console.log(exploreData);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchRaffles();
  }, [account], []);

  return (
    <section className="explore-area">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* Intro */}
            <div className="intro d-flex justify-content-between align-items-end m-0">
              <div className="intro-content">
                <span>{initData.preHeading}</span>
                <h3 className="mt-3 mb-0">{initData.heading}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="row items">
          {exploreData.map((item, idx) => (
            <div key={`edt_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
              <div className="card">
                <div className="image-over">
                  <a href="/">
                    <img className="card-img-top" src={item.img} alt="" />
                  </a>
                </div>
                {/* Card Caption */}
                <div className="card-caption col-12 p-0">
                  {/* Card Body */}
                  <div className="card-body">
                    <a rel="noreferrer" target={"_blank"} href={`${item.img}`}>
                      <h5 className="mb-0">{item.title}</h5>
                    </a>
                    <div className="seller d-flex align-items-center my-3">
                      <span>Owned By</span>
                      <a href={`https://mumbai.polygonscan.com/address/`}>
                        <h6 className="ml-2 mb-0">{item.owner}</h6>
                      </a>
                    </div>
                    <div className="card-bottom d-flex justify-content-between">
                      <span>{item.price} FTM</span>
                      <span>{item.availableTickets}</span>
                    </div>
                    <Link className= "btn btn-bordered-white btn-smaller mt-3" to={`/buytickets/${idx + 1}`}>
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
      </div>
    </section>
  );
};

export default OpenRaffles;
