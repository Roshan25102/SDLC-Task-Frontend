import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../context/AuthContext";
const Navbar = () => {
  const { logout } = useAuth();
  return (
    <nav className="navbar">
      <div className="left">
        <Link to="/dashboard">Home</Link>
        <Link to="profile">Profile</Link>
        <Link to="notifications">Notifications</Link>
        <Link to="settings">Settings</Link>
      </div>
      <div className="right">
        <Link onClick={logout} >Logout</Link>
      </div>
    </nav>
  );
};

export default Navbar;
