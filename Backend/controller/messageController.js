const Message = require("../models/messagemodel");

// Controller to handle saving a message
const saveMessage = async (user, text) => {
  try {
    const message = new Message({ user, text });
    await message.save();
    console.log("Message saved to MongoDB:", message);
  } catch (error) {
    console.error("Error saving message:", error);
  }
};

module.exports = {
  saveMessage,
};
