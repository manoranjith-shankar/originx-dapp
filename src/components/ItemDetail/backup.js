import React, { Component, useState } from 'react';

const initData = {
    itemImg: "/img/auction_2.jpg", // nft image source
    itemOwner: "0xc092ewd...1313", // raffleCreator
    date: "2025-03-30", // end time
    created: "15 Jul 2021", // raffle created time
    title: "Raffle_Name", // raffle Name
    Ticket_price: "2.9 BNB", // ticket price
    totalTickets: `1 of 5`, // (totalAvailableTickets - totalSoldTickets) of totalAvailableTickets
    btnText: "Buy Tickets"
}

const aboutRaffle = [
    {
        id: "1",
        seller: "NFT",
        post: "Creator"
    },
    {
        id: "2",
        seller: "Charity",
        post: "UNICEF USA"
    }
]


class ItemDetails extends Component {
    state = {
        initData: {},
        tabData_1: [],
        tabData_2: [],
        aboutRaffle: []
    }
    componentDidMount(){
        this.setState({
            initData: initData,
            aboutRaffle: aboutRaffle
        })
    }
    render() {
        return (
            <section className="item-details-area">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-12 col-lg-5">
                            <div className="item-info">
                                <div className="item-thumb text-center">
                                    <img src={this.state.initData.itemImg} alt="" />
                                </div>
                                <div className="card no-hover countdown-times my-4">
                                    <div className="countdown d-flex justify-content-center" data-date={this.state.initData.date} />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            {/* Content */}
                            <div className="content mt-5 mt-lg-0">
                                <h3 className="m-0">{this.state.initData.title}</h3>
                                <p>{this.state.initData.content}</p>
                                {/* Owner */}
                                <div className="owner d-flex align-items-center">
                                    <span>Created By</span>
                                    <a className="owner-meta d-flex align-items-center ml-3" href="/">
                                        <h6 className="ml-2">{this.state.initData.itemOwner}</h6>
                                    </a>
                                </div>
                                <div className="row items">
                                    {this.state.aboutRaffle.map((item, idx) => {
                                        return (
                                            <div key={`sd_${idx}`} className="col-12 col-md-6 item px-lg-2">
                                                <div className="card no-hover">
                                                    <div className="single-seller d-flex align-items-center">
                                                        {/* Seller Info */}
                                                        <div className="seller-info ml-3">
                                                            <a className="seller mb-2" href="/">{item.seller}</a>
                                                            <span>{item.post}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div className="col-12 item px-lg-2">
                                        <div className="card no-hover">
                                            <h4 className="mt-0 mb-2">Available Tickets</h4>
                                            <div className="price d-flex justify-content-between align-items-center">
                                                <span>{this.state.initData.Ticket_price}</span>
                                                <span>{this.state.initData.totalTickets}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a className="d-block btn btn-bordered-white mt-4" href="/">{this.state.initData.btnText}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default ItemDetails;