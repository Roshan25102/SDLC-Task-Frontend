// Profile.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { isAuthenticated, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const VITE_REACT_APP_BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!isAuthenticated) return;

      try {
        const response = await fetch(`${VITE_REACT_APP_BACKEND_URL}/api/auth/profile`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [isAuthenticated]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {userData ? (
        <div>
          <p><strong>First Name:</strong> {userData.firstName}</p>
          <p><strong>Last Name:</strong> {userData.lastName}</p>
          <p><strong>Date of Birth:</strong> {new Date(userData.dob).toLocaleDateString()}</p>
          <p><strong>Email:</strong> {userData.email}</p>
        </div>
      ) : (
        <p>No user data available</p>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Profile;
