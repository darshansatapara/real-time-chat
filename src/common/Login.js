import React, { useState } from "react";
import "../css/RegistrationLogin.css";
import { useNavigate } from "react-router-dom";
import client from "../axios/axiosFile";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await client.post("/login", values);
      if (response.data.success) {
        navigate("/");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log("Error:", error);
      console.log("Error response data:", error.response.data); 
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
            <button type="submit">Login</button>
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
