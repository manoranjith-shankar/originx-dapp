import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import mainNftRaffle from '../contracts/mainNftRaffle.json';
import toast, { Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const RaffleActions = () => {
  const { account } = useAccount();
  const accountAddress = useAccount().address;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
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

  const [totalRafflesOwned, setTotalRafflesOwned] = useState(null);
  const [raffleIdsOwned, setRaffleIdsOwned] = useState([]);
  const [raffleInfo, setRaffleInfo] = useState([]);

  useEffect(() => {
    const fetchRafflesOwned = async () => {
      try {
        const networkId = await provider.getNetwork().then((network) => network.chainId);
        // Initialize ethers provider and contract instance
        const contract = new ethers.Contract(
          mainNftRaffle.networks[networkId].address,
          mainNftRaffle.abi,
          provider.getSigner(account)
        );

        // Retrieve the total number of raffles from the contract
        const rafflesOwned = await contract.getOwnedRaffles(accountAddress);
        const rafflesOwnedCount = rafflesOwned[0]; // totalRaffleCount = 4
        const raffleIdsOwned = rafflesOwned[1]; // raffleIds = [1,3,4,5]
        console.log(rafflesOwnedCount.toString());
        console.log(raffleIdsOwned.toString());
      
        // Fetch raffle details for each raffle
        const raffleDetails = [];
        for (let i = 0; i < rafflesOwnedCount; i++) {
          const raffleId = raffleIdsOwned[i];
          const raffleInfo = await contract.raffleInfo(raffleId);
          const prizePool = await contract.getPrizePool(raffleId);

          const creatorPrize = prizePool[0].toString();
          const creatorPrizeinEth = ethers.utils.formatEther(creatorPrize)
          const owner = shortenAddress(raffleInfo.raffleCreator);
          const price = raffleInfo.price;
          const availableTickets = `${raffleInfo.totalVolumeofTickets - raffleInfo.totalSoldTickets} of ${raffleInfo.totalVolumeofTickets}`;
          const totalSoldTickets = `${raffleInfo.totalSoldTickets} of ${raffleInfo.totalVolumeofTickets}`;
          const pickCondition = (raffleInfo.totalSoldTickets / raffleInfo.totalVolumeofTickets) * 100;

          raffleDetails.push({
            id: raffleInfo.raffleId,
            img: raffleInfo.nftSourceLink,
            title: raffleInfo.raffleName,
            creator: creatorPrizeinEth,
            pickCondition: pickCondition,
            owner: owner,
            ticketsSold: totalSoldTickets,
            price: price,
            availableTickets: availableTickets,
            btnText: "Buy Tickets"
          });
        }

        setRaffleInfo(raffleDetails);
        setTotalRafflesOwned(rafflesOwnedCount)
        setRaffleIdsOwned(raffleIdsOwned)
        console.log(raffleDetails.pickCondition)
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchRafflesOwned();
  }, [account, provider, accountAddress],[]);

  const handlePickWinner = async (raffleId) => {
    try {

      const networkId = await provider.getNetwork().then((network) => network.chainId);
      const contract = new ethers.Contract(
        mainNftRaffle.networks[networkId].address,
        mainNftRaffle.abi,
        provider.getSigner(account)
      );

      if(raffleInfo.pickCondition >=80 ) {

      // Call the pickWinner function in the contract  
      const transaction = await contract.pickWinner(raffleId);
      await transaction.wait();

      toast.success(`Winner picked for raffle ID ${raffleId}`);
      }

      else {
        toast.error("Total Tickets is less than 80%")
      }
    } catch (error) {
      console.error(error);
      toast.error('Error picking winner');
    }
  };

  useEffect(() => {
    if (totalRafflesOwned === 0) {
      toast.error("You don't have any raffles owned");
    } else {
      const accountAddressSliced = accountAddress.slice(0, 6);
      toast(`Total raffles owned by ${accountAddressSliced} is ${totalRafflesOwned}`, {
        duration: 6000,
      });
      toast(`Raffle Ids owned by ${accountAddressSliced} is ${raffleIdsOwned}`, {
        duration: 6000,
      });
    }
  }, [totalRafflesOwned, accountAddress, raffleIdsOwned],[]);

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
          {raffleInfo.map((raffleDetails, idx) => (
            <div key={`raffle_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
              <div className="card">
                <div className="image-over">
                  <a href={`/raffle/${raffleDetails.id}`}>
                    <img className="card-img-top" src={raffleDetails.img} alt="" />
                  </a>
                </div>
                {/* Card Caption */}
                <div className="card-caption col-12 p-0">
                  {/* Card Body */}
                  <div className="card-body">
                    <a href={`/raffles/${raffleDetails.id}`}>
                      <h5 className="mb-0">{raffleDetails.title}</h5>
                    </a>
                    <div className="seller d-flex align-items-center my-3">
                      <span>Tickets sold</span> 
                      <a href={`https://${raffleDetails.owner}`}>
                        <h6 className="ml-2 mb-0">{raffleDetails.ticketsSold}</h6>
                      </a>
                    </div>
                    <div className="seller d-flex align-items-center my-3">
                      <span>Prize Share</span>
                      <a href={`https://${raffleDetails.owner}`}>
                        <h6 className="ml-2 mb-0">{raffleDetails.creator} ETH</h6>
                      </a>
                    </div>
                    <div className="row items">
                      <button className="btn btn-bordered-white btn-smaller mt-3" onClick={() => handlePickWinner(raffleDetails.id)}>
                      <FontAwesomeIcon icon={faCircleCheck} />
                        <i className="fa-solid fa-CircleCheck mr-2" />
                        Pick Winner
                      </button>
                      <a className="btn btn-bordered-white btn-smaller mt-3" href={`/raffle-details/${raffleDetails.id}`}>
                      <FontAwesomeIcon icon=  {faPaperPlane} />
                        <i className="fa-light fa-PaperPlane mr-2" />
                        Send Prize
                      </a>
                    </div>
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
              {/* <Toaster position="bottom-right" reverseOrder={true} toastOptions={{ className: '', duration: 5000, style: { background: '#363636', color: '#fff' } }} /> */}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RaffleActions;