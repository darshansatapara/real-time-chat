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
    const response = await client.post("/login", {
      body: JSON.stringify({
        values,
      }),
    });
    const json = await response.json();

    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      props.showAlert("Logged in successfully", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid credentials", "danger");
    }
  };

  const handleInput = (e) => {
    setValues((ele) => ({ ...ele, [e.target.name]: e.target.value }));
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
              onClick={() => navigate("/register")}
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
