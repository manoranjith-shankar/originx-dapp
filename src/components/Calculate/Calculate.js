import React, { useState } from 'react';

const roundToDecimalPlaces = (value, decimalPlaces) => {
  const factor = 10 ** decimalPlaces;
  return Math.round(value * factor) / factor;
};

const Calculate = () => {
  const [nftPrice, setNFTPrice] = useState('');
  const [rafflePool, setRafflePool] = useState(null);
  const [raffleCreatorPrize, setRaffleCreatorPrize] = useState(null);
  const [developmentTeamPrize, setDevelopmentTeamPrize] = useState(null);
  const [minusPrize, setMinusPrize] = useState(null);
  const [charityPrize, setCharityPrize] = useState(null);

  const handleNFTPriceChange = (e) => {
    const price = e.target.value;
    setNFTPrice(price);

    if (price) {
      const parsedNFTPrice = parseFloat(price);

      const calculatedRafflePool = roundToDecimalPlaces((parsedNFTPrice * 50) / 100 + parsedNFTPrice, 2);
      const calculatedRaffleCreatorPrize = roundToDecimalPlaces(parsedNFTPrice + (parsedNFTPrice * 5) / 100, 2);
      const calculatedDevelopmentTeamPrize = roundToDecimalPlaces((parsedNFTPrice * 5) / 100, 2);
      const calculatedMinusPrize = roundToDecimalPlaces(calculatedRaffleCreatorPrize + calculatedDevelopmentTeamPrize, 2);
      const calculatedCharityPrize = roundToDecimalPlaces(calculatedRafflePool - calculatedMinusPrize, 2);

      setRafflePool(calculatedRafflePool);
      setRaffleCreatorPrize(calculatedRaffleCreatorPrize);
      setDevelopmentTeamPrize(calculatedDevelopmentTeamPrize);
      setMinusPrize(calculatedMinusPrize);
      setCharityPrize(calculatedCharityPrize);
    } else {
      setRafflePool(null);
      setRaffleCreatorPrize(null);
      setDevelopmentTeamPrize(null);
      setMinusPrize(null);
      setCharityPrize(null);
    }
  };

  return (
    <section className="author-area">
      <div className="container">
        <h2>Calculate Raffle Prizes</h2>
        <div className="form-group">
          <label htmlFor="nftPrice">NFT Price:</label>
          <input
            type="number"
            id="nftPrice"
            value={nftPrice}
            onChange={handleNFTPriceChange}
          />
        </div>
        {rafflePool && (
          <div>
            <p>Raffle Pool: {rafflePool}</p>
            <p>Raffle Creator Prize: {raffleCreatorPrize}</p>
            <p>Development Team Prize: {developmentTeamPrize}</p>
            <p>Charity Prize: {charityPrize}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Calculate;