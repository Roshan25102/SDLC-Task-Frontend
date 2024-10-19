import React from "react";
import "./Navbar.css";
import { assets } from "../assets/assets";
function Navbar() {
  return (
    <div className="sidebar-container">
      <div className="sidebar-upper-content">
        <div className="sidebar-logo">
          <img src={assets.logo} alt="" />
          <span>Pro Manage</span>
        </div>

        <div className="sidebar-links">
          <span className="sidebar-link-text">
            <img src={assets.board} alt="" />
            Board
          </span>
          <span className="sidebar-link-text">
            <img src={assets.settings} alt="" />
            Analyatics
          </span>
          <span className="sidebar-link-text">
            <img src={assets.analytics} alt="" />
            Settings
          </span>
        </div>
      </div>

      <div className="sidebar-lower-content">
        <span>
          <img src={assets.logout} alt="" /> Logout
        </span>
      </div>
    </div>
  );
}

export default Navbar;
