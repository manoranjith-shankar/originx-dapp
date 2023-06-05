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

  const shortenAddress = (address) => {
    if (address.length <= 8) {
      return address;
    }
    return `${address.slice(0, 5)}...${address.slice(-3)}`;
  };

  const parseEther = (amount) => {
    if(amount === ethers){
      return amount
    }
    else {
    return ethers.utils.formatEther(amount);
    }
  };

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

          setTotalRafflesOwned(rafflesOwnedCount);
          setRaffleIdsOwned(raffleIdsOwned);

          const raffleInfoPromises = raffleIdsOwned.map(async (raffleId) => {
            const raffleInfo = await contract.raffleInfo(raffleId);

            const owner = shortenAddress(raffleInfo.raffleCreator);
            const price = parseEther(raffleInfo.ticketPrice);
            const availableTickets = `${raffleInfo.totalVolumeofTickets - raffleInfo.totalSoldTickets} of ${raffleInfo.totalVolumeofTickets}`;

            return {
              id: raffleId,
              img: raffleInfo.nftSourceLink,
              title: raffleInfo.raffleName,
              owner: owner,
              price: price.slice(0,6),
              availableTickets: availableTickets,
              btnText: "Buy Tickets"
            };
          });

          const raffleInfoData = await Promise.all(raffleInfoPromises);
          setRaffleInfo(raffleInfoData);
          console.log(raffleInfoData);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchRafflesOwned();
  }, [account, contractPromise, accountAddress],[]);

  if (totalRafflesOwned === 0) {
    toast.error("You don't have any raffle owned");
  } else {
    const accountAddressSliced = accountAddress.slice(0, 6);
    toast(`Total raffles owned by ${accountAddressSliced} is ${totalRafflesOwned}`, {
      duration: 6000,
    });
    toast(`Raffle Ids owned by ${accountAddressSliced} is ${raffleIdsOwned}`, {
      duration: 6000,
    });
  }

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
                  <a href={`/raffle/${raffle.id}`}>
                    <img className="card-img-top" src={raffle.img} alt="" />
                  </a>
                </div>
                {/* Card Caption */}
                <div className="card-caption col-12 p-0">
                  {/* Card Body */}
                  <div className="card-body">
                    <a href={`/raffles/${raffle.id}`}>
                      <h5 className="mb-0">{raffle.title}</h5>
                    </a>
                    <div className="seller d-flex align-items-center my-3">
                      <span>Owned By</span>
                      <a>
                        <h6 className="ml-2 mb-0">{raffle.owner}</h6>
                      </a>
                    </div>
                    <div className="card-bottom d-flex justify-content-between">
                      <span>{raffle.price}</span>
                      <span>{raffle.availableTickets}</span>
                    </div>
                    <a className="btn btn-bordered-white btn-smaller mt-3" href={`/raffle-details/${raffle.id}`}>
                      <i className="icon-handbag mr-2" />
                      {raffle.btnText}
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
              <Toaster position="bottom-right" reverseOrder={true} toastOptions={{ className: '',duration: 5000, style: {background: '#363636',color: '#fff',}
                                        }}/>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RaffleActions;