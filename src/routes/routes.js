import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// importing all the themes
import Home from "../themes/Home";
import CreateRaffle from "../themes/CreateRaffle";
import OpenRafflesTheme from "../themes/OpenRafflesTheme";
import RaffleDetailsTheme from "../themes/RaffleDetailsTheme";
import RaffleActionsTheme from "../themes/RaffleActionsTheme";
import CalculateTheme from "../themes/CalculateTheme";
import ApproveTheme from "../themes/ApproveTheme";
import ComingSoonTheme from "../themes/ComingSoonTheme";
import Login from "../themes/LoginMain";
import OopsComponent from "../components/Misc/OopsComponent";
import NFTMetadata from "../components/test/test";
import CreateRaffleBox from "../components/Misc/CreateRaffleBox";
import NFTSelectTheme from "../themes/NFTSelectTheme";
import MintNFT from "../components/test/MintNFT";
import Test2 from "../components/test/test2";

class MyRouts extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home  />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create/:tokenId/:tokenAddress/:imageSource" element={<CreateRaffle />} />
            <Route path="/raffles" element={<OpenRafflesTheme />} />
            <Route path="/buytickets/:raffleId" element={<RaffleDetailsTheme />} />
            <Route path="/raffle-owner" element={<RaffleActionsTheme />} />
            <Route path="/calculate" element={<CalculateTheme />} />
            <Route path="/approve" element={<ApproveTheme />} />
            <Route path="/nftselect" element={<NFTSelectTheme /> }/>
            <Route path="/404" element={<ComingSoonTheme />} />
            <Route path="/405" element={<OopsComponent />} />
            <Route path="/test" element={<NFTMetadata />} />
            <Route path="/test1" element={<MintNFT />} />
            <Route path="/test2" element={<Test2 />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default MyRouts;
