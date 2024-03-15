const mongoose = require('mongoose');
const { Schema } = mongoose;


const UserSchema = new Schema({
    name:{
        type: String,
        require:true
    },
    email:{
        type: String,
        require:true,
        unique:true
    },
    enrollment:{
        type: String,
        require:true
    },
    password:{
        type: String,
        require:true
    },


})
const User=mongoose.model('user',UserSchema);

module.exports=User;