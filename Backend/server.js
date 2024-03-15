const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const { query } = require("express-validator");
const app = express();
const cors = require("cors");
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use(cors());



io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle incoming messages
  socket.on("chat message", (message) => {
    console.log("message: " + message);
    io.emit("chat message", message); // Broadcast message to all clients
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
