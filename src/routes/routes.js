import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// importing all the themes
import ItemDetail from "../components/ItemDetail/ItemDetail";
import Home from "../themes/Home";
import CreateRaffle from "../themes/CreateRaffle";
import OpenRafflesTheme from "../themes/OpenRafflesTheme";

class MyRouts extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/create" element={<CreateRaffle />} />
            <Route exact path="/raffles" element={<OpenRafflesTheme />} />
            <Route exact path="/raffle-details" element={<ItemDetail />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default MyRouts;
