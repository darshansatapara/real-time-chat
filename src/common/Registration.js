import React, { useEffect, useState } from "react";
import "../css/RegistrationLogin.css";

import { useNavigate } from "react-router-dom";
import client from "../axios/axiosFile.js";

const Register = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    enrollment: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Register");
    try {
      const response = await client.post("/api/create", formData);
      const json = await response.data;
      console.log(json);
      if (json.success) {
        // Save the auth token and redirect
        localStorage.setItem("token", json.authToken);
        navigate("/");
      } else {
        props.showAlert("Account alrady exist", "danger");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: [e.target.value] });
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
        </form>
      </div>
    </div>
  );
};

export default Register;
