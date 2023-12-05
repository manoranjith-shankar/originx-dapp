import React, { Component } from 'react';
import footerData from './footerData.json';
import { Link } from 'react-router-dom';

const gradientStyle = {
  background: `linear-gradient(to right, var(--primary-color), var(--secondary-color))`,
  display: 'inline',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

class Footer extends Component {
  state = {
    data: footerData,
    socialData: footerData.socialData,
    name: '',
    email: '',
  };

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

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
                        <a key={`sd_${idx}`} className={item.link}>
                          <i className={item.icon} />
                          <i className={item.icon} />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="roadmap-section">
                    <div className="container py-4">
                        <div className="row">
                        <div className="col-lg-12">
                            {/* Roadmap Title */}
                            <h5>Roadmap:</h5>
                            {/* Roadmap Content */}
                            <ul>
                            <li>Q1 2023: Initial Development & Idea Shaping</li>
                            <li>Q2 2023: Patent and Community Publishing (Current)</li>
                            <li>Q3 2023: Introduction of advanced features & Mainnet Launch</li>
                            <li>Q4 2023: Expansion of partnerships and community outreach</li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
              <div className="col-12 col-sm-6 col-lg-3">
                {/* Footer Items */}
                <div className="footer-items">
                  {/* Footer Title */}
                  <h4 className="footer-title">Join Waitlist</h4>
                  {/* Subscribe Form */}
                  <form onSubmit={this.handleSubmit}>
                    <div className="subscribe-form">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Your Name"
                          value={this.state.name}
                          onChange={this.handleNameChange}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Your Email"
                          value={this.state.email}
                          onChange={this.handleEmailChange}
                        />
                      </div>
                      <button type="submit" className="btn">
                        <i className="icon-paper-plane" />
                      </button>
                    </div>
                  </form>
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
                                    <div className="copyright-left"><Link to="https://originx-docs.0xc0d3rs.tech/versions-and-contact" target= "_blank" >v1. MVP</Link></div>
                                    {/* Copyright Right */}
                                    <div className="copyright-right"><Link to="https://0xc0d3rs.tech" target= "_blank" style={gradientStyle} >Manoranjith Shankar</Link></div>
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