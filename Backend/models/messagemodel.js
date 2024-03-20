const mongoose = require("mongoose");
const { Schema } = mongoose;

const MessageSchema = new Schema({
  userId: {
    type: Number, // Assuming user IDs are numbers
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
