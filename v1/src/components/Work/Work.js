import React, { Component } from 'react';
import workData from './Work.json';

class Work extends Component {
  state = {
    data: {
      preHeading: "How It Works",
      heading: "Create and sell your NFTs",
      workData: workData.data
    }
  }

  render() {
    return (
            <section className="work-area">
                <div className="container">
                      <div className="row">
                        <div className="col-12">
                          {/* Intro */}
                          <div className="intro mb-4">
                            <div className="intro-content">
                              <span>{this.state.data.preHeading}</span>
                              <h3 className="mt-3 mb-0">{this.state.data.heading}</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row items">
                        {this.state.data.workData.map((item, idx) => {
                          return (
                            <div key={`wd_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
                              {/* Single Work */}
                              <div className="single-work">
                                <i className={item.icon} />
                                <h4>{item.title}</h4>
                                <p>{item.text}</p>
                              </div>
                            </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        );
    }
}

export default Work;
