import React from "react";
import "./Dashboard.css";
import Navbar from "../components/Navbar";
import MainContent from "../components/MainContent";
function Dashboard() {
  return (
    <div className="main-container">
     <Navbar></Navbar>

      <div className="main-content-container">
        <MainContent></MainContent>
      </div>
    </div>
  );
}

export default Dashboard;
