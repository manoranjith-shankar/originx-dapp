import React, { Component } from 'react';

const initData = {
    nftSourceLink: "/img/auction_2.jpg",
    raffleName: "name",
    raffleCreator: "0x7123r12hek2ekdjn2ilednqkdbk2dbk2bd2d211",
    nftPrice: "10 ETH",
    nftId: "5",
    nftContractAddress: "0x7123r12hek2ekdjn2ilednqkdbk2dbk2bd2d211",
    ticketPrice: "1 ETH",
    totalSoldTickets: "10",
    btnText: "Buy Ticket",
    endTime: "2022-03-30",
    tab_1: "History",
    tab_2: "Details"
}

const tabData_1 = [
    {
        id: "1",
        img: "/img/avatar_1.jpg",
        price: "14 ETH",
        time: "4 hours ago",
        author: "@arham"
    },
    {
        id: "2",
        img: "/img/avatar_2.jpg",
        price: "10 ETH",
        time: "8 hours ago",
        author: "@junaid"
    },
    {
        id: "3",
        img: "/img/avatar_3.jpg",
        price: "12 ETH",
        time: "3 hours ago",
        author: "@yasmin"
    }
]

const tabData_2 = [
    {
        id: "1",
        img: "/img/avatar_6.jpg",
        price: "32 ETH",
        time: "10 hours ago",
        author: "@hasan"
    },
    {
        id: "2",
        img: "/img/avatar_7.jpg",
        price: "24 ETH",
        time: "6 hours ago",
        author: "@artnox"
    },
    {
        id: "3",
        img: "/img/avatar_8.jpg",
        price: "29 ETH",
        time: "12 hours ago",
        author: "@meez"
    }
]

class ItemDetails extends Component {
    state = {
        initData: {},
        tabData_1: [],
        tabData_2: [],
        sellerData: []
    }
    componentDidMount(){
        this.setState({
            initData: initData
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
                                    <img src={this.state.initData.nftSourceLink} alt="" />
                                </div>
                                <div className="card no-hover countdown-times my-4">
                                    <div className="countdown d-flex justify-content-center" data-date={this.state.initData.date} />
                                </div>


                                {/* Tab */}
                                {/* <ul className="netstorm-tab nav nav-tabs" id="nav-tab">
                                    <li>
                                        <a className="active" id="nav-home-tab" data-toggle="pill" href="#nav-home">
                                            <h5 className="m-0">{this.state.initData.tab_1}</h5>
                                        </a>
                                    </li>
                                    <li>
                                        <a id="nav-profile-tab" data-toggle="pill" href="#nav-profile">
                                            <h5 className="m-0">{this.state.initData.tab_2}</h5>
                                        </a>
                                    </li>
                                    <li>
                                        <a id="nav-contact-tab" data-toggle="pill" href="#nav-contact">
                                            <h5 className="m-0">{this.state.initData.tab_3}</h5>
                                        </a>
                                    </li>
                                </ul> */}


                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            {/* Content */}
                            <div className="content mt-5 mt-lg-0">
                                <h3 className="m-0">{this.state.initData.raffleName}</h3>
                                {/* <p>{this.state.initData.content}</p> */}
                                {/* Creator */}
                                <div className="owner d-flex align-items-center">
                                    <span>Created By</span>
                                    <a className=" d-flex align-items-center ml-3">
                                        <h6 className="ml-2">{this.state.initData.raffleCreator}</h6>
                                    </a>
                                </div>
                                {/* Raffle Info List */}

                                <div className="row items">
                                    
                                    <div className="col-12 item px-lg-2">
                                        <div className="card no-hover">
                                            <h4 className="mt-0 mb-2">Available Tickets</h4>
                                            <div className="price d-flex justify-content-between align-items-center">
                                                <span>{this.state.initData.ticketPrice}</span>
                                                <span>{this.state.initData.totalSoldTickets}</span>
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