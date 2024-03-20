// Import the User model
const User = require("../models/usermodel");

const configureSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("joinChat", async (userId) => {
      try {
        const user = await User.findById(userId);
        if (!user) {
          console.error("User not found");
          return;
        }

        // You can send additional user information if needed
        socket.broadcast.emit("userData", {
          name: user.name,
          email: user.email,
        });
      } catch (error) {
        console.error("Error while fetching user:", error);
      }
    });

    // Handle incoming messages
    socket.on("chat message", async (messageData) => {
      try {
        const user = await User.findById(messageData.userId);
        if (!user) {
          console.error("User not found");
          return;
        }

        // Emit message with user information
        socket.broadcast.emit("chat message", {
          user: user.name,
          text: messageData.text,
        });
      } catch (error) {
        console.error("Error while fetching user:", error);
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

module.exports = configureSocket;
