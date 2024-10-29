import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Your Auth Context
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Settings.css";
const ProfileSettings = () => {
  const { isAuthenticated } = useAuth(); // Check if user is authenticated
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState("");
  const VITE_REACT_APP_BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!isAuthenticated) return;

      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(
          `${VITE_REACT_APP_BACKEND_URL}/api/auth/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserDetails({
            firstName: data.firstName,
            lastName: data.lastName,
            password: "", // Keep password field empty for security
            confirmPassword: "",
          });
        } else {
          toast.error("Failed to fetch user data.");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast.error("Error fetching user data.");
      }
    };

    fetchUserProfile();
  }, [isAuthenticated]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    // Password and confirm password validation
    if (userDetails.password !== userDetails.confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(
        `${VITE_REACT_APP_BACKEND_URL}/api/auth/updateprofile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            password: userDetails.password,
          }),
        }
      );

      if (response.ok) {
        toast.success("Profile updated successfully!");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setFormError(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="setting-container">
      <div className="setting-profile-settings-container">
        <h2>Update Profile</h2>
        <form onSubmit={handleSubmit}>
          {/* First Name Input */}
          <div className="setting-input-container">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={userDetails.firstName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Last Name Input */}
          <div className="setting-input-container">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={userDetails.lastName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Input */}
          <div className="setting-input-container">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={userDetails.password}
              onChange={handleChange}
              placeholder="Leave blank to keep unchanged"
            />
          </div>

          {/* Confirm Password Input */}
          <div className="setting-input-container">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={userDetails.confirmPassword}
              onChange={handleChange}
              placeholder="Type password again"
            />
          </div>

          {formError && <p className="error-message">{formError}</p>}

          {/* Update Button */}
          <button type="submit" className="setting-button">
            Update Profile
          </button>
        </form>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default ProfileSettings;
