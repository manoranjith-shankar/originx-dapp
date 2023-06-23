import React from 'react';

const Calculate = () => {

  const nftPrice = 0.2564

  const handleClick = () => {
  
    const rafflePool = ((nftPrice * 50) / 100) + nftPrice

    const raffleCreatorPrize = nftPrice + ((nftPrice * 5) / 100)
    const developementTeamPrize = (nftPrice * 5) / 100
    const minusPrize = raffleCreatorPrize + developementTeamPrize
    const charityPrize = rafflePool - minusPrize

    console.log(rafflePool)
    console.log(raffleCreatorPrize)
    console.log(developementTeamPrize)
    console.log(minusPrize)
    console.log(charityPrize)
  }

  return (
    <section className={`author-area`}>
      <div>
        <button onClick={handleClick}>Txt</button>
      </div>
    </section>
  );
};

export default Calculate;


// Doesn't make any difference from opensea, rarible and any other NFT MarketPlace out there?
// we're going to act as an intermediate platform for nft sellers and also buyers.
// nft owner lists their NFT (ERC721[for now]) and sets the NFT Price.
// We increment the price by 50% and that will be our RafflePool.
// The raffleCretor also sets the the totalTicketsPrice for the raffleId. from this point,
// the raffle Becomes live, participants can buy tickets, once ticketsSold>=(80% of totalRaffleTickets.)
// A random winner is picked, and awarded the NFT(ERC721[for now]), NFT Price + 5% of rafflePool,
// the rest goes to the charity of the raffleCreator choice. Given at the time of creation of raffle.

// imp. links: [clone and run]
// localhost:3000/create
// localhost:3000/open-raffles
// localhost:3000/my-raffles
// localhost:3000/calculate

// Metamask or any web3 provider required.

// i want to create a component that should take the token Id and contract address  of an NFT contract and should approve a given address(0xc09AA2837EF2f70a33b4d49C59DCD4e779eF92Eb), when the user clicks a button. how to do this in respect to the nft raffle dapp