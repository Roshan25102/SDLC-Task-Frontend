import React from "react";
import { assets } from "../assets/assets";
import "./HomePageBanner.css";
function HomePageBanner() {
  return (
    <div className="welcome-section">
      <div className="astronaut-img">
        <img src={assets.baground} alt="astronaut" />
      </div>
      <h2>Welcome aboard my friend</h2>
      <p>just a couple of clicks and we start</p>
    </div>
  );
}

export default HomePageBanner;
