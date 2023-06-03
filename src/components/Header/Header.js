import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header id="header">
            {/* Navbar */}
            <nav data-aos="zoom-out" data-aos-delay={800} className="navbar navbar-expand">
                <div className="container header">
                    {/* Navbar Brand*/}
                    <Link className="navbar-brand" to="/">
                        <img className="navbar" src="img/originx-text-transparent.png" alt=""/>
                    </Link>
                    <div className="ml-auto" />
                    {/* Navbar */}
                    <ul className="navbar-nav items mx-auto">
                        <li className="nav-item dropdown">
                            {/* <a className="nav-link" href="/">Home</a> */}
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link">Explore <i className="fas fa-angle-down ml-1" /></a>
                            <ul className="dropdown-menu"> 
                                <li className="nav-item"><Link to="/raffles" className="nav-link">Open Raffles</Link></li>
                                <li className="nav-item"><Link to="/owned-raffles" className="nav-link">My Raffles</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link to="/activity" className="nav-link">Activity</Link>
                            <Link to="/mint" className="nav-link">Mint NFT</Link>
                        </li>
                    </ul>
                    {/* Navbar Toggler */}
                    <ul className="navbar-nav toggle">
                        <li className="nav-item">
                            <a href="#" className="nav-link" data-toggle="modal" data-target="#menu">
                                <i className="fas fa-bars toggle-icon m-0" />
                            </a>
                        </li>
                    </ul>
                    {/* Navbar Action Button */}
                    <ul className="navbar-nav action">
                        <li className="nav-item ml-3">
                            <ConnectButton />
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;