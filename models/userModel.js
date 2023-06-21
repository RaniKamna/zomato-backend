const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please enter your name'],
        maxLength:[30, 'Name cannot exceed 30 characters'],
        minLength:[4,"Name should have more than 4 characters"]
    },
    email:{
        type:String,
        required:[true, 'Please enter your email'],
        unique:true,
        validate:[validator.isEmail,'Please enter a valid email']
    },
    password:{
        type:String,
        required:[true, 'Please enter your password'],
        minLength:[8,"Password should have more than 8 characters"],
    },
    avatar:{
        url:{
            type:String,
        }
    },
    role:{
        type:String,
        default:'user'
    }
});

module.exports = mongoose.model("User", userSchema);