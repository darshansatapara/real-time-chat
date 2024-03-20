import React, { useState } from "react";
import "../css/RegistrationLogin.css";
import { useNavigate } from "react-router-dom";
import client from "../axios/axiosFile";


const Login = (props) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    enrollment: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await client.post("/api/login", values);
      const json = response.data;
      const token = response.data.token;
      console.log(token);
      if (json.success) {
        localStorage.setItem("token", token);
        alert("Logged in successfully", "success");
        navigate("/");
      } else {
        alert("Invalid credentials", "danger");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while logging in", "danger");
    }
  };

  const handleInput = (e) => {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  return (
    <div className="mainContainer1">
      <div className="mainContainer">
        <div className="login-container">
          <h1 className="heading-register">Login</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleInput}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleInput}
            />
            <label htmlFor="text">Enrollment:</label>
            <input
              type="text"
              id="enrollment"
              name="enrollment"
              value={values.enrollment}
              onChange={handleInput}
            />
            <button className="register-button" type="submit">
              Login
            </button>
          </form>
          <p className="not-account">
            Don't have an account?
            <span
              onClick={() => navigate("/create")}
              className="register-link "
            >
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
