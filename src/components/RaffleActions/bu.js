import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import mainNftRaffle from '../contracts/mainNftRaffle.json';
import toast, { Toaster } from 'react-hot-toast';

const RaffleActions = () => {
  const { account } = useAccount();
  const accountAddress = useAccount().address;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const networkIdPromise = provider.getNetwork().then((network) => network.chainId);
  const contractPromise = networkIdPromise.then((networkId) =>
    new ethers.Contract(mainNftRaffle.networks[networkId].address, mainNftRaffle.abi, provider.getSigner(account))
  );
  const [initData] = useState({
    preHeading: "Open Raffles",
    heading: "Explore",
    btnText: "Load More"
  });

  const [totalRafflesOwned, setTotalRafflesOwned] = useState(null);
  const [raffleIdsOwned, setRaffleIdsOwned] = useState([]);
  const [raffleInfo, setRaffleInfo] = useState([]);

  useEffect(() => {
    const fetchRafflesOwned = async () => {
      try {
        const contract = await contractPromise;
        const rafflesOwned = await contract.getOwnedRaffles(accountAddress);
        const rafflesOwnedCount = rafflesOwned[0];
        const raffleIdsOwned = rafflesOwned[1];

        console.log(rafflesOwnedCount, '0');
        console.log(rafflesOwned[1], '2');
        if (rafflesOwnedCount === 0) {
          toast.error("You don't have any raffle owned");
        } else {
          const accountAddressSliced = accountAddress.slice(0, 6);
          toast(`Total raffles owned by ${accountAddressSliced} is ${rafflesOwnedCount}`, {
            duration: 6000,
          });
          toast(`Raffle Ids owned by ${accountAddressSliced} is ${raffleIdsOwned}`, {
            duration: 6000,
          });

          setTotalRafflesOwned(rafflesOwnedCount);
          setRaffleIdsOwned(raffleIdsOwned);

          const raffleInfoPromises = raffleIdsOwned.map(async (raffleId) => {
            const info = await contract.raffleInfo(raffleId);
            return {
              id: raffleId,
              info: info,
            };
          });

          const raffleInfoData = await Promise.all(raffleInfoPromises);
          setRaffleInfo(raffleInfoData);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchRafflesOwned();
  }, [account, contractPromise, accountAddress,[]]);

  return (
    <section className="explore-area load-more">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-7">
            {/* Intro */}
            <div className="intro text-center">
              <span>{initData.preHeading}</span>
              <h3 className="mt-3 mb-0">{initData.heading}</h3>
              <p>{initData.content}</p>
            </div>
          </div>
        </div>
        <div className="row items">
          {raffleInfo.map((raffle, idx) => (
            <div key={`raffle_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
              <div className="card">
                <div className="image-over">
                  <a href={`/raffle-details/${raffle.id}`}>
                    <img className="card-img-top" src={raffle.info.image} alt="" />
                  </a>
                </div>
                {/* Card Caption */}
                <div className="card-caption col-12 p-0">
                  {/* Card Body */}
                  <div className="card-body">
                    <a href={`/raffle-details/${raffle.id}`}>
                      <h5 className="mb-0">{raffle.info.title}</h5>
                    </a>
                    <div className="seller d-flex align-items-center my-3">
                      <span>Owned By</span>
                      <a href={`/owner-details/${raffle.info.owner}`}>
                        <h6 className="ml-2 mb-0">{raffle.info.owner}</h6>
                      </a>
                    </div>
                    <div className="card-bottom d-flex justify-content-between">
                      <span>{raffle.info.price}</span>
                      <span>{raffle.info.count}</span>
                    </div>
                    <a className="btn btn-bordered-white btn-smaller mt-3" href={`/raffle-details/${raffle.id}`}>
                      <i className="icon-handbag mr-2" />
                      {raffle.info.btnText}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <a id="load-btn" className="btn btn-bordered-white mt-5" href="#">
              {initData.btnText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );  
};

export default RaffleActions;