import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import mainNftRaffle from '../contracts/mainNftRaffle.json';
import toast, { Toaster } from 'react-hot-toast';
import "react-widgets/styles.css";
import { DropdownList } from 'react-widgets';

const charityAddresses = [
  { id: 'UNICEF USA', value: '0xc09AA2837EF2f70a33b4d49C59DCD4e779eF92Eb' },
  { id: 'UNICEF UK', value: '0xc09AA2837EF2f70a33b4d49C59DCD4e779eF92Eb' },
  { id: 'Charity Global', value: '0xc09AA2837EF2f70a33b4d49C59DCD4e779eF92Eb' },
  { id: 'Charity Australia', value: '0xc09AA2837EF2f70a33b4d49C59DCD4e779eF92Eb' },
];

const Create = () => {
  const { account } = useAccount();
  const [raffleName, setRaffleName] = useState('');
  const [nftPrice, setNftPrice] = useState('');
  const [totalVolumeofTickets, setTotalVolumeofTickets] = useState('');
  const [placeDate, setPlaceDate] = useState('End Date');
  const [endTime, setEndTime] = useState('');
  const [nftId, setNftId] = useState('');
  const [nftContractAddress, setNftContractAddress] = useState('');
  const [nftSourceLink, setNftSourceLink] = useState('');
  const [charityAddress, setCharityAddress] = useState('');

  const handlePlaceDateChange = (event) => {
    const inputDate = event.target.value;
    handleEndTimeChange(inputDate);
    setPlaceDate(inputDate);
  };

  const handleEndTimeChange = (inputDate) => {
    const date = new Date(inputDate);
    const unixTime = Math.floor(date.getTime() / 1000); // convert to Unix timestamp
    setEndTime(unixTime);
  };

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const notify = () => {
    toast.success(`Raffle created successfully`);
  };

  const notifyError = () => {
    toast.error(`Approve of NFT or network provider error`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const networkId = await provider.getNetwork().then((network) => network.chainId);
    // Initialize ethers provider and contract instance
    const contract = new ethers.Contract(
      mainNftRaffle.networks[networkId].address,
      mainNftRaffle.abi,
      provider.getSigner(account)
    );

    var loadingToastId = toast.loading('Creating....')

    try {
      const result = await contract.createRaffle(
        raffleName,
        ethers.utils.parseUnits(nftPrice),
        totalVolumeofTickets,
        endTime,
        nftId,
        nftContractAddress,
        nftSourceLink,
        charityAddress.value
      );
      console.log(result);
      toast.dismiss(loadingToastId);
      notify();
    } catch (err) {
      console.log(err);
      console.log(charityAddress.value)
      console.log(err.action);

      if(charityAddress.value === undefined) {
        toast.dismiss(loadingToastId)
        toast.error("Please select a charity address")
      }
      else if (err.action === "sendTransaction") {
        toast.dismiss(loadingToastId);
        toast.error("Provider denied transaction")
        }
      else if (err.reason === "execution reverted: ERC721: caller is not token owner or approved") {
      toast.dismiss(loadingToastId);
      toast.error("You are not the owner of this token or you haven't approved it yet");
      }
      else {
      notifyError();
      }
    }
  };

  return (
    <section className={`author-area`}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-7">
            {/* Intro */}
            <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-5">
              <div className="intro-content">
                <h3 className="mt-3 mb-0">Create Raffle</h3>
              </div>
            </div>
            {/* Create Raffle form */}
            <form onSubmit={handleSubmit} className="item-form card no-hover">
              <div className="row">
                <div className="col-12">
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Raffle Name"
                      required="required"
                      value={raffleName}
                      onChange={(e) => setRaffleName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control"
                      name="price"
                      placeholder="NFT Price"
                      required="required"
                      value={nftPrice}
                      onChange={(e) => setNftPrice(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control"
                      name="royality"
                      placeholder="Total Ticket Supply"
                      required="required"
                      value={totalVolumeofTickets}
                      onChange={(e) => setTotalVolumeofTickets(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Token ID (NFT)"
                      required="required"
                      value={nftId}
                      onChange={(e) => setNftId(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Date"
                      required="required"
                      value={placeDate}
                      onChange={handlePlaceDateChange}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="end date"
                      placeholder="End Time"
                      required="required"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="price"
                      placeholder="NFT Contract Address"
                      required="required"
                      value={nftContractAddress}
                      onChange={(e) => setNftContractAddress(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="price"
                      placeholder="NFT Source Link"
                      required="required"
                      value={nftSourceLink}
                      onChange={(e) => setNftSourceLink(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="dropdown-wrapper">
                    <DropdownList
                      placeholder="Select Address"
                      data={charityAddresses}
                      dataKey='id'
                      required="required"
                      textField='id'
                      onChange={(value) => setCharityAddress(value)}
                    />
                  </div>
                </div>
                {/* Add Fractional NFT option */}
                <div className="col-12">
                  <button className={`btn w-100 mt-3 mt-sm-4`} type="submit">
                    Create Raffle
                  </button>
                  <Toaster
                    position="bottom-right"
                    reverseOrder={true}
                    toastOptions={{
                      className: "",
                      duration: 5000,
                      style: { background: "#363636", color: "#fff" },
                    }}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Create;
