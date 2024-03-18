const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const connectToMongo = require('./db/db');
const configureSocket = require('./middelware/chatSocket');
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

app.use(express.json());
app.use(cors());

// Configure MongoDB connection
connectToMongo();

// Configure socket
configureSocket(io);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
