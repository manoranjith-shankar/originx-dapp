import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { ethers, BigNumber } from 'ethers';
import mainNftRaffle from '../contracts/mainNftRaffle.json';
import toast, { Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const RaffleActions = () => {
  const { account } = useAccount();
  const accountAddress = useAccount().address;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const accountAddressSliced = accountAddress.slice(0, 6);
  const [initData] = useState({
    preHeading: "Explore",
    heading: "My Raffles",
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
        const contract = new ethers.Contract(
          mainNftRaffle.networks[networkId].address,
          mainNftRaffle.abi,
          provider.getSigner(account)
        );
    
        const rafflesOwned = await contract.getOwnedRaffles(accountAddress);
        const rafflesOwnedCount = rafflesOwned[0];
        const raffleIdsOwned = rafflesOwned[1];

        if (rafflesOwnedCount === 0) {
          toast.error("You don't have any raffles owned");
        }
    
        const raffleDetails = [];
        for (let i = 0; i < rafflesOwnedCount; i++) {
          const raffleId = raffleIdsOwned[i];
          const raffle = await contract.raffleInfo(raffleId);
    
          const prizePool = await contract.getPrizePool(raffleId);
          const creatorPrize = prizePool[0].toString();
          const creatorPrizeinEth = ethers.utils.formatEther(creatorPrize);
          const owner = shortenAddress(raffle.raffleCreator);
          const price = raffle.ticketPrice;
          const Id = raffle.raffleId
          const availableTickets = `${raffle.totalVolumeofTickets - raffle.totalSoldTickets} of ${raffle.totalVolumeofTickets}`;
          const totalSoldTickets = `${raffle.totalSoldTickets} of ${raffle.totalVolumeofTickets}`;
    
          raffleDetails.push({
            id: Id,
            img: raffle.nftSourceLink,
            title: raffle.raffleName,
            creator: creatorPrizeinEth,
            owner: owner,
            ticketsSold: totalSoldTickets,
            price: price,
            availableTickets: availableTickets,
            btnText: "Buy Tickets",
            raffleEnded: raffle.raffleEnded,
            raffleWinner: raffle.raffleWinner,
          });
        }
        
        setRaffleInfo(raffleDetails);
        setTotalRafflesOwned(rafflesOwnedCount);
        setRaffleIdsOwned(raffleIdsOwned);

        console.log(raffleDetails);

      } catch (error) {
        console.log('Error:', error);
      }    
    };

    fetchRafflesOwned();

    // Fetch raffles every 30 seconds
    const intervalId = setInterval(fetchRafflesOwned, 30000);

    return () => {
      // Clear the interval when the component is unmounted
      clearInterval(intervalId);
    };
  }, [account, provider, accountAddress]);

  const handlePickWinner = async (raffleId) => {
    try {
      const networkId = await provider.getNetwork().then((network) => network.chainId);
      const contract = new ethers.Contract(
        mainNftRaffle.networks[networkId].address,
        mainNftRaffle.abi,
        provider.getSigner(account)
      );
      const raffleIdBigNumber = BigNumber.from(raffleId);

      var loadingToastId = toast.loading(`Picking winner for RaffleId: ${raffleId}...`)
  
      // Check if raffleWinner is set
      const raffleInfo = await contract.raffleInfo(raffleIdBigNumber);
      console.log(raffleInfo);
      const { winningTicket } = raffleInfo;
      console.log(raffleId._hex[3].toString())
      console.log(winningTicket, '1')
      
      // Call the pickWinner function in the contract
      const transaction = await contract.pickWinner(raffleIdBigNumber);
      await transaction.wait();
      toast.dismiss(loadingToastId);
      
      toast.success(`Winner picked for raffle ID ${raffleId}`);
      console.log(winningTicket)
  
    } catch (error) {
      console.error(error);
      if (error.code === -32603) {
        toast.error('Total sold Tickets is less than 80%');
      }
      else if (error.action === "sendTransaction") {
        toast.dismiss(loadingToastId);
        toast.error("Provider denied transaction")
        }
      else {
        toast.error('Error picking winner');
      }
    }
  };    
  
  const handleSendPrize = async (raffleId) => {
    try {
      const networkId = await provider.getNetwork().then((network) => network.chainId);
      const contract = new ethers.Contract(
        mainNftRaffle.networks[networkId].address,
        mainNftRaffle.abi,
        provider.getSigner(account)
      );
      console.log(raffleId);
      // Call the pickWinner function in the contract  
      const transaction = await contract.sendPrizePool(raffleId);
      await transaction.wait();
      toast.success(`Prizes successfully credited for ${raffleId}`);
    } 
    catch(error) {
      console.error(error);
      toast.error('Cannot send prizes');
    }
  };

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
                      <button className="btn btn-bordered-white btn-smaller mt-3" onClick={() => handleSendPrize(raffleDetails.id)}>
                        <FontAwesomeIcon icon=  {faPaperPlane} />
                        <i className="fa-light fa-PaperPlane mr-2" />
                        Send Prize
                      </button>
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
              </a>
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" reverseOrder={true} toastOptions={{ className: '', duration: 5000, style: { background: '#363636', color: '#fff' } }} />
    </section>
  );
};

export default RaffleActions;