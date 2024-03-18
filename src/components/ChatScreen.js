import React, { useEffect, useState } from "react";
import "../css/ChatScreen.css";
import io from "socket.io-client";
const socket = io("http://localhost:8000");

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState({}); // Track the current user

  useEffect(() => {
    // Retrieve the current user information from browser's storage or props
    const loggedInUserId = localStorage.getItem("userId"); // Assuming you store user ID in localStorage
    if (loggedInUserId) {
      socket.emit("joinChat", loggedInUserId);

      // Listen for user data from the server
      socket.on("userData", (userData) => {
        setCurrentUser(userData);
      });

      // Listen for incoming messages
      socket.on("chat message", (msg) => {
        console.log("Received message:", msg);
        setMessages((prevMessages) => [...prevMessages, msg]);
      });
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Emit message to server with current user information
      socket.emit("chat message", { userId: currentUser._id, text: message });
      setMessage("");
    }
  };

  return (
    <div className="community-chat">
      <h1 className="Chathead">Community</h1>
      <div className="container">
        {messages.map((msg, index) => (
          <div key={index} className={msg.user === currentUser.name ? "message left" : "message right"}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="send">
        <form action="#" id="send-container" onSubmit={handleSubmit}>
          <input type="text" name="messageInp" onChange={handleMessageChange} value={message} id="messageInp" />
          <button className="btn" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatScreen;
