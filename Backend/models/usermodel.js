const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    enrollment: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const user = mongoose.model('user', UserSchema);

module.exports = user;
