import React, { useEffect, useState } from "react";
import "../css/RegistrationLogin.css";

import { useNavigate } from "react-router-dom";
import client from "../axios/axiosFile.js";

const Register = (props) => {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    enrollment: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await client.post("/api/create", formData);
      const json = response.data;

      console.log(json);
      if (json.success) {
        localStorage.setItem("token", json.authToken);
        navigate("/");
      } else {
        console.log("alert");
        alert("An account with this email already exists.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="mainContainer">
      <div className="register-container">
        <h1 className="heading-register">Register</h1>
        <form onSubmit={handleSubmit} className="register" method="post">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="text">Enrollment:</label>
          <input
            type="text"
            id="enrollment"
            name="enrollment"
            value={formData.enrollment}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit" className="register-button">
            Register
          </button>
          {alertMessage && (
            <div className="alert alert-danger">{alertMessage}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
