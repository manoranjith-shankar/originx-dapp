import React from 'react';

const Calculate = () => {

  const nftPrice = 0.2564

  const rafflePool = ((nftPrice * 50) / 100) + nftPrice
  console.log(rafflePool);

  // return (
  //   <section className={`author-area`}>
  //     <div className="container">
  //       <div className="row justify-content-center">
  //         <div className="col-12 col-md-7">
  //           {/* Intro */}
  //           <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-5">
  //             <div className="intro-content">
  //               <h3 className="mt-3 mb-0">Calculate Raffle</h3>
  //             </div>
  //           </div>
  //           {/* Create Raffle form */}
  //           <form onSubmit={handlePrice} className="item-form card no-hover">
  //             <div className="row">
  //               <div className="col-12">
  //                 <div className="form-group mt-3">
  //                   <input
  //                     type="text"
  //                     className="form-control"
  //                     name="name"
  //                     placeholder="Raffle Name"
  //                     required="required"
  //                     value={raffleName}
  //                     onChange={(e) => setRaffleName(e.target.value)}
  //                   />
  //                 </div>
  //               </div>
  //               <div className="col-12 col-md-6">
  //                 <div className="form-group">
  //                   <input
  //                     type="number"
  //                     className="form-control"
  //                     name="price"
  //                     placeholder="NFT Price"
  //                     required="required"
  //                     value={nftPrice}
  //                     onChange={(e) => setNftPrice(e.target.value)}
  //                   />
  //                 </div>
  //               </div>
  //               <div className="col-12 col-md-6">
  //                 <div className="form-group">
  //                   <input
  //                     type="number"
  //                     className="form-control"
  //                     name="royality"
  //                     placeholder="Total Ticket Supply"
  //                     required="required"
  //                     value={totalVolumeofTickets}
  //                     onChange={(e) => setTotalVolumeofTickets(e.target.value)}
  //                   />
  //                 </div>
  //               </div>
  //               <div className="col-12 col-md-6">
  //                 <div className="form-group">
  //                   <input
  //                     type="text"
  //                     className="form-control"
  //                     placeholder="Token ID (NFT)"
  //                     required="required"
  //                     value={nftId}
  //                     onChange={(e) => setNftId(e.target.value)}
  //                   />
  //                 </div>
  //               </div>
  //               <div className="col-12">
  //                 <div className="form-group">
  //                   <input
  //                     type="text"
  //                     className="form-control"
  //                     name="price"
  //                     placeholder="NFT Contract Address"
  //                     required="required"
  //                     value={nftContractAddress}
  //                     onChange={(e) => setNftContractAddress(e.target.value)}
  //                   />
  //                 </div>
  //               </div>
  //               <div className="col-12">
  //                 <div className="form-group">
  //                   <input
  //                     type="text"
  //                     className="form-control"
  //                     name="price"
  //                     placeholder="NFT Source Link"
  //                     required="required"
  //                     value={nftSourceLink}
  //                     onChange={(e) => setNftSourceLink(e.target.value)}
  //                   />
  //                 </div>
  //               </div>
  //               {/* Add Fractional NFT option */}
  //               <div className="col-12">
  //                 <button className={`btn w-100 mt-3 mt-sm-4`} type="submit">
  //                   Create Raffle
  //                 </button>
  //                 <Toaster
  //                   position="bottom-right"
  //                   reverseOrder={true}
  //                   toastOptions={{
  //                     className: "",
  //                     duration: 5000,
  //                     style: { background: "#363636", color: "#fff" },
  //                   }}
  //                 />
  //               </div>
  //             </div>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //   </section>
  // );
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