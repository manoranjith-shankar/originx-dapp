import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import mainNftRaffle from '../contracts/mainNftRaffle.json';
import { useParams } from 'react-router-dom';

const BuyTickets = () => {
  const { raffleId } = useParams();
  const [raffleData, setRaffleData] = useState(null);
  const [totalTicketsWanted, setTotalTicketsWanted] = useState(1);
  const { account } = useAccount();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const shortenAddress = (address) => {
    if (address.length <= 8) {
      return address;
    }
    return `${address.slice(0, 5)}...${address.slice(-4)}`;
  };

  const parseEther = (amount) => {
    return ethers.utils.formatEther(amount);
  };

  const formatDate = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `"${year}-${month}-${day}"`;
  };
    
  // Initialize ethers provider and contract instance
  const contract = new ethers.Contract(
    mainNftRaffle.networks['80001'].address,
    mainNftRaffle.abi,
    provider.getSigner(account)
  );

  // console.log(raffleId)
  // console.log(contract.getTicketPrice(raffleId));

  useEffect(() => {
    const fetchRaffleData = async () => {
      try {
        
        // Fetch raffle details for the specified raffleId
        const raffleInfo = await contract.raffleInfo(raffleId);

        const owner = shortenAddress(raffleInfo.raffleCreator);
        const price = parseEther(raffleInfo.ticketPrice);
        const availableTickets = raffleInfo.totalVolumeofTickets - raffleInfo.totalSoldTickets;
        const endDate = formatDate(raffleInfo.endTime);

        const raffleData = {
          id: raffleInfo.raffleId,
          img: raffleInfo.nftSourceLink,
          title: raffleInfo.raffleName,
          owner: owner,
          price: price,
          unparsedPrice: raffleInfo.ticketPrice, // Store the unparsed ticket price
          date: endDate,
          availableTickets: availableTickets,
          totalTicketsWanted: totalTicketsWanted,
        };

        setRaffleData(raffleData);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchRaffleData();
  }, [raffleId, account, provider, totalTicketsWanted]);

  if (!raffleData) {
    return <div>Loading...</div>;
  }

  const handleBuyTickets = async (event) => {
    event.preventDefault();

    try {
      // Calculate the total price for the desired number of tickets
      // const totalPrice = ethers.utils.parseEther(raffleData.unparsedPrice)
      //   .mul(totalTicketsWanted);
      const totalPrice = raffleData.unparsedPrice;
      console.log(totalPrice);

      // Buy tickets by calling the contract's buyTickets function
      const tx = await contract.buyTicket(raffleId, totalTicketsWanted, {
        value: totalPrice,
      });

      await tx.wait();

      // Tickets bought successfully
      console.log(tx);
      console.log('Tickets bought successfully!');
    } catch (error) {
      console.log('Error buying tickets:', error);
    }
  };

  const handleTotalTicketsChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= raffleData.availableTickets) {
      setTotalTicketsWanted(value);
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
              <div className="row items">
                <div className="col-12 item px-lg-2">
                  <div className="card no-hover">
                    <h4 className="mt-0 mb-2">Total Tickets Wanted</h4>
                    <div className="price d-flex justify-content-between align-items-center">
                      <input type="number" min="1" max={raffleData.availableTickets} value={totalTicketsWanted} onChange={handleTotalTicketsChange} />
                    </div>
                  </div>
                </div>
              </div>
              <a className="d-block btn btn-bordered-white mt-4" href={''} onClick={handleBuyTickets}>
                Pay {raffleData.price * totalTicketsWanted} ETH for {totalTicketsWanted} Ticket(s)
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyTickets;