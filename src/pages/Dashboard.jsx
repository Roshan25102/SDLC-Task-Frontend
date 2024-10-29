import React from "react";
import { Outlet } from "react-router-dom";
import "./Dashboard.css";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="navbar">
        <Navbar></Navbar>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
