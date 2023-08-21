import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useNetwork } from 'wagmi';

const initData = {
  preheading: "Nft Raffles",
  heading: "Explore, collect, and sell impactful NFTs with OriginX",
  content: "Sell your digital assests along with an impact.",
  btn_1: "Explore",
  btn_2: "Create Raffles"
};

const Hero = () => {
  const [data, setData] = useState({});
  const { chain } = useNetwork();
  const navigate  = useNavigate();

   const handleCreateRoute = () => {
    setTimeout(()=> {
      const networkId = chain.id;
      if(networkId === 59140) {
        alert("Please connect your wallet to a different network and try again.")
      }
      else {
        navigate('/nftselect')
      }
    }, 1500)
   }

  useEffect(() => {
    setData(initData);
  }, []);

  return (
    <section className="hero-section">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-7">
            <span>{data.preheading}</span>
            <h1 className="mt-4">{data.heading}</h1>
            <p>{data.content}</p>
            {/* Buttons */}
            <div className="button-group">
              <Link to="/raffles" className="btn btn-bordered-white">
                <i className="icon-rocket mr-2" />
                {data.btn_1}
              </Link>
              <a onClick={handleCreateRoute} href='' className="btn btn-bordered-white">
                <i className="icon-note mr-2" />
                {data.btn_2}
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Shape */}
      <div className="shape">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 465" version="1.1">
          <defs>
            <linearGradient x1="49.7965246%" y1="28.2355058%" x2="49.7778147%" y2="98.4657689%" id="linearGradient-1">
              <stop stopColor="rgba(69,40,220, 0.15)" offset="0%" />
              <stop stopColor="rgba(87,4,138, 0.15)" offset="100%" />
            </linearGradient>
          </defs>
          <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
            <polygon points fill="url(#linearGradient-1)">
              <animate
                id="graph-animation"
                xmlns="http://www.w3.org/2000/svg"
                dur="2s"
                repeatCount
                attributeName="points"
                values="0,464 0,464 111.6,464 282.5,464 457.4,464 613.4,464 762.3,464 912.3,464 1068.2,464 1191.2,464 1328.1,464 1440.1,464 1440.1,464 0,464; 0,464 0,367 111.6,323.3 282.5,373 457.4,423.8 613.4,464 762.3,464 912.3,464 1068.2,464 1191.2,464 1328.1,464 1440.1,464 1440.1,464 0,464; 0,464 0,367 111.6,263 282.5,336.6 457.4,363.5 613.4,414.4 762.3,464 912.3,464 1068.2,464 1191.2,464 1328.1,464 1440.1,464 1440.1,464 0,464; 0,464 0,367 111.6,263 282.5,282 457.4,323.3 613.4,340 762.3,425.6 912.3,464 1068.2,464 1191.2,464 1328.1,464 1440.1,464 1440.1,464 0,464; 0,464 0,367 111.6,263 282.5,282 457.4,263 613.4,290.4 762.3,368 912.3,446.4 1068.2,464 1191.2,464 1328.1,464 1440.1,464 1440.1,464 0,464; 0,464 0,367 111.6,263 282.5,282 457.4,263 613.4,216 762.3,329.6 912.3,420 1068.2,427.6 1191.2,464 1328.1,464 1440.1,464 1440.1,464 0,464; 0,464 0,367 111.6,263 282.5,282 457.4,263 613.4,216 762.3,272 912.3,402.4 1068.2,373 1191.2,412 1328.1,464 1440.1,464 1440.1,464 0,464; 0,464 0,367 111.6,263 282.5,282 457.4,263 613.4,216 762.3,272 912.3,376 1068.2,336.6 1191.2,334 1328.1,404 1440.1,464 1440.1,464 0,464; 0,464 0,367 111.6,263 282.5,282 457.4,263 613.4,216 762.3,272 912.3,376 1068.2,282 1191.2,282 1328.1,314 1440.1,372.8 1440.1,464 0,464; 0,464 0,367 111.6,263 282.5,282 457.4,263 613.4,216 762.3,272 912.3,376 1068.2,282 1191.2,204 1328.1,254 1440.1,236 1440.1,464 0,464; 0,464 0,367 111.6,263 282.5,282 457.4,263 613.4,216 762.3,272 912.3,376 1068.2,282 1191.2,204 1328.1,164 1440.1,144.79999999999998 1440.1,464 0,464; 0,464 0,367 111.6,263 282.5,282 457.4,263 613.4,216 762.3,272 912.3,376 1068.2,282 1191.2,204 1328.1,164 1440.1,8 1440.1,464 0,464; 0,464 0,367 111.6,263 282.5,282 457.4,263 613.4,216 762.3,272 912.3,376 1068.2,282 1191.2,204 1328.1,164 1440.1,8 1440.1,464 0,464;"
                fill="freeze"
              />
            </polygon>
          </g>
        </svg>
      </div>
    </section>
  );
};

export default Hero;