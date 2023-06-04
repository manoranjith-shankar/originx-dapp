import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// importing all the themes
import Home from "../themes/Home";
import CreateRaffle from "../themes/CreateRaffle";
import OpenRafflesTheme from "../themes/OpenRafflesTheme";
import RaffleDetailsTheme from "../themes/RaffleDetailsTheme";
import RaffleActionsTheme from "../themes/RaffleActionsTheme";

class MyRouts extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/create" element={<CreateRaffle />} />
            <Route path="/raffles" element={<OpenRafflesTheme />} />
            <Route path="/buytickets/:raffleId" element={<RaffleDetailsTheme />} />
            <Route path="/raffle-owner" element={<RaffleActionsTheme />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default MyRouts;
