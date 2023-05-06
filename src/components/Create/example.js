import { useState } from 'react';
import { ethers } from 'ethers';
import mainNftRaffle from '../contracts/mainNftRaffle.json'

function CreateRaffle() {
  const [raffleName, setRaffleName] = useState('');
  const [nftPrice, setNftPrice] = useState('');
  const [totalVolumeofTickets, setTotalVolumeofTickets] = useState('');
  const [endTime, setEndTime] = useState('');
  const [nftId, setNftId] = useState('');
  const [nftContractAddress, setNftContractAddress] = useState('');
  const [nftSourceLink, setNftSourceLink] = useState('');
  const [loading, setLoading] = useState(false);

  const createRaffle = async () => {
    setLoading(true);

    // Connect to the user's wallet
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);

    // Create a signer to send transactions
    const signer = provider.getSigner();

    async function handleSubmit(event) {
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
          } catch (err) {
            console.log(err);
          }
      }
    setLoading(false);
  };


  return (
    <div>
      <h2>Create a Raffle</h2>
      <form onSubmit={e => { e.preventDefault(); createRaffle(); }}>
        <label>
          Raffle Name:
          <input type="text" value={raffleName} onChange={e => setRaffleName(e.target.value)} />
        </label>
        <label>
          NFT Price:
          <input type="text" value={nftPrice} onChange={e => setNftPrice(e.target.value)} />
        </label>
        <label>
          Total Volume of Tickets:
          <input type="text" value={totalVolumeofTickets} onChange={e => setTotalVolumeofTickets(e.target.value)} />
        </label>
        <label>
          End Time:
          <input type="text" value={endTime} onChange={e => setEndTime(e.target.value)} />
        </label>
        <label>
          NFT ID:
          <input type="text" value={nftId} onChange={e => setNftId(e.target.value)} />
        </label>
        <label>
          NFT Contract Address:
          <input type="text" value={nftContractAddress} onChange={e => setNftContractAddress(e.target.value)} />
        </label>
        <label>
          NFT Source Link:
          <input type="text" value={nftSourceLink} onChange={e => setNftSourceLink(e.target.value)} />
        </label>
        <button type="submit" disabled={loading}>Create Raffle</button>
      </form>
    </div>
  );
}
