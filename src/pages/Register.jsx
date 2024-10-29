import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import HomePageBanner from "../components/HomePageBanner";

function Register() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const navigate = useNavigate();
  const VITE_REACT_APP_BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleRedirect = () => {
    navigate("/login");
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "firstName":
      case "lastName":
        if (!value.trim()) {
          error = `Invalid ${
            name === "firstName" ? "first name" : "last name"
          }`;
        }
        break;
      case "dob":
        if (!value) {
          error = "Please enter a valid date of birth";
        }
        break;
      case "email":
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.match(emailPattern)) {
          error = "Invalid email format";
        }
        break;
      case "password":
        if (value.length < 8) {
          error = "Must be at least 8 characters long";
        } else if (!/[A-Za-z]/.test(value)) {
          error = "Must contain at least one letter";
        } else if (!/\d/.test(value)) {
          error = "Must contain at least one number";
        } else if (!/[@$!%*?&]/.test(value)) {
          error = "Must contain at least one special character (@$!%*?&)";
        }
        break;
      case "confirmPassword":
        if (value !== formData.password) {
          error = "Password doesn't match";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const validateForm = () => {
    const formErrors = {};

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        formErrors[key] = error;
      }
    });

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please correct the errors before submitting.");
      return;
    }

    try {
      const response = await fetch(
        `${VITE_REACT_APP_BACKEND_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setErrors({});
        toast.success("Signed up successfully!");
        navigate("/login");
      } else {
        setFormError(data.message || "An error occurred");
        toast.error("Failed to sign up");
      }
    } catch (error) {
      setFormError("Server error");
      toast.error("Server error");
    }
  };

  return (
    <div className="container">
      <HomePageBanner />

      <div className="login-section">
        <div className="header">
          <p>Register</p>
        </div>

        <div className="form">
          <form action="" method="POST" onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                style={{
                  backgroundImage: `url(${assets.name})`,
                }}
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
              />
              <div className="error">
                {errors.firstName && (
                  <p className="error-message">{errors.firstName}</p>
                )}
              </div>
            </div>

            <div className="input-container">
              <input
                style={{
                  backgroundImage: `url(${assets.name})`,
                }}
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
              />
              <div className="error">
                {errors.lastName && (
                  <p className="error-message">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="input-container" >
              <input
                id="date"
                style={{
                  backgroundImage: `url(${assets.calender})`,
                }}
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                placeholder="Date of Birth"
                max={new Date().toISOString().split("T")[0]}
                required
                className="date-input"
              />
              <div className="error">
                {errors.dob && <p className="error-message">{errors.dob}</p>}
              </div>
            </div>

            <div className="input-container">
              <input
                style={{
                  backgroundImage: `url(${assets.emailIcon})`,
                }}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
              <div className="error">
                {errors.email && (
                  <p className="error-message">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="input-container">
              <input
                style={{
                  backgroundImage: `url(${assets.password})`,
                }}
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
              <span
                className="show-password"
                onClick={togglePasswordVisibility}
              >
                <img
                  src={passwordVisible ? assets.openEye : assets.closeEye}
                  alt="Toggle Password Visibility"
                />
              </span>
              <div className="error">
                {errors.password && (
                  <p className="error-message">{errors.password}</p>
                )}
              </div>
            </div>

            <div className="input-container">
              <input
                style={{
                  backgroundImage: `url(${assets.password})`,
                }}
                type={confirmPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
              />
              <span
                className="show-password"
                onClick={toggleConfirmPasswordVisibility}
              >
                <img
                  src={
                    confirmPasswordVisible ? assets.openEye : assets.closeEye
                  }
                  alt="Toggle Password Visibility"
                />
              </span>
              <div className="error">
                {errors.confirmPassword && (
                  <p className="error-message">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <button type="submit" className="login-btn">
              Register
            </button>
          </form>
        </div>

        <div className="register">
          <p>Have an account?</p>
          <button className="register-btn" onClick={handleRedirect}>
            Log in
          </button>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Register;
