import React, { useState, useEffect } from 'react';

const initData = {
    pre_heading: "Features",
    heading: "Make the most out of originX",
    content: ""
};

const data = [
    {
        id: "1",
        icon: "fas fa-pen-square text-effect",
        title: "Raffle Creation",
        content: "Create an implactful raffle with your NFT! Set the price and get an extra 5% incentive",
        href: "/nftselect"
    },
    {
        id: "2",
        icon: "fas fa-shield-alt text-effect",
        title: "Secure smart contract",
        content: "originX smart contract handles every operations, making the dapp truly decentralized",
        href: "https://originx-docs.gitbook.io/product-docs/overview/raffle-pool"
    },
    {
        id: "3",
        icon: "fas fa-random text-effect",
        title: "Verifiable randomness",
        content: "originX leverages chainlink's Verifiable Random Funtion (VRF) to pick a truly random winner",
        href: "#"
    },
    {
        id: "4",
        icon: "fas fa-rocket text-effect",
        title: "No Bid nor Bargain",
        content: "Tried of waiting for right buyers & right price?. With originX sell/raffle your NFT with the Guranteed selling price",
        href: "#"
    },
    {
        id: "5",
        icon: "fas fa-gift text-effect",
        title: "Philanthrophy",
        content: "For every 1 ETH raffled on originX, 0.3 ETH is donated to a charitable cause",
        href: "#"
    },
    {
        id: "6",
        icon: "fas fa-flag text-effect",
        title: "Win / Win",
        content: "Learn how you can partner with originX to showcase your NFT drops & collections",
        href: "#"
    }
];

const Info = () => {
    const [initDataState, setInitDataState] = useState(initData);
    const [dataState, setDataState] = useState(data);

    useEffect(() => {
        setInitDataState(initData);
        setDataState(data);
    }, []);

    return (
        <section className="help-center-area">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-7">
                        {/* Intro */}
                        <div className="intro text-center">
                            <span>{initDataState.pre_heading}</span>
                            <h3 className="mt-3 mb-0">{initDataState.heading}</h3>
                            <p>{initDataState.content}</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center items">
                    {dataState.map((item, idx) => (
                        <div key={`hd_${idx}`} className="col-12 col-md-6 col-lg-4 item">
                            {/* Help Card */}
                            <div className="card help-card">
                                <a className="d-block text-center" href={item.href}>
                                    <i className={item.icon} style={ {fontSize: '44px', lineHeight: '44px'}}/>
                                    <h4>{item.title}</h4>
                                    <p>{item.content}</p>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Info;