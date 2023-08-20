import { useDisclosure } from '@mantine/hooks';
import { Modal, Table } from '@mantine/core';
import { MantineProvider } from '@mantine/core';
import { ethers } from 'ethers';
import { useNetwork, useAccount } from 'wagmi'
import mainNftRaffle from '../contracts/mainNftRaffle.json';
import { useState, useEffect } from 'react';

const PrizeModal = ({ isOpen, onClose, raffleId }) => {
  const [ opened ] = useDisclosure(isOpen);
  const [ rafflePool, setRafflePool ] = useState([]);

  const { chain } = useNetwork();
  const { account } = useAccount();

  const customStyles = {
    content: 'custom-content',
    item: 'custom-item',
    input: 'custom-modal-input',
    value: 'custom-value',
    values: 'custom-values',
    searchInput: 'custom-searchInput',
    itemsWrapper: 'custom-items-wrapper',
  };

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  useEffect(()=> {
    const handleDisplayPrizePool = async (raffleId) => {

      const networkId = chain.id;
      // Initialize ethers provider and contract instance
      const contract = new ethers.Contract (
        mainNftRaffle.networks[networkId].address,
        mainNftRaffle.abi,
        provider.getSigner(account)
      );
  
      const prizePool = await contract.getPrizePool(raffleId);
      const PrizePoolTotal = Number(prizePool[0]._hex).toString();
      const winnerPrize = Number(prizePool[1]._hex).toString();
      const developmentTeam = Number(prizePool[2]._hex).toString();
      const charity = Number(prizePool[3]._hex).toString();
  
      const prizePoolEth = ethers.utils.formatEther(PrizePoolTotal);
      const winnerPrizeEth = ethers.utils.formatEther(winnerPrize)
      const developmentTeamEth = ethers.utils.formatEther(developmentTeam)
      const charityEth = ethers.utils.formatEther(charity)
  
      setRafflePool([prizePoolEth, winnerPrizeEth, developmentTeamEth, charityEth])
    };

    if(opened) {
      handleDisplayPrizePool(raffleId);
    }

  }, [opened, raffleId])


  return (
    <>
      <MantineProvider theme={{ fontFamily: 'Poppins', colorScheme: 'dark' }}>
        <Modal opened={opened} onClose={onClose} withCloseButton={false} centered classNames={customStyles} overlayProps={{
          opacity: 0.55,
          blur: 3,
        }}
        transitionProps={{ transition: 'fade', duration: 600, timingFunction: 'linear' }}
        >
          <div className='justify-content-center' style={{marginTop: "1px"}}>
            <h3>Total Raffle funds: {rafflePool[0]} ETH</h3>
          </div>
          <Table withBorder withColumnBorders fontSize='md'>
            <thead>
              <tr>
                <th>Entity</th>
                <th>Raffle Share</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Raffle Creator</td>
                <td>{rafflePool[1]} ETH</td>
              </tr>
              <tr>
                <td>Raffle Winner</td>
                <td>Non-Fungible Token (NFT)</td>
              </tr>
              <tr>
                <td>Development Team</td>
                <td>{rafflePool[2]} ETH</td>
              </tr>
              <tr>
                <td>Charity</td>
                <td>{rafflePool[3]} ETH</td>
              </tr>
            </tbody>
          </Table>
        </Modal>
      </MantineProvider>
    </>
  );
};

export default PrizeModal;