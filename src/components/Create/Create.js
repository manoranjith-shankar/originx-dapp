import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import mainNftRaffle from '../contracts/mainNftRaffle.json'
import toast, { Toaster } from 'react-hot-toast';

const Create = () => {

    const { account } = useAccount();
    const [raffleName, setRaffleName] = useState('');
    const [nftPrice, setNftPrice] = useState('');
    const [totalVolumeofTickets, setTotalVolumeofTickets] = useState('');
    const [placeDate,setPlaceDate] = useState('End Date');
    const [endTime, setEndTime] = useState(''); // initialize with current time
    const [nftId, setNftId] = useState('');
    const [nftContractAddress, setNftContractAddress] = useState('');
    const [nftSourceLink, setNftSourceLink] = useState('');
    const [showToast, setShowToast] = useState(false);
      
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
        toast.success('The transaction is successful.');
        setShowToast(true); // set the state variable to true when the toast should be displayed
      };
      const notifyError = () => {
        toast.error('The transaction is unsuccessful.');
        setShowToast(true); // set the state variable to true when the toast should be displayed
      };

    const handleSubmit = async (event) => {
    event.preventDefault();
    const contract = new ethers.Contract(
      mainNftRaffle.networks['80001'].address,
      mainNftRaffle.abi,
      provider.getSigner(account)
    );

    try {
      const result = await contract.createRaffle(
        raffleName,
        ethers.utils.parseEther(nftPrice),
        totalVolumeofTickets,
        endTime,
        nftId,
        nftContractAddress,
        nftSourceLink
      );
      console.log(result);
      notify();
    } catch (err) {
      console.log(err);
      notifyError();
    }
  };
        return (
            <section className="author-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-7">
                            {/* Intro */}
                            <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-5">
                                <div className="intro-content">
                                    <span>Get Started</span>
                                    <h3 className="mt-3 mb-0">Create Raffle</h3>
                                </div>
                            </div>
                            {/* Create Raffle form */}
                            <form onSubmit={handleSubmit} className="item-form card no-hover">
                                <div className="row">

                                    <div className="col-12">
                                        <div className="form-group mt-3">
                                            <input type="text" className="form-control" name="name" placeholder="Raffle Name" required="required" 
                                                value={raffleName} onChange={e => setRaffleName(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <input type="number" className="form-control" name="price" placeholder="Nft Price" required="required"
                                                value={nftPrice} onChange={e => setNftPrice(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <input type="number" className="form-control" name="royality" placeholder="Total Ticket Supply" required="required" 
                                                value={totalVolumeofTickets} onChange={e => setTotalVolumeofTickets(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Token Id (Nft)" required="required"
                                                value={nftId} onChange={e => setNftId(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="form-group"> 
                                         <input  type="date" className="form-control" placeholder="date" required="required" 
                                               value={placeDate} onChange={handlePlaceDateChange} />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                        <input type="text" className="form-control" name="end date" placeholder="End Time" required="required" 
                                            value={endTime} onChange={handleEndTimeChange}/>
                                        </div>
                                    </div> 
                                    <div className="col-12">
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="price" placeholder="Nft Contract Address" required="required" 
                                                value={nftContractAddress} onChange={e => setNftContractAddress(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <input type="link" className="form-control" name="price" placeholder="Nft Source Link" required="required" 
                                                value={nftSourceLink} onChange={e => setNftSourceLink(e.target.value)} />
                                        </div>
                                    </div>
                                    {/* Add Fractional Nft option */}
                                    {/* <div className="col-12">
                                        <div className="form-group mt-3">
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" defaultValue="option1" defaultChecked />
                                                <label className="form-check-label" htmlFor="inlineRadio1">Put on Sale</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" defaultValue="option2" />
                                                <label className="form-check-label" htmlFor="inlineRadio2">Instant Sale Price</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" defaultValue="option3" />
                                                <label className="form-check-label" htmlFor="inlineRadio3">Unlock Purchased</label>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="col-12">
                                        <button className="btn w-100 mt-3 mt-sm-4" type="submit" onClick={showToast} >Create Raffle</button>
                                        <Toaster />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

export default Create;