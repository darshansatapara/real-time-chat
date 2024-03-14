import React, { useEffect, useState } from "react";
import "../css/ChatScreen.css";
import io from "socket.io-client";
const socket = io("http://localhost:8000");

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(""); // Track the current user

  useEffect(() => {
    // Mocking current user (you should implement your own authentication mechanism)
    setCurrentUser("User123");

    // Listen for incoming messages
    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

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
      // Emit message to server
      socket.emit("chat message", message);
      
      // Add the message to the messages array with the current user
      setMessages(prevMessages => [...prevMessages, { text: message, user: currentUser }]);
      
      // Clear the input field
      setMessage("");
    }
  };

  return (
    <div className="community-chat">
      <h1 className="Chathead">Community</h1>
      <div className="container">
        {messages.map((msg, index) => (
          <div key={index} className={msg.user === currentUser ? "message left" : "message right"}>
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
