// import React, { useEffect, useState } from 'react';
// import { useAccount } from 'wagmi';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTicket } from '@fortawesome/free-solid-svg-icons';
// import { Link } from 'react-router-dom';

// const NFTSelect = () => {

//   const { address } = useAccount();
//   const { EvmChain } = require("@moralisweb3/common-evm-utils");
//   const [nftData, setnftData] = useState([]);
//   console.log(address, '1')

//   useEffect(() => {
//   const fetchNftsOwned = async () => {
//     await Moralis.start({
//         apiKey: "3n9ve0Gtkrtcx4WAaessSXqWddDgv9LeEGjkUwpIRYRbGE0UNgB441XDlTArgcia"
//       });

//     try {
//       const address = "0xc09AA2837EF2f70a33b4d49C59DCD4e779eF92Eb";

//       const chain = EvmChain.ETHEREUM;
    
//       const response = await Moralis.EvmApi.nft.getWalletNFTs({
//         address,
//         chain,
//       });
    
//       console.log(response.toJSON());
//       } catch (e) {
//         console.error(e);
//       }
//   };
//   fetchNftsOwned();
// },[])

//   return (
//     <section className={`expore-area`}>
//     <div className="item-form card no-hover">
//       <div className="container">
//         <div className="row items">
//           {nftData.map((item, idx) => (
//             <div key={`edt_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
//               <div className="card">
//                 <div className="image-over">
//                   <a href="/">
//                     <img className="card-img-top" src={item.img} alt="" />
//                   </a>
//                 </div>
//                 <div className="justify-content-center">
//                     <h2>{item.NftName}</h2>
//                     <div className="justify-content-center">
//                         <p>#{item.tokenId}</p>
//                     </div>
//                 </div>
//                 {/* Card Caption */}
//                 <div className="card-caption col-12 p-0">
//                   {/* Card Body */}
//                   <div className="card-body">
//                     <a rel="noreferrer" target={"_blank"} href={`${item.image.Link}`}>
//                       <h5 className="mb-0">{item.title}</h5>
//                     </a>
//                     <Link className= "btn btn-bordered-white btn-smaller mt-3 justify-content-between" to={`/buytickets/${idx + 1}`}>
//                       <FontAwesomeIcon icon={faTicket} />
//                         <i className="fa-solid fa-ticket mr-2" />
//                       {item.btnText}
//                       </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       </div>
//     </section>
//   );
// };

// export default NFTSelect;
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");

const runApp = async () => {
  await Moralis.start({
    apiKey: "3n9ve0Gtkrtcx4WAaessSXqWddDgv9LeEGjkUwpIRYRbGE0UNgB441XDlTArgcia",
  });

  const allNFTs = [];

  const address = "0xc09AA2837EF2f70a33b4d49C59DCD4e779eF92Eb";

  const chains = [EvmChain.MUMBAI];

  for (const chain of chains) {
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      address,
      chain,
    });

    allNFTs.push(response);
  }

  console.log(allNFTs);
};

runApp();