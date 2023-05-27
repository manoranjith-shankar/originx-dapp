import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import mainNftRaffle from '../contracts/mainNftRaffle.json';
import { useParams } from 'react-router-dom';

const BuyTickets = () => {
  const { raffleId } = useParams();
  const [raffleData, setRaffleData] = useState(null);
  const { account } = useAccount();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
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
    const fetchRaffleData = async () => {
      try {
        // Initialize ethers provider and contract instance
        const contract = new ethers.Contract(
          mainNftRaffle.networks['80001'].address,
          mainNftRaffle.abi,
          provider.getSigner(account)
        );

        // Fetch raffle details for the specified raffleId
        const raffleInfo = await contract.raffleInfo(raffleId);

        const owner = shortenAddress(raffleInfo.raffleCreator);
        const price = parseEther(raffleInfo.ticketPrice);
        const availableTickets = `${raffleInfo.totalVolumeofTickets - raffleInfo.totalSoldTickets} of ${raffleInfo.totalVolumeofTickets}`;

        const raffleData = {
          id: raffleInfo.raffleId,
          img: raffleInfo.nftSourceLink,
          title: raffleInfo.raffleName,
          owner: owner,
          price: price,
          date: raffleInfo.endtime,
          availableTickets: availableTickets,
          btnText: "Buy Tickets"
        };

        setRaffleData(raffleData);
        console.log(raffleData.date);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchRaffleData();
  }, [raffleId, account, provider]);

  if (!raffleData) {
    return <div>Loading...</div>;
  }

  const handleBuyTickets = async () => {
    try {
      // Initialize ethers provider and contract instance
      const contract = new ethers.Contract(
        mainNftRaffle.networks['80001'].address,
        mainNftRaffle.abi,
        provider.getSigner(account)
      );

      // Call the buyTicket function
      await contract.buyTicket(raffleData.id, 1);
      alert('Tickets bought successfully!');
    } catch (error) {
      console.log('Error:', error);
      alert('Error buying tickets. Please try again.');
    }
  };

  return (
    <section className="item-details-area">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-12 col-lg-5">
            <div className="item-info">
              <div className="item-thumb text-center">
                <img src={raffleData.img} alt="" />
              </div>
              <div className="card no-hover countdown-times my-4">
                <div className="countdown d-flex justify-content-center" data-date={raffleData.date} />
            </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="content mt-5 mt-lg-0">
              <h3 className="m-0">{raffleData.title}</h3>
              <div className="owner d-flex align-items-center">
                <span>Created By</span>
                <a className="owner-meta d-flex align-items-center ml-3" href="/">
                  <h6 className="ml-2">{raffleData.owner}</h6>
                </a>
              </div>
              <div className="row items">
                <div className="col-12 item px-lg-2">
                  <div className="card no-hover">
                    <h4 className="mt-0 mb-2">Available Tickets</h4>
                    <div className="price d-flex justify-content-between align-items-center">
                      <span>{raffleData.price} ETH</span>
                      <span>{raffleData.availableTickets}</span>
                    </div>
                  </div>
                </div>
              </div>
              <a className="d-block btn btn-bordered-white mt-4" href={'/'} onClick={handleBuyTickets}>
                {raffleData.btnText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyTickets;