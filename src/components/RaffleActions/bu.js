import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import mainNftRaffle from '../contracts/mainNftRaffle.json';
import toast, { Toaster } from 'react-hot-toast';

const RaffleActions = () => {
  const { account } = useAccount();
  const  accountAddress  = useAccount().address;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const networkIdPromise = provider.getNetwork().then((network) => network.chainId);
  const contractPromise = networkIdPromise.then((networkId) =>
    new ethers.Contract(mainNftRaffle.networks[networkId].address, mainNftRaffle.abi, provider.getSigner(account))
  );
  console.log(accountAddress);

  const [rafflesOwned, setRafflesOwned] = useState([]);
  const [raffleIdsOwned, setRaffleIdsOwned] = useState([]);

  useEffect(() => {
    const fetchRafflesOwned = async () => {
      try {
        const contract = await contractPromise;
        const rafflesOwned = await contract.getOwnedRaffles(accountAddress);
        const rafflesOwnedCount = rafflesOwned[0];
        const raffleIds = rafflesOwned[1];

        console.log(rafflesOwnedCount);
        console.log(rafflesOwned[1]);
        if (rafflesOwnedCount === 0) {
          toast.error("You don't have any raffle owned");
        } else {
          const accountAddressSliced = accountAddress.slice(0, 6);
          toast(`Total raffles owned by ${accountAddressSliced} is ${rafflesOwnedCount}`, {
            duration: 6000,
          });
          toast(`Raffle Ids owned by ${accountAddressSliced} is ${raffleIds}`, {
            duration: 6000,
          });
        }
          setRafflesOwned(rafflesOwnedCount);
          setRaffleIdsOwned(raffleIds);
          console.log(raffleIdsOwned)
          console.log(rafflesOwned)
        }
       catch (error) {
        console.log('Error:', error);
      }
    };

    fetchRafflesOwned();
  }, [account, contractPromise],[]);

  return (
    <div>
      <Toaster
        position="bottom-right"
        reverseOrder={true}
        toastOptions={{
          className: '',
          duration: 5000,
          style: { background: '#363636', color: '#fff' },
        }}
      />

      {rafflesOwned.length > 0 ? (
        <section className="explore-area">
          <div className="container">
            <section className="explore-area">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12 col-md-8 col-lg-7">
                    {/* Intro */}
                    <div className="intro text-center mb-4">
                      <span>{this.state.initData.pre_heading}</span>
                      <h3 className="mt-3 mb-0">{this.state.initData.heading}</h3>
                      <p>{this.state.initData.content}</p>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center text-center">
                  <div className="col-12">
                    {/* Explore Menu */}
                    <div className="explore-menu btn-group btn-group-toggle flex-wrap justify-content-center text-center mb-4" data-toggle="buttons">
                      {/* ...Filter buttons */}
                    </div>
                  </div>
                </div>
                <div className="row items explore-items">
                  {rafflesOwned.map((raffle, idx) => (
                    <div key={`raffle_${idx}`} className="col-12 col-sm-6 col-lg-3 item explore-item" data-groups={raffle.group}>
                      <div className="card">
                        <div className="image-over">
                          <a href="/item-details">
                            <img className="card-img-top" src={raffle.img} alt="" />
                          </a>
                        </div>
                        {/* Card Caption */}
                        <div className="card-caption col-12 p-0">
                          {/* Card Body */}
                          <div className="card-body">
                            <a href="/item-details">
                              <h5 className="mb-0">{raffle.title}</h5>
                            </a>
                            <div className="seller d-flex align-items-center my-3">
                              <span>Owned By</span>
                              <a href="/author">
                                <h6 className="ml-2 mb-0">{raffle.owner}</h6>
                              </a>
                            </div>
                            <div className="card-bottom d-flex justify-content-between">
                              <span>{raffle.price}</span>
                              <span>{raffle.count}</span>
                            </div>
                            <a className="btn btn-bordered-white btn-smaller mt-3" href="/wallet-connect">
                              <i className="icon-handbag mr-2" />
                              {raffle.btnText}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </section>
      ) : (
        <div>No raffles owned</div>
      )}
    </div>
  );
};

export default RaffleActions;