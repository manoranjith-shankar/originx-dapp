import React, { useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Header = () => {
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected) {
      toast.error(
        "You are disconnected, please reconnect your wallet.\n\n Redirecting....",
        {
          duration: 2000,
        }
      );
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  }, [isConnected, navigate]);

    return (
        <header id="header">
            {/* Navbar */}
            <nav data-aos="zoom-out" data-aos-delay={800} className="navbar navbar-expand">
                <div className="container header">
                    {/* Navbar Brand*/}
                    <Link className="navbar-brand" to="/">
                        <img className="navbar" src="img/originx-text-transparent.png" alt=""/>
                    </Link>
                    <div className="ml-auto"/>
                    {/* Navbar */}
                    <ul className="navbar-nav items mx-auto">
                        <li className="nav-item dropdown">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link" href="#">Explore <i className="fas fa-angle-down ml-1" /></a>
                            <ul className="dropdown-menu"> 
                                <li className="nav-item"><Link to="/raffles" className="nav-link">Open Raffles</Link></li>
                                <li className="nav-item"><Link to="/raffle-owner" className="nav-link">My Raffles</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link to="https://originx-docs.gitbook.io" className="nav-link">Docs</Link>
                            <Link to="/404" className="nav-link">Mint NFT</Link>
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
            <Toaster position="top-center" reverseOrder={false} toastOptions={{ className: '', duration: 5000, style: { background: '#363636', color: '#fff' } }} />
        </header>
    );
};

export default Header;