import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import mainNftRaffle from '../contracts/mainNftRaffle.json';

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
    return `${address.slice(0, 5)}...${address.slice(-3)}`;
  };

  const handleBuyTicket = async () => {
    try {
      const contract = new ethers.Contract(
        mainNftRaffle.networks['80001'].address,
        mainNftRaffle.abi,
        provider.getSigner(account)
      );
      const parsedRaffleId = parseInt(raffleId);
      const parsedTotalTicketsWanted = parseInt(totalTicketsWanted);

      if (isNaN(parsedRaffleId) || isNaN(parsedTotalTicketsWanted)) {
        alert('Please enter valid numbers for raffle ID and total tickets wanted.');
        return;
      }

      const raffle = await contract.raffles(parsedRaffleId);
      const totalTicketPrice = parsedTotalTicketsWanted * raffle.ticketPrice;

      const paymentResponse = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            to: contract.address,
            value: ethers.utils.hexlify(totalTicketPrice),
            data: contract.interface.encodeFunctionData('buyTicket', [parsedRaffleId, parsedTotalTicketsWanted]),
          },
        ],
      });

      await contract.provider.waitForTransaction(paymentResponse);
      alert('Tickets bought successfully!');
    } catch (error) {
      console.log('Error:', error);
      alert('Error buying tickets. Please try again.');
    }
  };

  const handleTotalTicketsChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 1 && raffleData && value <= raffleData.availableTickets) {
      setTotalTicketsWanted(value);
    }
  };  

  useEffect(() => {
    const fetchRaffleData = async () => {
      try {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          mainNftRaffle.networks['80001'].address,
          mainNftRaffle.abi,
          signer
        );

        const raffleInfo = await contract.raffleInfo(raffleId);
        const owner = shortenAddress(raffleInfo.raffleCreator);
        const price = ethers.BigNumber.from(raffleInfo.ticketPrice);
        const availableTickets = raffleInfo.totalVolumeofTickets - raffleInfo.totalSoldTickets;

        const raffleData = {
          id: raffleInfo.raffleId,
          img: raffleInfo.nftSourceLink,
          title: raffleInfo.raffleName,
          owner: owner,
          price: price,
          availableTickets: availableTickets,
          totalVolumeofTickets: raffleInfo.totalVolumeofTickets,
        };

        setRaffleData(raffleData);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchRaffleData();
  }, [raffleId, provider]);

  if (!raffleData) {
    return <div>Loading...</div>;
  }

  const totalTicketPriceWei = ethers.utils.formatUnits(
    raffleData.price.mul(totalTicketsWanted),
    'wei'
  );

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
                      <span>{raffleData.price.toString()} ETH</span>
                      <span>
                        {raffleData.availableTickets} of {raffleData.totalVolumeofTickets}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row items">
                <div className="col-12 item px-lg-2">
                  <div className="card no-hover">
                    <h4 className="mt-0 mb-2">Total Tickets Wanted</h4>
                    <div className="price d-flex justify-content-between align-items-center">
                      <input
                        type="number"
                        min="1"
                        max={raffleData.availableTickets}
                        value={totalTicketsWanted}
                        onChange={handleTotalTicketsChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button className="d-block btn btn-bordered-white mt-4" href={''} onClick={handleBuyTicket}>
                {`Pay ${totalTicketPriceWei} wei for ${totalTicketsWanted} Ticket(s)`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyTickets;
