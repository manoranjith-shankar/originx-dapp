import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import mainNftRaffle from '../contracts/mainNftRaffle.json';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const BuyTickets = () => {
  const { raffleId } = useParams();
  const { account } = useAccount();
  const [raffleData, setRaffleData] = useState(null);
  const [totalTicketsWanted, setTotalTicketsWanted] = useState(1);
  const [charityInfo, setCharityInfo] = useState('');
  const [showToast, setShowToast] = useState(false);

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
  
  const notify = () => {
    toast.promise(
      notify(),
       {
         loading: 'Transacting',
         success: <b>Tickets bought successfully</b>,
         error: <b>Could not buy tickets</b>,
       }
     );
     setShowToast(true);
  };

  useEffect(() => {
    const fetchRaffleData = async () => {
      try {

        const networkId = await provider.getNetwork().then((network) => network.chainId);
        // Initialize ethers provider and contract instance
        const contract = new ethers.Contract(
          mainNftRaffle.networks[networkId].address,
          mainNftRaffle.abi,
          provider.getSigner(account)
        );
        
        // Fetch raffle details for the specified raffleId
        const raffleInfo = await contract.raffleInfo(raffleId);

        const raffleStatus = raffleInfo.raffleCancelled; 
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
          volumeOfTickets: raffleInfo.totalVolumeofTickets - 0,
          totalTicketsWanted: totalTicketsWanted,
          raffleStatus: raffleStatus
        };

        setRaffleData(raffleData);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchRaffleData();
  }, [raffleId, account, provider, totalTicketsWanted],[]);

  if (!raffleData) {
    return <div>Loading...</div>;
  }

  const calculateTotalPrice = (unparsedPrice, totalTicketsWanted) => {
    const pricePerTicket = ethers.BigNumber.from(unparsedPrice);
    const totalTickets = ethers.BigNumber.from(totalTicketsWanted);
    const totalPrice = pricePerTicket.mul(totalTickets);
    return totalPrice;
  };

  const handleBuyTickets = async (event) => {
    event.preventDefault();
    var loadingToastId;

    try {
      const networkId = await provider.getNetwork().then((network) => network.chainId);
        // Initialize ethers provider and contract instance
        const contract = new ethers.Contract(
          mainNftRaffle.networks[networkId].address,
          mainNftRaffle.abi,
          provider.getSigner(account)
        );
      
      const totalPrice = calculateTotalPrice(raffleData.unparsedPrice, totalTicketsWanted);
      console.log(totalPrice.toString());

      var loadingToastId = toast.loading('Transacting...')
      // Buy tickets by calling the contract's buyTickets function
      const tx = await contract.buyTicket(raffleId, totalTicketsWanted, {
        value: totalPrice,
      });

      await tx.wait();

      toast.dismiss(loadingToastId);
      toast.success('Tickets bought successfully!');
      // Tickets bought successfully
      console.log(tx.hash);
    } catch (error) {
      if (raffleData.availableTickets === 0) {
        toast.error('Tickets Sold out');
      }
      else if (raffleData.raffleStatus === true) {
        toast.error(`Raffle cancelled`)
      }
      else {
      toast.error('Could not buy tickets.');
      console.log('Error buying tickets:', error);
    }
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
                <div className="countdown d-flex justify-content-center" data-date="2023-10-7" />
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
              <div className="card no-hover">
                <div className="single-seller d-flex align-items-center">
                  <div className="seller-info ml-3">
                      <a className="seller mb-2" href="/">Charity Information</a>
                      <span>Creator</span>
                  </div>
                </div>
              </div>
            </div>
              <div className="row items">
                <div className="col-12 item px-lg-2">
                  <div className="card no-hover">
                    <h4 className="mt-0 mb-2">Available Tickets</h4>
                    <div className="price d-flex justify-content-between align-items-center">
                    <span>{raffleData.price} ETH</span>
                        {raffleData.availableTickets === 0 ? (
                          <span>Sold Out</span>
                        ) : (
                          <span>{raffleData.availableTickets} of {raffleData.volumeOfTickets}</span>
                        )}   
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
                <Toaster position="bottom-right" reverseOrder={true} toastOptions={{ className: '',duration: 5000, style: {background: '#363636',color: '#fff',}
                                        }}/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyTickets;