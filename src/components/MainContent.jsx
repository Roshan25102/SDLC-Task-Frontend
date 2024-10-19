import React from "react";
import { assets } from "../assets/assets";
import "./MainContent.css"

function MainContent() {
  return (
    <>
      <div className="top-container">
        <div className="top-left">Welcome! Kumar</div>
        <div className="top-right">12th Jan,2024</div>
      </div>

      <div className="middle-container">
        <div className="middle-left-container">
          <span id="middle-left-head">Board</span>
          <span id="middle-right-head">
            <img src={assets.people} alt="" />
            Add People
          </span>
        </div>
        <span className="middle-right-container">
          This week <img src={assets.downArrow} alt="" />
        </span>
      </div>

      <div className="bottom-container">
        Bottom
      </div>
    </>
  );
}

export default MainContent;
