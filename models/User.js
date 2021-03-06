const mongoose = require('mongoose');

// create user table schema
const UserShcema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    date : {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserShcema);

module.exports = User;