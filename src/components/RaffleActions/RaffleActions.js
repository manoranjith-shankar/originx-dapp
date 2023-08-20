import React, { useEffect, useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { BigNumber, ethers } from 'ethers';
import mainNftRaffle from '../contracts/mainNftRaffle.json';
import toast, { Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import CreateRaffleBox from '../Misc/CreateRaffleBox';
import PrizeModal from './PrizeModal';

const RaffleActions = () => {
  const { account, isConnected } = useAccount();
  const accountAddress = useAccount().address;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const [initData] = useState({
    preHeading: "Explore",
    heading: "My Raffles",
    btnText: "Load More"
  });
  
  const [totalRafflesOwned, setTotalRafflesOwned] = useState(null);
  const [raffleIdsOwned, setRaffleIdsOwned] = useState([]);
  const [modalDisplay, setModalDisplay] = useState(false);
  const [modalRaffleId, setModalRaffleId] = useState('');
  const [raffleInfo, setRaffleInfo] = useState([]);
  const { chain } = useNetwork();

  const closeModal = () => {
    setModalDisplay(false);
  };
  
  const shortenAddress = (address) => {
    if (address.length <= 8) {
      return address;
    }
    return `${address.slice(0, 5)}...${address.slice(-3)}`;
  };

  const notifyProviderError = () => {
    toast.error(`Please Connect your wallet`);
  };

  useEffect(() => {
    const fetchRafflesOwned = async () => {
      
      if (isConnected === false) {
        notifyProviderError();
        return;
      }

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

        const rafflesOwnedCountNumber = Number(rafflesOwnedCount._hex);
        setTotalRafflesOwned(rafflesOwnedCountNumber.toString());

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
        setRaffleIdsOwned(raffleIdsOwned);  

      } catch (error) {
        console.log(error, '1');
      }
    };

    fetchRafflesOwned();

    // Fetch raffles every 30 seconds
    const intervalId = setInterval(fetchRafflesOwned, 30000);

    return () => {
      // Clear the interval when the component is unmounted
      clearInterval(intervalId);
    };
  }, [isConnected, account, provider, accountAddress]);

  const handlePickWinner = async (raffleId) => {
    try {
      const networkId = chain.id;
      const contract = new ethers.Contract(
        mainNftRaffle.networks[networkId].address,
        mainNftRaffle.abi,
        provider.getSigner(account)
      );
      const raffleIdBigNumber = BigNumber.from(raffleId);
      const raffleIdStr = raffleIdBigNumber.toString();

      var loadingToastId = toast.loading(`Picking winner for RaffleId: ${raffleId}...`)
      
      // Call the pickWinner function in the contract
      const transaction = await contract.requestRandomTicket(raffleIdBigNumber);
      transaction.wait();
      const requestId = await contract.getRequestForRaffle(raffleIdBigNumber);
      const requestIdBigNumber = ethers.BigNumber.from(requestId);
      const requestIdStr = requestIdBigNumber.toString();
      console.log(requestIdStr, '1');
      console.log(raffleIdStr, '2');

      if (requestIdStr != null ) {
        toast.loading("Running some pre-checks", { duration: 8500 });

        setTimeout(() => {
          toast.loading("Requesting a VRF Random Ticket, This might take a while", { duration: 10000});
        }, 8500);

        setTimeout(async () => {
          try {
            toast.loading("VRF request successful")
            const tx = await contract.pickWinner(raffleIdStr, requestIdStr, { gasLimit: ethers.utils.hexlify(300000) });
            console.log("Picking Raffle winner...")
            await tx.wait();
              console.log("Picked Winner", tx);
              toast.success(`Winner picked for raffle ID ${raffleId}`);
          } catch (error) {
              console.log("Error picking winner:", error);
              toast.error('Error picking winner');
          }
      }, 20000);
      }else {
        toast.error("Cannot request VRF random ticket. please contact originX")
      }
  
    } catch (error) {
      console.log(error);
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
  
  const handleCancelRaffle = async (raffleId) => {
    toast.loading("Cancelling the raffle...");
    try {
      const networkId = await provider.getNetwork().then((network) => network.chainId);
      const contract = new ethers.Contract(
        mainNftRaffle.networks[networkId].address,
        mainNftRaffle.abi,
        provider.getSigner(account)
      );
      // Call the pickWinner function in the contract
      const transaction = await contract.cancelRaffle(raffleId);
      await transaction.wait();
      toast.success(`Cancelled raffle: ${raffleId} successfully`);
    }
    catch(error) {
      console.error(error);
      toast.error('Cannot cancel raffle');
    }
  };

  if (totalRafflesOwned === 0) {
    return(
    <div>
      <CreateRaffleBox />
    </div>
  )};

  return (
    <section className="explore-area">
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
                    <a href={`${raffleDetails.img}`} target='_blank'>
                      <img className="card-img-top" src={raffleDetails.img} alt="" />
                    </a>
                  </div>
                  {/* Card Caption */}
                  <div className="card-caption col-12 p-0">
                    {/* Card Body */}
                    <div className="card-body">
                      <a href={`#`}>
                        <h5 className="mb-0">{raffleDetails.title}</h5>
                      </a>
                      <div className="seller d-flex align-items-center my-3">
                        <span>Tickets sold</span> 
                        <a href={`#`}>
                          <h6 className="ml-2 mb-0">{raffleDetails.ticketsSold}</h6>
                        </a>
                      </div>
                      <div className="seller d-flex align-items-center my-3">
                        <span>Raffle Pool</span>
                        <a onClick={() => { setModalDisplay(true); 
                          setModalRaffleId(raffleDetails.id) }
                          }>
                          <h6 className="ml-2 mb-0">{raffleDetails.creator} ETH</h6>
                        </a>
                      </div>
                      <div className="row items">
                        <button className="btn btn-bordered-white btn-smaller mt-3" onClick={() => handlePickWinner(raffleDetails.id)}>
                          <FontAwesomeIcon icon={faCircleCheck} />
                          <i className="fa-solid fa-CircleCheck mr-2" />
                          Pick Winner
                        </button>
                        <button className="btn btn-bordered-white btn-smaller mt-3" onClick={() => handleCancelRaffle(raffleDetails.id)}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                          <i className="fa-light fa-PaperPlane mr-2" />
                          Cancel Raffle
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      {modalDisplay && <PrizeModal isOpen={true} onClose={closeModal} raffleId={modalRaffleId}/>}
      <Toaster position="bottom-right" reverseOrder={true} toastOptions={{ className: '', duration: 5000, style: { background: '#363636', color: '#fff' } }} />
    </section>
  );
};

export default RaffleActions;