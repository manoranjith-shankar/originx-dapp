import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import mainNftRaffle from '../contracts/mainNftRaffle.json';
import toast, { Toaster } from 'react-hot-toast';
import "react-widgets/styles.css";
import DropdownList from '../Misc/DropDownList';
import SelectComp from './SelectComp';
import DatePickerComponent from './DatePickerComponent';
import { useNetwork } from 'wagmi'
import { useParams, useNavigate } from 'react-router-dom';
import MultiSelectComp from './MultiSelect';

const Create = () => {

  const { chain } = useNetwork();
  const navigate = useNavigate();
  const { tokenId, tokenAddress, imageSource } = useParams();
  const { address, isConnected, account } = useAccount();
  const [raffleName, setRaffleName] = useState('');
  const [description, setDescription] = useState('');
  const [nftPrice, setNftPrice] = useState('');
  const [totalVolumeofTickets, setTotalVolumeofTickets] = useState('');
  const [endTime, setEndTime] = useState('');
  const [charityAddress, setCharityAddress] = useState('');

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  console.log(tokenId, '0');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDateSelect = (unixTime) => {
    setEndTime(unixTime);
  };

  const notifyLoading = () => {
    toast.loading('Creating....')
  }

  const notify = () => {
    toast.success(`Raffle created successfully`);
  };


  const notifyError = () => {
    toast.dismiss(notifyLoading);
    toast.error(`Approve of NFT or ownership error`);
  };

  const notifyProviderError = () => {
    toast.dismiss(notifyLoading);
    toast.error(`Please Connect your wallet`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    notifyLoading();
    console.log(address, '1');
    console.log(provider, '2');

    if (isConnected === false) {
      notifyProviderError();
      return;
    }

    const networkId = chain.id;
    // Initialize ethers provider and contract instance
    const contract = new ethers.Contract (
      mainNftRaffle.networks[networkId].address,
      mainNftRaffle.abi,
      provider.getSigner(account)
    );

    try {
      const result = await contract.createRaffle(
        raffleName,
        description,
        ethers.utils.parseUnits(nftPrice),
        totalVolumeofTickets,
        endTime,
        tokenId,
        tokenAddress,
        imageSource,
        charityAddress
      );
      console.log(result);
      toast.dismiss(notifyLoading);
      notify();
      setTimeout(() => {
        navigate('/raffles');
      }, 3000);
    } catch (err) {
      console.log(err, '1');

      if (err.action === "sendTransaction") {
      toast.dismiss(notifyLoading);
      toast.error("Provider denied transaction")
      }
      
      else if (err.reason === "execution reverted: ERC721: caller is not token owner or approved") {
      toast.dismiss(notifyLoading);
      toast.error("You are not the owner of this token or you haven't approved it yet");
      }

      else if (err.reason === "execution reverted: ERC721: caller is not token owner or approved") {
        toast.dismiss(notifyLoading);
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
                <h3 className="d-flex justify-content-center mb-5">Create Raffle</h3>
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
                <div className="col-12">
                  <div className="form-group">
                      <textarea className="form-control"
                        name="description"
                        maxLength={"120"}
                        placeholder="tell us something about this raffle, the purpose, cause etc." 
                        cols={30} rows={3} defaultValue={""}
                        required="required"
                        style={{borderRadius:'7px'}}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                    <DatePickerComponent 
                      onDateSelect={handleDateSelect}
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
                      value={tokenId}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control"
                      name="ticket"
                      placeholder="Total Ticket Supply"
                      required="required"
                      min="1"
                      max="10000"
                      step="1"
                      value={totalVolumeofTickets}
                      onChange={(e) => {
                        const input = Math.max(1, Math.min(10000, parseInt(e.target.value))) || '';
                        setTotalVolumeofTickets(input);
                      }}
                    />
                  </div>
                </div>
                {/* <div className="col-12">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="price"
                      placeholder="NFT Contract Address"
                      required="required"
                      value={tokenAddress}
                      readOnly
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
                      value={imageSource}
                      readOnly
                    />
                  </div>
                </div> */}
                <div className="col-12">
                    <SelectComp
                      onSelect={(newValue) => setCharityAddress(newValue)}
                    />
                </div>
                <div className='col-12'>
                      <MultiSelectComp />
                </div>
                {/* Add Fractional NFT option */}
                <div className="col-12">
                  <button className={`btn btn-indexed w-100 mt-3 mt-sm-4`} type="submit">
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
