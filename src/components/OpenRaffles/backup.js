import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import mainNftRaffle from '../contracts/mainNftRaffle.json';

const OpenRaffles = () => {
  const [initData] = useState({
    preHeading: "Exclusive Assets",
    heading: "Explore",
    btnText: "Explore More"
  });
  const [exploreData, setExploreData] = useState([]);
  const { account } = useAccount();
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  useEffect(() => {
    const totalRaffles = async () => {
      try {
        // Initialize ethers provider and contract instance
        const contract = new ethers.Contract(
          mainNftRaffle.networks['80001'].address,
          mainNftRaffle.abi,
          provider.getSigner(account)
        );
        // Retrieve the total number of raffles from the contract
        const totalRaffles = await contract.getTotalRaffles();
      
        // Fetch raffle details for each raffle
        const exploreData = [];
        for (let i = 1; i <= totalRaffles; i++) {
          const raffleInfo = await contract.raffleInfo(i);
          exploreData.push({
            id: raffleInfo.raffleId,
            img: raffleInfo.nftSourceLink,
            title: raffleInfo.raffleName,
            owner: raffleInfo.raffleCreator,
            price: raffleInfo.ticketPrice.toString(),
            availableTickets: `${(raffleInfo.totalSoldTickets - raffleInfo.totalVolumeofTickets)} of ${raffleInfo.totalVolumeofTickets}`,
            btnText: "Buy Ticket"
          });
        }
        console.log(totalRaffles)
        console.log(exploreData)
        setExploreData(exploreData);
      } catch (error) {
        console.log(error);
      }
    };

    totalRaffles();
  }, []);

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
              <div className="intro-btn">
                <a className="btn content-btn" href="/">
                  {initData.btnText}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row items">
          {exploreData.map((item, idx) => (
            <div key={`edt_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
              <div className="card">
                <div className="image-over">
                  <a href="/raffle-details">
                    <img className="card-img-top" src={item.img} alt="" />
                  </a>
                </div>
                {/* Card Caption */}
                <div className="card-caption col-12 p-0">
                  {/* Card Body */}
                  <div className="card-body">
                    <a href="/raffle-details">
                      <h5 className="mb-0">{item.title}</h5>
                    </a>
                    <div className="seller d-flex align-items-center my-3">
                      <span>Owned By</span>
                      <a href="https://etherscan.io/address/">
                        <h6 className="ml-2 mb-0">{item.owner}</h6>
                      </a>
                    </div>
                    <div className="card-bottom d-flex justify-content-between">
                      <span>{item.price}</span>
                      <span>{item.availableTickets}</span>
                    </div>
                    <a className="btn btn-bordered-white btn-smaller mt-3" href="/">
                      <i className="icon-handbag mr-2" />
                      {item.btnText}
                    </a>
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
