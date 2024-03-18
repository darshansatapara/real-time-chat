import axios from "axios";
const token = localStorage.getItem("token");
const client = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
    "auth-token": token ? `Bearer ${token}` : "", // Include the token in the Authorization header
  },
});

export default client;
