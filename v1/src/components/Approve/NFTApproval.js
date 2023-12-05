import React, { useEffect, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

const NFTApprovalComponent = () => {
  const [response, setResponse] = useState('')
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      // const contractAddress = '0xD0664568C474cebf15a8bA5DBe61b8A1475aBB78';
      // const apiKey = 'NE3S1YVVAWHQD4U8BJQRXP85SX1INN5YVZ';

      // const response = await fetch(`https://api-testnet.polygonscan.com/api?module=contract&action=getabi&address=${contractAddress}&apikey=${apiKey}`);
      // const data = await response.json();

      // const contractABI = (data.result);
      // setResponse(contractABI);
      // if (contractABI !== '') {
      //   const provider = new ethers.providers.JsonRpcProvider(); // Replace with your desired provider
      //   const signer = provider.getSigner();

      //   const MyContract = new ethers.Contract(contractAddress, contractABI, signer);
      //   const result1 = await MyContract.memberId('0xfe8ad7dd2f564a877cc23feea6c0a9cc2e783715');
      //   console.log('result1:', result1);

      //   const result2 = await MyContract.members(1);
      //   console.log('result2:', result2);
      // } else {
      //   console.log('Error');
      // }
      setTimeout(() => {
        window.location.replace('https://mumbai.polygonscan.com/address/0xD0664568C474cebf15a8bA5DBe61b8A1475aBB78#writeContract');
      },2000);
    };

    fetchData();
  }, []);

  return(
    <div>
      redirecting....
    </div>
  );
  
};

export default NFTApprovalComponent;