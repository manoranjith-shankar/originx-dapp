import React, { Component } from 'react';
import footerData from './footerData.json';

class Footer extends Component {
    state = {
        data: footerData,
        socialData: footerData.socialData
    }
    render() {
        return (
            <footer className="footer-area">
                {/* Footer Top */}
                <div className="footer-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-sm-6 col-lg-3 res-margin">
                                {/* Footer Items */}
                                <div className="footer-items justify-content-center">
                                    {/* Logo */}
                                    <a className="navbar-brand" href="/">
                                        <img src={this.state.data.img} alt="" />
                                    </a>
                                    <p>{this.state.data.content}</p>
                                    {/* Social Icons */}
                                    <div className="social-icons d-flex">
                                        {this.state.socialData.map((item, idx) => {
                                            return (
                                                <a key={`sd_${idx}`} className={item.link} >
                                                    <i className={item.icon} href="https://github.com"/>
                                                    <i className={item.icon} href="https://github.com"/>
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                {/* Copyright Area */}
                                <div className="copyright-area d-flex flex-wrap justify-content-center justify-content-sm-between text-center py-4">
                                    {/* Copyright Left */}
                                    <div className="copyright-left">Submitted to Theta Hackathon</div>
                                    {/* Copyright Right */}
                                    <div className="copyright-right">By Team <a href="https://0xc0d3rs.tech" target= "_blank" >0xc0d3rs</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
